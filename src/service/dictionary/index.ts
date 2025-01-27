import { network } from '../network';
import { Word } from '../words/types';
import { GetDictionaryResponse, GetDictionariesResponse } from './types';

class DictionaryService {
  async getDictionaries() {
    const response = await network.get<GetDictionariesResponse>('/dictionaries');
    return response.data;
  }

  async getDictionary(id: number) {
    const response = await network.get<GetDictionaryResponse>(`/dictionaries/${id}`);
    return response.data;
  }

  async postDictionary(id: number, word: Word) {
    const response = await network.post<Word>(`/dictionaries/${id}`, word);
    return response.data;
  }
}

export const dictionaryService = new DictionaryService();
