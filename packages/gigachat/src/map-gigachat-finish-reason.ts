import { LanguageModelV1FinishReason } from '@ai-sdk/provider';

export function mapGigachatFinishReason(finishReason: string | null | undefined): LanguageModelV1FinishReason {
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
