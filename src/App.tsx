import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
