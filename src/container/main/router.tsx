import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';
import Root from './components/root';
import HomePage from '../home';
import DictionaryPage from '../dictionary';
import LoginPage from '../entry';
import RegistrationPage from '../registration';
import UnitPage from '../unit';
import GenerateUnitPage from '../generate-unit';
import UnitsPage from '../units-list';
import DictionariesPage from '../dictionaries';
import EditUnitPage from '../edit-unit';
import AboutPage from '../about';

export const router = createBrowserRouter([
  {
    path: getNavigationsValue('eng-it-lean.main'),
    element: <Root />,
    children: [
      {
        path: getNavigationsValue('eng-it-lean.main'),
        element: <HomePage />
      },
      {
        path: getNavigationsValue('eng-it-lean.dictionary'),
        element: <DictionaryPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.entry'),
        element: <LoginPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.unit'),
        element: <UnitPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.generate-unit'),
        element: <GenerateUnitPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.registration'),
        element: <RegistrationPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.units'),
        element: <UnitsPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.dictionaries'),
        element: <DictionariesPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.edit-unit'),
        element: <EditUnitPage />
      },
      {
        path: getNavigationsValue('eng-it-lean.about'),
        element: <AboutPage />
      }
    ]
  }
]);
