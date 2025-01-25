import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { Outlet } from 'react-router-dom';
import './index.css';
import { Header, App } from './header';
import Footer from './footer';

const Root = (): React.ReactElement => {
  return (
    <MDBContainer>
      <App />
      <div>
        <Outlet />
      </div>
      <Footer />
    </MDBContainer>
  );
};

export default Root;
