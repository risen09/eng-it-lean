import React from 'react';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export const Wrapper = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  return (
    <MemoryRouter>
      <Provider store={setupStore()}>{children}</Provider>
    </MemoryRouter>
  );
};
