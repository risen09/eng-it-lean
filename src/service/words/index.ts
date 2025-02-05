import { network } from '../network';
import { Word } from './types';

class WordsService {
  async getWords() {
    const response = await network.get('/words');
    return response.data;
  }

  async getWord(id: number) {
    const response = await network.get(`/words/${id}`);
    return response.data;
  }

  async putWord(word: Word) {
    const response = await network.put<Word>(`/words`, word);
    return response.data;
  }

  async deleteWord(id: number) {
    const response = await network.delete(`/words/${id}`);
    return response.data;
  }
}

export const wordsService = new WordsService();
