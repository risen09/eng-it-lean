import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { getNavigationsValue } from "@brojs/cli";
import Root from "./components/root";
import HomePage from "../home";
import DictionaryPage from "../dictionary";

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
    ],
  },
]);
