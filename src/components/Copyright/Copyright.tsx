import { Link, Typography } from '@mui/material';
import React from 'react';

export const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" mt={4} mb={4}>
      {'Copyright © '}
      <Link color="inherit" href="https://google.com/">
        Diana Nails
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
