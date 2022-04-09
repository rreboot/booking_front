import { Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { getCookie, getCookies, setCookie } from 'typescript-cookie';
import SignIn from './components/Signin/Signin';

const App = (): JSX.Element => {
  return <SignIn />;
};

export default App;
