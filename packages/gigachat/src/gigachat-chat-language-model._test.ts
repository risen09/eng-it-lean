import { LanguageModelV1Prompt } from '@ai-sdk/provider';
import { JsonTestServer, StreamingTestServer, convertReadableStreamToArray } from '@ai-sdk/provider-utils/test';
import { createGigachat } from './gigachat-provider';

const TEST_PROMPT: LanguageModelV1Prompt = [{ role: 'user', content: [{ type: 'text', text: 'Hello' }] }];

const provider = createGigachat({ apiKey: 'test-api-key' });
const model = provider.chat('GigaChat');

describe('doGenerate', () => {
  const server = new JsonTestServer('https://gigachat.devices.sberbank.ru/api/v1/chat/completions');

  server.setupTestEnvironment();

  function prepareJsonResponse({
    content = '',
    usage = {
      prompt_tokens: 18,
      total_tokens: 86,
      completion_tokens: 68
    },
    created = 1625284800,
    model = 'GigaChat'
  }: {
    content?: string;
    usage?: {
      prompt_tokens: number;
      total_tokens: number;
      completion_tokens: number;
    };
    created?: number;
    model?: string;
  }) {
    server.responseBodyJson = {
      object: 'chat.completion',
      created,
      model,
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content,
            tool_calls: null,
            data_for_context: [{}]
          },
          finish_reason: 'stop',
        }
      ],
      usage
    };
  }

  it('should extract text response', async () => {
    prepareJsonResponse({ content: 'Hello, World!' });

    const { text } = await model.doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(text).toStrictEqual('Hello, World!');
  });

  it('should avoid duplication when there is a trailing assistant message', async () => {
    prepareJsonResponse({ content: 'prefix and more content' });

    const { text } = await model.doGenerate({
      inputFormat: 'messages',
      mode: { type: 'regular' },
      prompt: [
        { role: 'user', content: [{ type: 'text', text: 'Hello' }] },
        {
          role: 'assistant',
          content: [{ type: 'text', text: 'prefix ' }]
        }
      ]
    });

    expect(text).toStrictEqual('and more content');
  });

  it('should extract tool call response', async () => {
    server.responseBodyJson = {
      object: 'chat.completion',
      created: 1700471392,
      model: 'GigaChat',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: '',
            function_call: {
              name: 'weather_forecast',
              arguments: {
                'location': "Москва",
                'format': 'celcius'
              }
            }
          },
          finish_reason: 'function_calls',
        }
      ],
      usage: { prompt_tokens: 150, total_tokens: 185, completion_tokens: 35 }
    };

    const { toolCalls } = await model.doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(toolCalls).toStrictEqual([
      {
        toolCallId: 'weather_forecast',
        toolCallType: 'function',
        toolName: 'weather_forecast',
        args: '{"location":"Москва","format":"celcius"}'
      }
    ]);
  });

  it('should extract usage', async () => {
    prepareJsonResponse({
      content: '',
      usage: { prompt_tokens: 20, total_tokens: 25, completion_tokens: 5 }
    });

    const { usage } = await model.doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(usage).toStrictEqual({
      promptTokens: 20,
      completionTokens: 5,
    });
  });

  it('should send additional response information', async () => {
    prepareJsonResponse({
      created: 123,
      model: 'test-model'
    });

    const { response } = await model.doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(response).toStrictEqual({
      timestamp: new Date(123 * 1000),
      modelId: 'test-model'
    });
  });

  it('should expose the raw response headers', async () => {
    prepareJsonResponse({ content: '' });

    server.responseHeaders = {
      'test-header': 'test-value'
    };

    const { rawResponse } = await model.doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(rawResponse?.headers).toStrictEqual({
      // default headers:
      'content-length': '271',
      'content-type': 'application/json',

      // custom header
      'test-header': 'test-value'
    });
  });

  it('should pass the model and the messages', async () => {
    prepareJsonResponse({ content: '' });

    await model.doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(await server.getRequestBodyJson()).toStrictEqual({
      model: 'GigaChat',
      messages: [{ role: 'user', content: 'Hello' }]
    });
  });

  it('should pass tools and toolChoice', async () => {
    prepareJsonResponse({ content: '' });

    await model.doGenerate({
      inputFormat: 'prompt',
      mode: {
        type: 'regular',
        tools: [
          {
            type: 'function',
            name: 'test-tool',
            parameters: {
              type: 'object',
              properties: { value: { type: 'string' } },
              required: ['value'],
              additionalProperties: false,
              $schema: 'https://json-schema.org/draft/2019-09/schema#'
            }
          }
        ],
        toolChoice: {
          type: 'tool',
          toolName: 'test-tool'
        }
      },
      prompt: TEST_PROMPT
    });

    expect(await server.getRequestBodyJson()).toStrictEqual({
      model: 'GigaChat',
      messages: [{ role: 'user', content: 'Hello' }],
      tools: [
        {
          type: 'function',
          function: {
            name: 'test-tool',
            parameters: {
              type: 'object',
              properties: { value: { type: 'string' } },
              required: ['value'],
              additionalProperties: false,
              $schema: 'https://json-schema.org/draft/2019-09/schema#'
            }
          }
        }
      ],
      tool_choice: 'any'
    });
  });

  it('should pass headers', async () => {
    prepareJsonResponse({ content: '' });

    const provider = createGigachat({
      apiKey: 'test-api-key',
      headers: {
        'Custom-Provider-Header': 'provider-header-value'
      }
    });

    await provider.chat('Gigachat').doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT,
      headers: {
        'Custom-Request-Header': 'request-header-value'
      }
    });

    const requestHeaders = await server.getRequestHeaders();

    expect(requestHeaders).toStrictEqual({
      authorization: 'Bearer test-api-key',
      'content-type': 'application/json',
      'custom-provider-header': 'provider-header-value',
      'custom-request-header': 'request-header-value'
    });
  });

  it('should send request body', async () => {
    prepareJsonResponse({ content: '' });

    const { request } = await model.doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(request).toStrictEqual({
      body: '{"model":"GigaChat","messages":[{"role":"user","content":"Hello"}]}'
    });
  });
});

