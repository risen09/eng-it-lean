export interface Word {
  id: number;
  word: string;
  translation: string;
  definition: string;
  synonyms: Array<string>;
  examples: Array<string>;
}

export type GetWordResponse = Word;
export type GetWordsResponse = Array<Word>;