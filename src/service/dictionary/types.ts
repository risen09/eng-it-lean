import { Word } from "../words/types";

export interface Dictionary {
  id: number;
  description: string;
  imageFilename: string;
  link: string;
  words: Array<Word>;
}


export type GetDictionaryResponse = Dictionary;
export type GetDictionariesResponse = Array<Dictionary>;