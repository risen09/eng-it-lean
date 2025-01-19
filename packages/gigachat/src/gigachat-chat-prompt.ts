export type GigachatPrompt = Array<GigachatMessage>;

export type GigachatMessage =
  | GigachatSystemMessage
  | GigachatUserMessage
  | GigachatAssistantMessage
  | GigachatFunctionMessage;

export interface GigachatSystemMessage {
  role: 'system';
  content: string;
}

export interface GigachatUserMessage {
  role: 'user';
  content: string;
}

export interface GigachatAssistantMessage {
  role: 'assistant';
  content: string;
  prefix?: boolean;
  function_call?: { name: string; arguments: unknown };
}

export interface GigachatFunctionMessage {
  role: 'function';
  name: string;
  content: string;
}
