import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { getNavigationsValue } from "@brojs/cli";
import Root from "./components/root";
import HomePage from "../home";
import DictionaryPage from "../dictionary";
import MessagePage from "../message";
import LoginPage from "../entry";
import RegistrationPage from "../registration";
import PersonalAccountPage from "../account";

export const router = createBrowserRouter([
  {
    path: getNavigationsValue("eng-it-lean.main"),
    element: <Root />,
    children: [
      {
        path: getNavigationsValue("eng-it-lean.main"),
        element: <HomePage />,
      },
      {
        path: getNavigationsValue("eng-it-lean.dictionary"),
        element: <DictionaryPage />,
      },
      {
        path: getNavigationsValue("eng-it-lean.message"),
        element: <MessagePage />,
      },
      {
        path: getNavigationsValue("eng-it-lean.entry"),
        element: <LoginPage />,
      },
      {
        path: getNavigationsValue("eng-it-lean.registration"),
        element: <RegistrationPage />,
      },
      {
        path: getNavigationsValue("eng-it-lean.account"),
        element: <PersonalAccountPage />
      }
    ],
  },
]);
