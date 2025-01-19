import { EmbeddingModelV1, LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
import { FetchFunction, loadApiKey, withoutTrailingSlash } from '@ai-sdk/provider-utils';
import { GigachatChatLanguageModel } from './gigachat-chat-language-model';
import { GigachatChatModelId, GigachatChatSettings } from './gigachat-chat-settings';
import { GigachatEmbeddingModel } from './gigachat-embedding-model';
import { GigachatEmbeddingModelId, GigachatEmbeddingSettings } from './gigachat-embedding-settings';

export interface GigachatProvider extends ProviderV1 {
  (modelId: GigachatChatModelId, settings?: GigachatChatSettings): LanguageModelV1;

  /**
Creates a model for text generation.
*/
  languageModel(modelId: GigachatChatModelId, settings?: GigachatChatSettings): LanguageModelV1;

  /**
Creates a model for text generation.
*/
  chat(modelId: GigachatChatModelId, settings?: GigachatChatSettings): LanguageModelV1;

  /**
@deprecated Use `textEmbeddingModel()` instead.
   */
  embedding(modelId: GigachatEmbeddingModelId, settings?: GigachatEmbeddingSettings): EmbeddingModelV1<string>;

  /**
@deprecated Use `textEmbeddingModel()` instead.
   */
  textEmbedding(modelId: GigachatEmbeddingModelId, settings?: GigachatEmbeddingSettings): EmbeddingModelV1<string>;

  textEmbeddingModel: (
    modelId: GigachatEmbeddingModelId,
    settings?: GigachatEmbeddingSettings
  ) => EmbeddingModelV1<string>;
}

export interface GigachatProviderSettings {
  /**
Use a different URL prefix for API calls, e.g. to use proxy servers.
The default prefix is `https://api.gigachat.ai/v1`.
   */
  baseURL?: string;

  /**
API key that is being send using the `Authorization` header.
It defaults to the `MISTRAL_API_KEY` environment variable.
   */
  apiKey?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: FetchFunction;
}

/**
Create a Gigachat AI provider instance.
 */
export function createGigachat(options: GigachatProviderSettings = {}): GigachatProvider {
  const baseURL = withoutTrailingSlash(options.baseURL) ?? 'https://gigachat.devices.sberbank.ru/api/v1';

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'GIGACHAT_ACCESS_TOKEN',
      description: 'GigaChat'
    })}`,
    ...options.headers
  });

  const createChatModel = (modelId: GigachatChatModelId, settings: GigachatChatSettings = {}) =>
    new GigachatChatLanguageModel(modelId, settings, {
      provider: 'gigachat.chat',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    });

  const createEmbeddingModel = (modelId: GigachatEmbeddingModelId, settings: GigachatEmbeddingSettings = {}) =>
    new GigachatEmbeddingModel(modelId, settings, {
      provider: 'gigachat.embedding',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    });

  const provider = function (modelId: GigachatChatModelId, settings?: GigachatChatSettings) {
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

  return provider as GigachatProvider;
}

/**
Default Gigachat provider instance.
 */
export const gigachat = createGigachat();
