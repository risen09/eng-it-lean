import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { setupStore } from '../../store';
import { router } from './router';
import { Provider } from 'react-redux';

import './index.css';

const store = setupStore();

const Main = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default Main;
