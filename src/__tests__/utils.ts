import { render } from '@testing-library/react';
import { Wrapper } from './wrapper';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: Wrapper })
  };
};

export { renderWithRouter };
