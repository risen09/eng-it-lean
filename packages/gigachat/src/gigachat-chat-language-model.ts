import {
  LanguageModelV1,
  LanguageModelV1CallWarning,
  LanguageModelV1FinishReason,
  LanguageModelV1StreamPart
} from '@ai-sdk/provider';
import {
  FetchFunction,
  ParseResult,
  combineHeaders,
  createEventSourceResponseHandler,
  createJsonResponseHandler,
  postJsonToApi
} from '@ai-sdk/provider-utils';
import { z } from 'zod';
import { convertToGigachatChatMessages } from './convert-to-gigachat-chat-messages';
import { mapGigachatFinishReason } from './map-gigachat-finish-reason';
import { GigachatChatModelId, GigachatChatSettings } from './gigachat-chat-settings';
import { gigachatFailedResponseHandler } from './gigachat-error';
import { getResponseMetadata } from './get-response-metadata';
import { prepareTools } from './gigachat-prepare-tools';

type GigachatChatConfig = {
  provider: string;
  baseURL: string;
  headers: () => Record<string, string | undefined>;
  fetch?: FetchFunction;
};

export class GigachatChatLanguageModel implements LanguageModelV1 {
  readonly specificationVersion = 'v1';
  readonly defaultObjectGenerationMode = 'json';
  readonly supportsImageUrls = false;

  readonly modelId: GigachatChatModelId;
  readonly settings: GigachatChatSettings;

  private readonly config: GigachatChatConfig;

  constructor(modelId: GigachatChatModelId, settings: GigachatChatSettings, config: GigachatChatConfig) {
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }

  get provider(): string {
    return this.config.provider;
  }

