import { jest } from '@jest/globals';
import { wordsService } from '../../../../service/words';
import { Word } from '../../../../service/words/types';

export const spyedPutWord = jest.spyOn(wordsService, 'putWord');

// mock putWord method from wordsService
export const mockPutWord = (data?: Word) => {
  spyedPutWord.mockResolvedValue(
    data ?? {
      id: 0,
      word: '',
      translation: '',
      definition: '',
      synonyms: [],
      examples: []
    }
  );

  return spyedPutWord;
};
