import { describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import { mockGetUnit } from '../../../__tests__/mocks/api/units/get-unit';
import { renderWithRouter } from '../../../__tests__/utils';
import React from 'react';
import UnitPage from '..';
import { getFeatures } from '@brojs/cli';

describe('UnitPage', () => {
  test('should render', async () => {
    const mockedGetUnit = mockGetUnit();

    renderWithRouter(<UnitPage />, { route: 'eng-it-lean/unit/1' });

    expect(mockedGetUnit).toHaveBeenCalled();

    expect(await screen.findByRole('heading', { level: 1, name: /документация/i})).toBeInTheDocument();
  })
})