'use client'

import React from 'react';
import HeaderTop from "./sections/HeaderTop";
import MiddleBar from './sections/MiddleBar';

const Header = () => {

  return (
    <>
      <HeaderTop />
      {/* navbar search/ middle  */}
      <MiddleBar />
      {/* categorybar  */}
    </>
  );
};

export default Header;