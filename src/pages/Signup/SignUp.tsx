import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios, { AxiosResponse } from 'axios';
import isWeekend from 'date-fns/isWeekend';
import { ru } from 'date-fns/locale';
import React, { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../..';
import { Copyright } from '../../components/Copyright/Copyright';
import { IUser } from '../../components/interface/interface';

export const SignUp = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [value, setValue] = useState<Date | null>(null);

  const signUpClick = (): void => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      password: password
    };
    // const params = new URLSearchParams(data).toString();
    // const config = {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // };

    axios.post<IUser>('/api/v1/auth/signup', data).then((response: AxiosResponse<IUser>) => {
      console.log(response.data);
      navigate('/appointments');
    });
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AssignmentIndOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Как Вас зовут?"
            name="name"
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Введите email"
            name="username"
            autoComplete="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Телефон"
            id="phone"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
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
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={signUpClick}>
            Зарегистрироваться и войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => navigate('/login')}>
                {'Войти в существующий аккаунт'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
        <StaticDatePicker<Date>
          // orientation="landscape"
          openTo="day"
          value={value}
          shouldDisableDate={isWeekend}
          onChange={(newValue: Date | null) => {
            setValue(newValue);
          }}
          renderInput={(params: TextFieldProps) => <TextField {...params} />}
          minDate={new Date()}
          maxDate={new Date('01.01.2023')}
          mask="__.__.____"
          showToolbar
        />
      </LocalizationProvider>
    </Container>
  );
};
