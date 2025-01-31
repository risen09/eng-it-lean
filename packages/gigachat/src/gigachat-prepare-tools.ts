import { LanguageModelV1, LanguageModelV1CallWarning, UnsupportedFunctionalityError } from '@ai-sdk/provider';

export function prepareTools(
  mode: Parameters<LanguageModelV1['doGenerate']>[0]['mode'] & {
    type: 'regular';
  }
): {
  tools:
    | Array<{
        type: 'function';
        function: {
          name: string;
          description: string | undefined;
          parameters: unknown;
        };
      }>
    | undefined;
  tool_choice: { type: 'function'; function: { name: string } } | 'auto' | 'none' | 'any' | undefined;
  toolWarnings: LanguageModelV1CallWarning[];
} {
  // when the tools array is empty, change it to undefined to prevent errors:
  const tools = mode.tools?.length ? mode.tools : undefined;
  const toolWarnings: LanguageModelV1CallWarning[] = [];

  if (tools == null) {
    return { tools: undefined, tool_choice: undefined, toolWarnings };
  }

  const gigachatTools: Array<{
    type: 'function';
    function: {
      name: string;
      description: string | undefined;
      parameters: unknown;
    };
  }> = [];

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
    return { tools: gigachatTools, tool_choice: undefined, toolWarnings };
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
      const _exhaustiveCheck: never = type;
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
