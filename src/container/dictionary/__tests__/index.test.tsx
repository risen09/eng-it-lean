import React from 'react';
import { screen, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, jest, test } from '@jest/globals';
import DictionaryPage from '../index';
import {
  mockGetDictionary,
  spyedGetDictionaryWords
} from '../../../__tests__/mocks/api/dictionaries/get-dictionary-words';
import { renderWithRouter } from '../../../__tests__/utils';

describe('DictionaryPage', () => {
  test('renders', async () => {
    const mockedGetDictionary = mockGetDictionary();

    renderWithRouter(<DictionaryPage />, { route: 'eng-it-lean/dictionary/1' });

    expect(await screen.findAllByRole('heading', { level: 5 })).toHaveLength(10);

    expect(mockedGetDictionary).toHaveBeenCalled();
  });

  test('throws error', async () => {
    spyedGetDictionaryWords.mockRejectedValueOnce({
      error: 'error'
    });

    renderWithRouter(<DictionaryPage />, { route: 'eng-it-lean/dictionary/1' });

    expect(await screen.findByText('Что-то пошло не так')).toBeInTheDocument();
  });

  test("opens details modal with word's synonyms and examples", async () => {
    const user = userEvent.setup();
    mockGetDictionary();
    renderWithRouter(<DictionaryPage />, { route: 'eng-it-lean/dictionary/1' });

    const firstWord = await screen.findByRole('heading', {
      level: 5,
      name: 'Machine Learning'
    });
    expect(firstWord).toBeInTheDocument();

    await user.click(getByRole(firstWord.parentElement, 'button', { name: /more/i }));

    expect(await screen.findByText(/synonyms/)).toBeInTheDocument();
    expect(
      await screen.findByText('We used machine learning techniques to forecast product demand.', { exact: true })
    ).toBeInTheDocument();
  });

  test('open modal and add new word to dictionary', async () => {
    const user = userEvent.setup();

    mockGetDictionary();
    renderWithRouter(<DictionaryPage />, { route: 'eng-it-lean/dictionary/1' });

    const mockObserve = jest.fn();
    const mockUnobserve = jest.fn();
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: jest.fn()
    }));

    const addButton = await screen.findByRole('button', { name: /add/i });
    expect(addButton).toBeInTheDocument();
    await user.click(addButton);

    const modalTitle = await screen.findByRole('heading', { level: 5, name: /добавить термин/i });
    expect(modalTitle).toBeInTheDocument();

    const data = {
      id: 2,
      word: 'term',
      translation: 'термин',
      definition: '',
      synonyms: [],
      examples: []
    };
    const modalTermInput = screen.getByRole('textbox', { name: /term/i });
    expect(modalTermInput).toBeInTheDocument();
    await user.type(modalTermInput, data.word);

    const modalTranslationInput = screen.getByRole('textbox', { name: /term/i });
    expect(modalTranslationInput).toBeInTheDocument();
    await user.type(modalTranslationInput, data.translation);

    const mockedSubmit = jest.fn();
    const submitButton = screen.getByText('Добавить', { exact: true });
    screen.getByRole('form', { name: 'word-form' }).onsubmit = mockedSubmit;
    await user.click(submitButton);
    expect(mockedSubmit).toHaveBeenCalled();
  });
});
