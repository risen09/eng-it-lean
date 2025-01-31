import { LanguageModelV1Prompt, UnsupportedFunctionalityError } from '@ai-sdk/provider';
import { convertUint8ArrayToBase64 } from '@ai-sdk/provider-utils';
import { GigachatPrompt } from './gigachat-chat-prompt';

export function convertToGigachatChatMessages(prompt: LanguageModelV1Prompt): GigachatPrompt {
  const messages: GigachatPrompt = [];

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
          content: content.map((part) => {
            switch (part.type) {
              case 'text': {
                return part.text;
              }
              case 'image': {
                throw new UnsupportedFunctionalityError({
                  functionality: 'Images should be added in "attachments" object'
                });
              }
              case 'file': {
                throw new UnsupportedFunctionalityError({
                  functionality: 'File content parts in user messages'
                });
              }
            }
          }).join('')
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
              const _exhaustiveCheck: never = part;
              throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
            }
          }
        }

        messages.push({
          role: 'assistant',
          content: text,
          prefix: isLastMessage ? true : undefined,
          function_call: functionCall
        });

        break;
      }
      case 'tool': {
        for (const toolResponse of content) {
          messages.push({
            role: 'function',
            name: toolResponse.toolName,
            content: JSON.stringify(toolResponse.result),
          });
        }
        break;
      }
      default: {
        const _exhaustiveCheck: never = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }

  return messages;
}