  private getArgs({
    mode,
    prompt,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed
  }: Parameters<LanguageModelV1['doGenerate']>[0]) {
    const type = mode.type;

    const warnings: LanguageModelV1CallWarning[] = [];

    if (topK != null) {
      warnings.push({
        type: 'unsupported-setting',
        setting: 'topK'
      });
    }

    if (frequencyPenalty != null) {
      warnings.push({
        type: 'unsupported-setting',
        setting: 'frequencyPenalty'
      });
    }

    if (presencePenalty != null) {
      warnings.push({
        type: 'unsupported-setting',
        setting: 'presencePenalty'
      });
    }

    if (stopSequences != null) {
      warnings.push({
        type: 'unsupported-setting',
        setting: 'stopSequences'
      });
    }

    if (responseFormat != null && responseFormat.type === 'json' && responseFormat.schema != null) {
      warnings.push({
        type: 'unsupported-setting',
        setting: 'responseFormat',
        details: 'JSON response format schema is not supported'
      });
    }

    const baseArgs = {
      // model id:
      model: this.modelId,

      // model specific settings:
      stream: this.settings.stream,
      repetition_penalty: this.settings.repetition_penalty,
      update_interval: this.settings.update_interval,

      // standardized settings:
      max_tokens: maxTokens,
      temperature,
      top_p: topP,

      // response format:
      response_format: responseFormat?.type === 'json' ? { type: 'json_object' } : undefined,

      // messages:
      messages: convertToGigachatChatMessages(prompt)
    };

    switch (type) {
      case 'regular': {
        const { tools, tool_choice, toolWarnings } = prepareTools(mode);

        return {
          args: { ...baseArgs, tools, tool_choice },
          warnings: [...warnings, ...toolWarnings]
        };
      }

      case 'object-json': {
        return {
          args: {
            ...baseArgs,
            response_format: { type: 'json_object' }
          },
          warnings
        };
      }

      case 'object-tool': {
        return {
          args: {
            ...baseArgs,
            tool_choice: 'any',
            tools: [{ type: 'function', function: mode.tool }]
          },
          warnings
        };
      }

      default: {
        const _exhaustiveCheck: never = type;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }

  async doGenerate(
    options: Parameters<LanguageModelV1['doGenerate']>[0]
  ): Promise<Awaited<ReturnType<LanguageModelV1['doGenerate']>>> {
    const { args, warnings } = this.getArgs(options);

    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/chat/completions`,
      headers: combineHeaders(this.config.headers(), options.headers),
      body: args,
      failedResponseHandler: gigachatFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(gigachatChatResponseSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });

    const { messages: rawPrompt, ...rawSettings } = args;
    const choice = response.choices[0];
    let text = choice.message.content ?? undefined;

    // when there is a trailing assistant message, Gigachat will send the
    // content of that message again. we skip this repeated content to
    // avoid duplication, e.g. in continuation mode.
    const lastMessage = rawPrompt[rawPrompt.length - 1];
    if (lastMessage.role === 'assistant' && text?.startsWith(lastMessage.content)) {
      text = text.slice(lastMessage.content.length);
    }

    return {
      text,
      toolCalls: choice.message.function_call
        ? [
            {
              toolCallType: 'function',
              toolCallId: choice.message.function_call.name,
              toolName: choice.message.function_call.name,
              args: JSON.stringify(choice.message.function_call.arguments)
            }
          ]
        : [],
      finishReason: mapGigachatFinishReason(choice.finish_reason),
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens
      },
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(args) },
      response: getResponseMetadata(response),
      warnings
    };
  }

  async doStream(
    options: Parameters<LanguageModelV1['doStream']>[0]
  ): Promise<Awaited<ReturnType<LanguageModelV1['doStream']>>> {
    const { args, warnings } = this.getArgs(options);

    const body = { ...args, stream: true };

    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/chat/completions`,
      headers: combineHeaders(this.config.headers(), options.headers),
      body,
      failedResponseHandler: gigachatFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(gigachatChatChunkSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });

    const { messages: rawPrompt, ...rawSettings } = args;

    let finishReason: LanguageModelV1FinishReason = 'unknown';
    let usage: { promptTokens: number; completionTokens: number } = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    let chunkNumber = 0;
    let trimLeadingSpace = false;

    return {
      stream: response.pipeThrough(
        new TransformStream<ParseResult<z.infer<typeof gigachatChatChunkSchema>>, LanguageModelV1StreamPart>({
          transform(chunk, controller) {
            if (!chunk.success) {
              controller.enqueue({ type: 'error', error: chunk.error });
              return;
            }

            chunkNumber++;

            const value = chunk.value;

            if (chunkNumber === 1) {
              controller.enqueue({
                type: 'response-metadata',
                ...getResponseMetadata(value)
              });
            }

            if (value.usage != null) {
              usage = {
                promptTokens: value.usage.prompt_tokens,
                completionTokens: value.usage.completion_tokens
              };
            }

            const choice = value.choices[0];

            if (choice?.finish_reason != null) {
              finishReason = mapGigachatFinishReason(choice.finish_reason);
            }

            if (choice?.delta == null) {
              return;
            }

            const delta = choice.delta;

            // when there is a trailing assistant message, Gigachat will send the
            // content of that message again. we skip this repeated content to
            // avoid duplication, e.g. in continuation mode.
            if (chunkNumber <= 2) {
              const lastMessage = rawPrompt[rawPrompt.length - 1];

              if (lastMessage.role === 'assistant' && delta.content === lastMessage.content.trimEnd()) {
                // Gigachat moves the trailing space from the prefix to the next chunk.
                // We trim the leading space to avoid duplication.
                if (delta.content.length < lastMessage.content.length) {
                  trimLeadingSpace = true;
                }

                // skip the repeated content:
                return;
              }
            }

            if (delta.content != null) {
              controller.enqueue({
                type: 'text-delta',
                textDelta: trimLeadingSpace ? delta.content.trimStart() : delta.content
              });

              trimLeadingSpace = false;
            }

            if (delta.function_call != null) {
              controller.enqueue({
                type: 'tool-call-delta',
                toolCallType: 'function',
                toolCallId: delta.function_call.name,
                toolName: delta.function_call.name,
                argsTextDelta: JSON.stringify(delta.function_call.arguments)
              });
              controller.enqueue({
                type: 'tool-call',
                toolCallType: 'function',
                toolCallId: delta.function_call.name,
                toolName: delta.function_call.name,
                args: JSON.stringify(delta.function_call.arguments)
              });
            }
          },

          flush(controller) {
            controller.enqueue({ type: 'finish', finishReason, usage });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(body) },
      warnings
    };
  }
}

// limited version of the schema, focussed on what is needed for the implementation
// this approach limits breakages when the API changes and increases efficiency
const gigachatChatResponseSchema = z.object({
  created: z.number().nullish(),
  model: z.string().nullish(),
  choices: z.array(
    z.object({
      message: z.object({
        role: z.literal('assistant'),
        content: z.string().nullable(),
        created: z.number().nullish(),
        name: z.string().nullish(),
        function_call: z
          .object({
            name: z.string(),
            arguments: z.record(z.any())
          })
          .nullish(),
        data_for_context: z.array(z.object({})).nullish()
      }),
      index: z.number(),
      finish_reason: z.string().nullish()
    })
  ),
  object: z.literal('chat.completion'),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number()
  })
});

// limited version of the schema, focussed on what is needed for the implementation
// this approach limits breakages when the API changes and increases efficiency
const gigachatChatChunkSchema = z.object({
  created: z.number().nullish(),
  model: z.string().nullish(),
  object: z.literal('chat.completion'),
  choices: z.array(
    z.object({
      delta: z.object({
        role: z.enum(['assistant']).optional(),
        content: z.string().nullish(),
        functions_state_id: z.string().nullish(),
        function_call: z
          .object({
            name: z.string(),
            arguments: z.object({})
          })
          .nullish()
      }),
      finish_reason: z.string().nullish(),
      index: z.number()
    })
  ),
  usage: z
    .object({
      prompt_tokens: z.number(),
      completion_tokens: z.number()
    })
    .nullish()
});
