export type GigachatEmbeddingModelId = 'gigachat-embed' | (string & {});

export interface GigachatEmbeddingSettings {
  /**
Override the maximum number of embeddings per call.
   */
  maxEmbeddingsPerCall?: number;

  /**
Override the parallelism of embedding calls.
    */
  supportsParallelCalls?: boolean;
}
