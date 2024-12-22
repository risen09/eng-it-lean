export interface Dictionary {
  id: number;
  description: string;
  imageFilename: string;
  link: string;
}

export interface DictionaryWords {
  id: number;
  words: Array<{
    id: number;
    word: string;
    translation: string;
    definition: string;
    synonyms: Array<string>;
    examples: Array<string>;
  }>;
}

export type GetDictionaryListResponse = Array<Dictionary>;
export type GetDictionaryWordsResponse = DictionaryWords;
