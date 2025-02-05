import React from 'react';
import { Link } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';
import mainLogo from './images/Logo_new.jpg';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBRow, MDBCol, MDBFooter, MDBIcon } from 'mdb-react-ui-kit';

export function Footer() {
  const pagesV1 = [
    { id: 1, title: 'Главная', navigation: 'eng-it-lean.main' },
    { id: 2, title: 'Словари', navigation: 'eng-it-lean.dictionaries' },
    { id: 3, title: 'Материалы', navigation: 'eng-it-lean.units' },
    { id: 4, title: 'ИИ-учитель', navigation: 'eng-it-lean.generate-unit' },
    { id: 5, title: 'О проекте', navigation: 'eng-it-lean.about' }
  ];
  return (
    <footer>
      <MDBFooter bgColor="white" className="text-center text-lg-start text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between border-bottom"></section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5" fluid={true}>
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="2" xl="1" className="mx-0 mb-4 text-end">
                <div className="d-inline-flex position-relative">
                  <img
                    className="rounded-4 shadow-4"
                    src={mainLogo}
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                </div>
              </MDBCol>
              <MDBCol md="3" lg="4" xl="3" className="mx-0 mb-4">
                <MDBListGroup style={{ minWidth: 'auto' }} light>
                  <MDBListGroupItem noBorders>
                    <h6 className="text-uppercase fw-bold">Eng-it-learn</h6>
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <p>
                      Наш сайт предлагает уникальные курсы и ресурсы, разработанные специально для тех, кто работает в
                      сфере информационных технологий
                    </p>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCol>
              <MDBCol md="3" lg="4" xl="2" className="mx-auto mb-4">
                <MDBListGroup style={{ minWidth: '15rem' }} light>
                  <MDBListGroupItem noBorders className="px-3">
                    <h6 className="text-uppercase fw-bold">Навигация</h6>
                  </MDBListGroupItem>
                  {pagesV1.map((page) => (
                    <MDBListGroupItem
                      tag={Link}
                      key={page.id}
                      to={getNavigationsValue(page.navigation)}
                      action
                      noBorders
                      className="px-3"
                    >
                      {page.title}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <MDBListGroup style={{ minWidth: 'auto' }} light>
                  <MDBListGroupItem noBorders>
                    <h6 className="text-uppercase fw-bold">Контакты</h6>
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon color="secondary" icon="home" className="me-3" />
                    Казань, It-park
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon color="secondary" icon="envelope" className="me-3" />
                    info@example.com
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon color="secondary" icon="phone" className="me-3" />+ 8 800 355 35 35
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon fab color="secondary" icon="vk" className="me-3" />
                    <Link to={'https://vk.com'} style={{ color: '#4f4f4f', textDecoration: 'none' }}>
                      Мы в Вконтакте
                    </Link>
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon fab color="secondary" icon="telegram-plane" className="me-3" />
                    <Link to={'https://web.telegram.org/a/'} style={{ color: '#4f4f4f', textDecoration: 'none' }}>
                      Наш Телеграм
                    </Link>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2025:
          <Link to={'#'} className="text-reset fw-bold">
            Int.tern.dev
          </Link>
        </div>
      </MDBFooter>
      <MDBRow className="bg-body-tertiary mb-3">
        <MDBCol md="4" className="ms-auto"></MDBCol>
      </MDBRow>
    </footer>
  );
}

export default Footer;
