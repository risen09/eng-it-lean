export type GigachatPrompt = Array<GigachatMessage>;

export type GigachatMessage =
  | GigachatSystemMessage
  | GigachatUserMessage
  | GigachatAssistantMessage
  | GigachatToolMessage;

export interface GigachatSystemMessage {
  role: 'system';
  content: string;
}

export interface GigachatUserMessage {
  role: 'user';
  content: Array<GigachatUserMessageContent>;
}

export type GigachatUserMessageContent = GigachatUserMessageTextContent | GigachatUserMessageImageContent;

export interface GigachatUserMessageImageContent {
  type: 'image_url';
  image_url: string;
}

export interface GigachatUserMessageTextContent {
  type: 'text';
  text: string;
}

export interface GigachatAssistantMessage {
  role: 'assistant';
  content: string;
  prefix?: boolean;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
}

export interface GigachatToolMessage {
  role: 'tool';
  name: string;
  content: string;
  tool_call_id: string;
}
