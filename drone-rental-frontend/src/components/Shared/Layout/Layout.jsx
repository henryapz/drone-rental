import React from 'react';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  return (
    <>
      <header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
