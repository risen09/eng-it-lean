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
  stream?: boolean;
  repetition_penalty?: number;
  update_interval?: number;
}
