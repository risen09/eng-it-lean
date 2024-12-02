import React from "react";
import { Link } from "react-router-dom";
import { getNavigationsValue } from "@brojs/cli";

const pagesV1_1 = [{ id: 1, title: "Войти", navigation: "eng-it-lean.main" }];

const pagesV1 = [
  { id: 1, title: "Главная", navigation: "eng-it-lean.main" },
  { id: 2, title: "Практика", navigation: "eng-it-lean.main" },
];

const pagesV2 = [
  { id: 1, title: "Материалы", navigation: "eng-it-lean.main" },
  { id: 2, title: "Прогресс", navigation: "eng-it-lean.main" },
  { id: 3, title: "Ссылки", navigation: "eng-it-lean.main" },
];

const Header = (): React.ReactElement => {
  const linksV1 = pagesV1.map((page) => (
    <li key={page.id}>
      <Link to={getNavigationsValue(page.navigation)}>{page.title}</Link>
    </li>
  ));
  const linksV1_1 = pagesV1_1.map((page) => (
    <li key={page.id}>
      <Link to={getNavigationsValue(page.navigation)}>{page.title}</Link>
    </li>
  ));
  const linksV2 = pagesV2.map((page) => (
    <li key={page.id}>
      <Link to={getNavigationsValue(page.navigation)}>{page.title}</Link>
    </li>
  ));

  return (
    <header>
      <div className="container">
        <img src={require("./images/Logo.jpg")} className="logo" />
        <nav className="nav_v1">
          <div className="menu_v1">
            <ul>{linksV1}</ul>
          </div>
          <div className="menu_v1_1">
            <ul>{linksV1_1}</ul>
          </div>
        </nav>
        <nav className="nav_v2">
          <div className="menu_v2">
            <ul>{linksV2}</ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
