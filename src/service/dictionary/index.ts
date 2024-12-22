import { network } from '../network';
import { GetDictionaryWordsResponse, GetDictionaryListResponse } from './types';

class DictionaryService {
  async getDictionaryList() {
    const response = await network.get<GetDictionaryListResponse>('/dictionaries');
    return response.data;
  }

  async getDictionary(id: number) {
    const response = await network.get<GetDictionaryWordsResponse>(`/dictionaries/${id}`);
    return response.data;
  }
}

export const dictionaryService = new DictionaryService();