describe('doStream', () => {
  const server = new StreamingTestServer('https://gigachat.devices.sberbank.ru/api/v1/chat/completions');

  server.setupTestEnvironment();

  function prepareStreamResponse({ content }: { content: string[] }) {
    server.responseChunks = [
      `data:  {"object":"chat.completion",` +
        `"created":1711097175,"model":"GigaChat","choices":[{"index":0,` +
        `"delta":{"role":"assistant","content":""},"finish_reason":null,"logprobs":null}]}\n\n`,
      ...content.map((text) => {
        return (
          `data:  {"object":"chat.completion",` +
          `"created":1711097175,"model":"GigaChat","choices":[{"index":0,` +
          `"delta":{"role":"assistant","content":"${text}"},"finish_reason":null,"logprobs":null}]}\n\n`
        );
      }),
      `data:  {"object":"chat.completion",` +
        `"created":1711097175,"model":"GigaChat","choices":[{"index":0,` +
        `"delta":{"content":""},"finish_reason":"stop","logprobs":null}],` +
        `"usage":{"prompt_tokens":4,"total_tokens":36,"completion_tokens":32}}\n\n`,
      `data: [DONE]\n\n`
    ];
  }

  it('should stream text deltas', async () => {
    prepareStreamResponse({ content: ['Hello', ', ', 'world!'] });

    const { stream } = await model.doStream({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(await convertReadableStreamToArray(stream)).toStrictEqual([
      {
        type: 'response-metadata',
        timestamp: new Date(1711097175 * 1000),
        modelId: 'GigaChat'
      },
      { type: 'text-delta', textDelta: '' },
      { type: 'text-delta', textDelta: 'Hello' },
      { type: 'text-delta', textDelta: ', ' },
      { type: 'text-delta', textDelta: 'world!' },
      { type: 'text-delta', textDelta: '' },
      {
        type: 'finish',
        finishReason: 'stop',
        usage: { promptTokens: 4, completionTokens: 32 }
      }
    ]);
  });

  it('should avoid duplication when there is a trailing assistant message', async () => {
    prepareStreamResponse({ content: ['prefix', ' and', ' more content'] });

    const { stream } = await model.doStream({
      inputFormat: 'messages',
      mode: { type: 'regular' },
      prompt: [
        { role: 'user', content: [{ type: 'text', text: 'Hello' }] },
        {
          role: 'assistant',
          content: [{ type: 'text', text: 'prefix ' }]
        }
      ]
    });

    expect(await convertReadableStreamToArray(stream)).toStrictEqual([
      {
        type: 'response-metadata',
        timestamp: new Date(1711097175 * 1000),
        modelId: 'GigaChat'
      },
      { type: 'text-delta', textDelta: '' },
      { type: 'text-delta', textDelta: 'and' },
      { type: 'text-delta', textDelta: ' more content' },
      { type: 'text-delta', textDelta: '' },
      {
        type: 'finish',
        finishReason: 'stop',
        usage: { promptTokens: 4, completionTokens: 32 }
      }
    ]);
  });

  it('should stream tool deltas', async () => {
    server.responseChunks = [
      `data: {"object":"chat.completion","created":1711365023,"model":"GigaChat",` +
        `"choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null,"logprobs":null}]}\n\n`,
      `data: {"object":"chat.completion","created":1711365023,"model":"GigaChat",` +
        `"choices":[{"index":0,"delta":{"content":null,"tool_calls":[{"id":"yfBEybNYi","function":{"name":"test-tool","arguments":` +
        `"{\\"value\\":\\"Sparkle Day\\"}"` +
        `}}]},"finish_reason":"tool_calls","logprobs":null}],"usage":{"prompt_tokens":183,"total_tokens":316,"completion_tokens":133}}\n\n`,
      'data: [DONE]\n\n'
    ];

    const { stream } = await createGigachat({
      apiKey: 'test-api-key'
    })
      .chat('GigaChat')
      .doStream({
        inputFormat: 'prompt',
        mode: {
          type: 'regular',
          tools: [
            {
              type: 'function',
              name: 'function-tool',
              parameters: {
                type: 'object',
                properties: { value: { type: 'string' } },
                required: ['value'],
                additionalProperties: false,
                $schema: 'https://json-schema.org/draft/2019-09/schema#'
              }
            }
          ]
        },
        prompt: TEST_PROMPT
      });

    expect(await convertReadableStreamToArray(stream)).toStrictEqual([
      {
        type: 'response-metadata',
        timestamp: new Date(1711365023 * 1000),
        modelId: 'GigaChat'
      },
      { type: 'text-delta', textDelta: '' },
      {
        type: 'tool-call-delta',
        toolCallId: 'yfBEybNYi',
        toolCallType: 'function',
        toolName: 'test-tool',
        argsTextDelta: '{"value":"Sparkle Day"}'
      },
      {
        type: 'tool-call',
        toolCallId: 'yfBEybNYi',
        toolCallType: 'function',
        toolName: 'test-tool',
        args: '{"value":"Sparkle Day"}'
      },
      {
        type: 'finish',
        finishReason: 'function-call',
        usage: { promptTokens: 183, completionTokens: 133 }
      }
    ]);
  });

  it('should expose the raw response headers', async () => {
    prepareStreamResponse({ content: [] });

    server.responseHeaders = {
      'test-header': 'test-value'
    };

    const { rawResponse } = await model.doStream({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(rawResponse?.headers).toStrictEqual({
      // default headers:
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',

      // custom header
      'test-header': 'test-value'
    });
  });

  it('should pass the messages', async () => {
    prepareStreamResponse({ content: [''] });

    await model.doStream({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(await server.getRequestBodyJson()).toStrictEqual({
      stream: true,
      model: 'GigaChat',
      messages: [{ role: 'user', content: 'Hello' }]
    });
  });

  it('should pass headers', async () => {
    prepareStreamResponse({ content: [] });

    const provider = createGigachat({
      apiKey: 'test-api-key',
      headers: {
        'Custom-Provider-Header': 'provider-header-value'
      }
    });

    await provider.chat('Gigachat').doStream({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT,
      headers: {
        'Custom-Request-Header': 'request-header-value'
      }
    });

    const requestHeaders = await server.getRequestHeaders();

    expect(requestHeaders).toStrictEqual({
      authorization: 'Bearer test-api-key',
      'content-type': 'application/json',
      'custom-provider-header': 'provider-header-value',
      'custom-request-header': 'request-header-value'
    });
  });

  it('should send request body', async () => {
    prepareStreamResponse({ content: [] });

    const { request } = await model.doStream({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      prompt: TEST_PROMPT
    });

    expect(request).toStrictEqual({
      body: '{"model":"GigaChat","stream":true,"messages":[{"role":"user","content":"Hello"}]}'
    });
  });
});
