import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDataToken, UserContext } from '../..';
import { Copyright } from '../../components/Copyright/Copyright';

export const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const signInClick = (): void => {
    const data = {
      username: email,
      password: password
    };
    const params = new URLSearchParams(data).toString();
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    axios
      .post<IDataToken>('/api/v1/auth/login', params, config)
      .then((response: AxiosResponse<IDataToken>) => {
        context.access_token = response.data.access_token;
        navigate('/appointments');
      });
  };
  return (
    <Container maxWidth="sm">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Введите email"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить меня"
          />
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={signInClick}>
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => navigate('/signup')}>
                {'Зарегистрироваться'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};
