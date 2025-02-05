'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createGigachat: () => createGigachat,
  gigachat: () => gigachat
});
module.exports = __toCommonJS(index_exports);

// src/gigachat-provider.ts
var import_provider_utils4 = require('@ai-sdk/provider-utils');

// src/gigachat-chat-language-model.ts
var import_provider_utils2 = require('@ai-sdk/provider-utils');
var import_zod2 = require('zod');

// src/convert-to-gigachat-chat-messages.ts
var import_provider = require('@ai-sdk/provider');
function convertToGigachatChatMessages(prompt) {
  const messages = [];
  for (let i = 0; i < prompt.length; i++) {
    const { role, content } = prompt[i];
    const isLastMessage = i === prompt.length - 1;
    switch (role) {
      case 'system': {
        messages.push({ role: 'system', content });
        break;
      }
      case 'user': {
        messages.push({
          role: 'user',
          content: content
            .map((part) => {
              switch (part.type) {
                case 'text': {
                  return part.text;
                }
                case 'image': {
                  throw new import_provider.UnsupportedFunctionalityError({
                    functionality: 'Images should be added in "attachments" object'
                  });
                }
                case 'file': {
                  throw new import_provider.UnsupportedFunctionalityError({
                    functionality: 'File content parts in user messages'
                  });
                }
              }
            })
            .join('')
        });
        break;
      }
      case 'assistant': {
        let text = '';
        let functionCall;
        for (const part of content) {
          switch (part.type) {
            case 'text': {
              text += part.text;
              break;
            }
            case 'tool-call': {
              functionCall = {
                name: part.toolName,
                arguments: part.args
              };
              break;
            }
            default: {
              const _exhaustiveCheck = part;
              throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
            }
          }
        }
        messages.push({
          role: 'assistant',
          content: text,
          prefix: isLastMessage ? true : void 0,
          function_call: functionCall
        });
        break;
      }
      case 'tool': {
        for (const toolResponse of content) {
          messages.push({
            role: 'function',
            name: toolResponse.toolName,
            content: JSON.stringify(toolResponse.result)
          });
        }
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return messages;
}

// src/map-gigachat-finish-reason.ts
function mapGigachatFinishReason(finishReason) {
  switch (finishReason) {
    case 'stop':
      return 'stop';
    case 'length':
    case 'model_length':
      return 'length';
    case 'function_call':
      return 'tool-calls';
    case 'error':
      return 'error';
    default:
      return 'unknown';
  }
}

// src/gigachat-error.ts
var import_provider_utils = require('@ai-sdk/provider-utils');
var import_zod = require('zod');
var gigachatErrorDataSchema = import_zod.z.object({
  object: import_zod.z.literal('error'),
  message: import_zod.z.string(),
  type: import_zod.z.string(),
  param: import_zod.z.string().nullable(),
  code: import_zod.z.string().nullable()
});
var gigachatFailedResponseHandler = (0, import_provider_utils.createJsonErrorResponseHandler)({
  errorSchema: gigachatErrorDataSchema,
  errorToMessage: (data) => data.message
});

// src/get-response-metadata.ts
function getResponseMetadata({ model, created }) {
  return {
    modelId: model != null ? model : void 0,
    timestamp: created != null ? new Date(created * 1e3) : void 0
  };
}

// src/gigachat-prepare-tools.ts
var import_provider2 = require('@ai-sdk/provider');
function prepareTools(mode) {
  var _a;
  const tools = ((_a = mode.tools) == null ? void 0 : _a.length) ? mode.tools : void 0;
  const toolWarnings = [];
  if (tools == null) {
    return { tools: void 0, tool_choice: void 0, toolWarnings };
  }
  const gigachatTools = [];
  for (const tool of tools) {
    if (tool.type === 'provider-defined') {
      toolWarnings.push({ type: 'unsupported-tool', tool });
    } else {
      gigachatTools.push({
        type: 'function',
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters
        }
      });
    }
  }
  const toolChoice = mode.toolChoice;
  if (toolChoice == null) {
    return { tools: gigachatTools, tool_choice: void 0, toolWarnings };
  }
  const type = toolChoice.type;
  switch (type) {
    case 'auto':
    case 'none':
      return { tools: gigachatTools, tool_choice: type, toolWarnings };
    case 'required':
      return { tools: gigachatTools, tool_choice: 'any', toolWarnings };
    // gigachat does not support tool mode directly,
    // so we filter the tools and force the tool choice through 'any'
    case 'tool':
      return {
        tools: gigachatTools.filter((tool) => tool.function.name === toolChoice.toolName),
        tool_choice: 'any',
        toolWarnings
      };
    default: {
      const _exhaustiveCheck = type;
      throw new import_provider2.UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}

// src/gigachat-chat-language-model.ts
var GigachatChatLanguageModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = 'v1';
    this.defaultObjectGenerationMode = 'json';
    this.supportsImageUrls = false;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  getArgs({
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
  }) {
    const type = mode.type;
    const warnings = [];
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
      response_format:
        (responseFormat == null ? void 0 : responseFormat.type) === 'json' ? { type: 'json_object' } : void 0,
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
        const _exhaustiveCheck = type;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  async doGenerate(options) {
    var _a;
    const { args, warnings } = this.getArgs(options);
    const { responseHeaders, value: response } = await (0, import_provider_utils2.postJsonToApi)({
      url: `${this.config.baseURL}/chat/completions`,
      headers: (0, import_provider_utils2.combineHeaders)(this.config.headers(), options.headers),
      body: args,
      failedResponseHandler: gigachatFailedResponseHandler,
      successfulResponseHandler: (0, import_provider_utils2.createJsonResponseHandler)(gigachatChatResponseSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args;
    const choice = response.choices[0];
    let text = (_a = choice.message.content) != null ? _a : void 0;
    const lastMessage = rawPrompt[rawPrompt.length - 1];
    if (lastMessage.role === 'assistant' && (text == null ? void 0 : text.startsWith(lastMessage.content))) {
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
  async doStream(options) {
    const { args, warnings } = this.getArgs(options);
    const body = { ...args, stream: true };
    const { responseHeaders, value: response } = await (0, import_provider_utils2.postJsonToApi)({
      url: `${this.config.baseURL}/chat/completions`,
      headers: (0, import_provider_utils2.combineHeaders)(this.config.headers(), options.headers),
      body,
      failedResponseHandler: gigachatFailedResponseHandler,
      successfulResponseHandler: (0, import_provider_utils2.createEventSourceResponseHandler)(gigachatChatChunkSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args;
    let finishReason = 'unknown';
    let usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    let chunkNumber = 0;
    let trimLeadingSpace = false;
    return {
      stream: response.pipeThrough(
        new TransformStream({
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
            if ((choice == null ? void 0 : choice.finish_reason) != null) {
              finishReason = mapGigachatFinishReason(choice.finish_reason);
            }
            if ((choice == null ? void 0 : choice.delta) == null) {
              return;
            }
            const delta = choice.delta;
            if (chunkNumber <= 2) {
              const lastMessage = rawPrompt[rawPrompt.length - 1];
              if (lastMessage.role === 'assistant' && delta.content === lastMessage.content.trimEnd()) {
                if (delta.content.length < lastMessage.content.length) {
                  trimLeadingSpace = true;
                }
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
};
var gigachatChatResponseSchema = import_zod2.z.object({
  created: import_zod2.z.number().nullish(),
  model: import_zod2.z.string().nullish(),
  choices: import_zod2.z.array(
    import_zod2.z.object({
      message: import_zod2.z.object({
        role: import_zod2.z.literal('assistant'),
        content: import_zod2.z.string().nullable(),
        created: import_zod2.z.number().nullish(),
        name: import_zod2.z.string().nullish(),
        function_call: import_zod2.z
          .object({
            name: import_zod2.z.string(),
            arguments: import_zod2.z.record(import_zod2.z.any())
          })
          .nullish(),
        data_for_context: import_zod2.z.array(import_zod2.z.object({})).nullish()
      }),
      index: import_zod2.z.number(),
      finish_reason: import_zod2.z.string().nullish()
    })
  ),
  object: import_zod2.z.literal('chat.completion'),
  usage: import_zod2.z.object({
    prompt_tokens: import_zod2.z.number(),
    completion_tokens: import_zod2.z.number(),
    total_tokens: import_zod2.z.number()
  })
});
var gigachatChatChunkSchema = import_zod2.z.object({
  created: import_zod2.z.number().nullish(),
  model: import_zod2.z.string().nullish(),
  object: import_zod2.z.literal('chat.completion'),
  choices: import_zod2.z.array(
    import_zod2.z.object({
      delta: import_zod2.z.object({
        role: import_zod2.z.enum(['assistant']).optional(),
        content: import_zod2.z.string().nullish(),
        functions_state_id: import_zod2.z.string().nullish(),
        function_call: import_zod2.z
          .object({
            name: import_zod2.z.string(),
            arguments: import_zod2.z.object({})
          })
          .nullish()
      }),
      finish_reason: import_zod2.z.string().nullish(),
      index: import_zod2.z.number()
    })
  ),
  usage: import_zod2.z
    .object({
      prompt_tokens: import_zod2.z.number(),
      completion_tokens: import_zod2.z.number()
    })
    .nullish()
});

// src/gigachat-embedding-model.ts
var import_provider3 = require('@ai-sdk/provider');
var import_provider_utils3 = require('@ai-sdk/provider-utils');
var import_zod3 = require('zod');
var GigachatEmbeddingModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = 'v1';
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    var _a;
    return (_a = this.settings.maxEmbeddingsPerCall) != null ? _a : 32;
  }
  get supportsParallelCalls() {
    var _a;
    return (_a = this.settings.supportsParallelCalls) != null ? _a : false;
  }
  async doEmbed({ values, abortSignal, headers }) {
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new import_provider3.TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const { responseHeaders, value: response } = await (0, import_provider_utils3.postJsonToApi)({
      url: `${this.config.baseURL}/embeddings`,
      headers: (0, import_provider_utils3.combineHeaders)(this.config.headers(), headers),
      body: {
        model: this.modelId,
        input: values,
        encoding_format: 'float'
      },
      failedResponseHandler: gigachatFailedResponseHandler,
      successfulResponseHandler: (0, import_provider_utils3.createJsonResponseHandler)(
        GigachatTextEmbeddingResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      embeddings: response.data.map((item) => item.embedding),
      usage: response.usage ? { tokens: response.usage.prompt_tokens } : void 0,
      rawResponse: { headers: responseHeaders }
    };
  }
};
var GigachatTextEmbeddingResponseSchema = import_zod3.z.object({
  data: import_zod3.z.array(import_zod3.z.object({ embedding: import_zod3.z.array(import_zod3.z.number()) })),
  usage: import_zod3.z.object({ prompt_tokens: import_zod3.z.number() }).nullish()
});

// src/gigachat-provider.ts
function createGigachat(options = {}) {
  var _a;
  const baseURL =
    (_a = (0, import_provider_utils4.withoutTrailingSlash)(options.baseURL)) != null
      ? _a
      : 'https://gigachat.devices.sberbank.ru/api/v1';
  const getAccessToken = () => ({});
  const getHeaders = () => ({
    Authorization: `Bearer ${(0, import_provider_utils4.loadApiKey)({
      apiKey: options.apiKey,
      environmentVariableName: 'GIGACHAT_ACCESS_TOKEN',
      description: 'GigaChat'
    })}`,
    ...options.headers
  });
  const createChatModel = (modelId, settings = {}) =>
    new GigachatChatLanguageModel(modelId, settings, {
      provider: 'gigachat.chat',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    });
  const createEmbeddingModel = (modelId, settings = {}) =>
    new GigachatEmbeddingModel(modelId, settings, {
      provider: 'gigachat.embedding',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    });
  const provider = function (modelId, settings) {
    if (new.target) {
      throw new Error('Gigachat function cannot be called with the new keyword.');
    }
    return createChatModel(modelId, settings);
  };
  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  return provider;
}
var gigachat = createGigachat();
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    createGigachat,
    gigachat
  });
//# sourceMappingURL=index.js.map
