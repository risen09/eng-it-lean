import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse
} from 'mdb-react-ui-kit';

export const App = () => {
  const pagesV1 = [
    { id: 1, title: 'Главная', navigation: 'eng-it-lean.main' },
    { id: 2, title: 'Практика', navigation: 'eng-it-lean.unit' },
    { id: 3, title: 'Материалы', navigation: 'eng-it-lean.main' },
    { id: 4, title: 'Прогресс', navigation: 'eng-it-lean.main' },
    { id: 5, title: 'Ссылки', navigation: 'eng-it-lean.main' }
  ];
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
                {pagesV1.map((page) => (
                  <Link key={page.id} to={getNavigationsValue(page.navigation)}>{page.title}</Link>
                ))}
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Link</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                Disabled
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

const pagesV1_1 = [{ id: 1, title: "Войти", navigation: "eng-it-lean.registration" }];

const pagesV1 = [
  { id: 1, title: 'Главная', navigation: 'eng-it-lean.main' },
  { id: 2, title: 'Практика', navigation: 'eng-it-lean.unit' },
  { id: 3, title: 'Материалы', navigation: 'eng-it-lean.main' },
  { id: 4, title: 'Прогресс', navigation: 'eng-it-lean.main' },
  { id: 5, title: 'Ссылки', navigation: 'eng-it-lean.main' }
];

export const Header = (): React.ReactElement => {
  const linksV1 = pagesV1.map((page) => (
    <li key={page.id}>
      <Link key={page.id} to={getNavigationsValue(page.navigation)}>{page.title}</Link>
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
        {/* eslint-disable-next-line @typescript-eslint/no-require-imports,jsx-a11y/alt-text */}
        <img src={require('./images/Logo.jpg')} className="logo" />
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
