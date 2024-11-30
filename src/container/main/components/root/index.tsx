import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import Header from './header';
import Footer from './footer';

const Root = (): React.ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
