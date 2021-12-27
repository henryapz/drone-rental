import React from 'react';
import Footer from '../Footer/Footer';

const Layout = props => {
  return (
    <>
      <header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
