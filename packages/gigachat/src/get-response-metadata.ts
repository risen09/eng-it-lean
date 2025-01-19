export function getResponseMetadata({
  model,
  created
}: {
  created?: number | undefined | null;
  model?: string | undefined | null;
}) {
  return {
    modelId: model ?? undefined,
    timestamp: created != null ? new Date(created * 1000) : undefined
  };
}
