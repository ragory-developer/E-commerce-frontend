'use client'

import React from 'react';
import NavbarTop from './sections/NavbarTop';
import MiddleBar from './sections/MiddleBar';

const Header = () => {

  return (
    <>
      <NavbarTop />
      {/* navbar search/ middle  */}
      <MiddleBar />
      {/* categorybar  */}

    </>

  );
};

export default Header;