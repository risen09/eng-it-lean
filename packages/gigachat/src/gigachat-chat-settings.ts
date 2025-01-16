// https://developers.sber.ru/docs/ru/gigachat/models
export type GigachatChatModelId =
  // premier
  | 'GigaChat-Pro'
  | 'GigaChat-Max'
  // lite
  | 'GigaChat'
  // legacy
  | (string & {});

export interface GigachatChatSettings {
  /**
Whether to inject a safety prompt before all conversations.

Defaults to `false`.
   */
  safePrompt?: boolean;
}
