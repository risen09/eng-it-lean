import React from 'react';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export const Wrapper = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  return <Provider store={setupStore()}>{children}</Provider>;
};
