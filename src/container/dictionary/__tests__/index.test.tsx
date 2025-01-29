import React from 'react';
import { render, screen, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from '@jest/globals';
import DictionaryPage from '../index';
import { Wrapper } from '../../../__tests__/wrapper';
import {
  mockGetDictionary,
  spyedGetDictionaryWords
} from '../../../__tests__/mocks/api/dictionaries/get-dictionary-words';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: Wrapper })
  };
};

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
});
