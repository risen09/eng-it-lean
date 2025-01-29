import React from "react";
import { Link } from "react-router-dom";
import { getNavigationsValue } from "@brojs/cli";
import mainLogo from './images/Logo_new.jpg';
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBFooter,
  MDBIcon
} from 'mdb-react-ui-kit';

const contacts = [
  { id: 1, title: "VK", description: "ВКонтакте", link: "https://vk.com" },
  {
    id: 2,
    title: "VK",
    description: "Группа ВКонтакте",
    link: "https://vk.com",
  },
];

export function Footer() {
  return (
    <footer>
      <MDBFooter bgColor="white" className="text-center text-lg-start text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between border-bottom">
        </section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5" fluid={true} >
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
                    <h6 className="text-uppercase fw-bold">
                      Eng-it-learn
                    </h6>
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <p>
                      Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit.
                    </p>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCol>
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <MDBListGroup style={{ minWidth: '15rem' }} light>
                  <MDBListGroupItem noBorders className="px-3">
                    <h6 className="text-uppercase fw-bold">Навигация</h6>
                  </MDBListGroupItem>
                  <MDBListGroupItem tag="a" href="#" action noBorders className='px-3 rounded-3 mb-2'>
                    Dapibus ac facilisis in
                  </MDBListGroupItem>
                  <MDBListGroupItem tag="a" href="#" action noBorders className="px-3 rounded-3 mb-2">
                    Morbi leo risus
                  </MDBListGroupItem>
                  <MDBListGroupItem tag="a" href="#" action noBorders className="px-3 rounded-3 mb-2">
                    Porta ac consectetur ac
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <MDBListGroup style={{ minWidth: 'auto' }} light>
                  <MDBListGroupItem noBorders>
                    <h6 className="text-uppercase fw-bold" >Контакты</h6>
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon color="secondary" icon="home" className="me-2" />
                    Казань, It-park
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon color="secondary" icon="envelope" className="me-3" />
                    info@example.com
                  </MDBListGroupItem>
                  <MDBListGroupItem noBorders>
                    <MDBIcon color="secondary" icon="phone" className="me-3" />+ 8 800 355 35 35
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </MDBFooter>
      <MDBRow className="bg-body-tertiary mb-3">
        <MDBCol md="4" className="ms-auto"></MDBCol>
      </MDBRow>
    </footer>
  );
}

const Footerd = (): React.ReactElement => {
  const contactLinks = contacts.map((contact) => (
    <li>
      <a href={contact.link}>
        <p>
          <strong>{contact.title}: </strong>
          {contact.description}
        </p>
      </a>
    </li>
  ));

  return (
    <footer>
      <div className="container">
        <div className="left-footer-z">
          <div className="left-footer">
            <ul>
              <li>
                <p>Возникли проблемы с сайтом?</p>
              </li>
              <li>
                <Link to={getNavigationsValue("sandbox.main")}>
                  Написать в поддержку
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-footer">
            <ul>
              <li>
                <p>Контакты</p>
              </li>
              {contactLinks}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
