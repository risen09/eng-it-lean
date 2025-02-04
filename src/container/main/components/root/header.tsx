import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';
import mainLogo from './images/Logo_new.jpg';
import { HeaderNav } from './componenets/HeaderNav';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';

export const App = () => {
  const pagesV1 = [
    { id: 1, title: 'Главная', navigation: 'eng-it-lean.main' },
    { id: 2, title: 'Словари', navigation: 'eng-it-lean.dictionaries' },
    { id: 3, title: 'Материалы', navigation: 'eng-it-lean.units' },
    { id: 4, title: 'ИИ-учитель', navigation: 'eng-it-lean.generate-unit' },
    { id: 5, title: 'Контакты', navigation: 'eng-it-lean.main' }
  ];
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <div className="d-inline-flex position-relative">
                <img
                  className="rounded-4 shadow-4"
                  src={mainLogo}
                  alt="Logo"
                  style={{ width: '70px', height: '70px' }}
                />
              </div>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="#">
                {pagesV1.map((page) => (
                  <HeaderNav
                    key={page.id}
                    to={getNavigationsValue(page.navigation)}
                    hoverColor="#6CBF30"
                    hoverTextColor="White"
                  >
                    {page.title}
                  </HeaderNav>
                ))}
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
        <div className="btn-nav">
          <MDBBtn color="success" tag={Link} to="registration">
            Регистрация
          </MDBBtn>
        </div>
        <div className="btn-nav mx-2">
          <MDBBtn color="success" tag={Link} to="entry">
            Вход
          </MDBBtn>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};
