import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from '@jest/globals'; 
import DictionaryPage from "../index";
import { BrowserRouter } from "react-router-dom";
import { Wrapper } from "../../../__tests__/wrapper";
import { mockGetDictionary, spyedGetDictionaryWords } from "../../../__tests__/mocks/api/dictionaries/get-dictionary-words";

const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    ...render(ui, {wrapper: Wrapper}),
  }
}

import { jest } from '@jest/globals';
jest.mock("react-router-dom", () => ({
  useParams: jest.fn().mockReturnValue(1),
 }));


describe("DictionaryPage", () => {
  test("renders", async () => {
    const mockedGetDictionary = mockGetDictionary();

    renderWithRouter(<DictionaryPage />, { route: 'eng-it-lean/dictionary/1' })

		expect(await screen.findAllByRole("heading", { level: 5 })).toHaveLength(10);

    expect(mockedGetDictionary).toHaveBeenCalled()
  })

  test("throws error", async () => {
		spyedGetDictionaryWords.mockRejectedValueOnce({
			error: "error"
		});

    renderWithRouter(<DictionaryPage />, { route: 'eng-it-lean/dictionary/1' })

		expect(await screen.findByText("Что-то пошло не так")).toBeInTheDocument();
  })
})
