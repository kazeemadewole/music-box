/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import FifthView from './FifthView';
import FirstView from './firstView/FirstView';
import FourthView from './FourthView';
import Header from './MainHeader/MainHeader';
import SecondView from './scondView/SecondView';
import ThirdView from './thirdView/ThirdView';

const LandingPage = () => {
  return (
    <>
      <Header />
      <FirstView />
      <SecondView />
      <ThirdView />
      <FourthView />
      <FifthView />
    </>
  );
};

export default LandingPage;
