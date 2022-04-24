import { Box, Button, Container, Slider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios, { AxiosResponse } from 'axios';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IComplex } from '../../components/Complex/Complex';

const marks = [
  {
    value: 30,
    label: '30 мин'
  },
  {
    value: 60,
    label: '1 час'
  },
  {
    value: 120,
    label: '2 часа'
  },
  {
    value: 180,
    label: '3 часа'
  },
  {
    value: 240,
    label: '4 часа'
  },
  {
    value: 300,
    label: '5 часов'
  }
];

export const ComplexCreate = (): JSX.Element => {
  const [complexName, setComplexName] = useState('');
  const [complexDescription, setComplexDescription] = useState('');
  const [interval, setInterval] = useState<number>();
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const handleInterval = (event: Event, newValue: number | Array<number>): void => {
    setInterval(newValue as number);
  };

  const valueLabelFormat = (value: number): string => {
    const duration = intervalToDuration({ start: 0, end: value * 60 * 1000 });
    return formatDuration(duration, { locale: ru });
  };

  const sendData = (): void => {
    const data = {
      name: complexName,
      description: complexDescription,
      interval: interval,
      price: price
    };
    axios.post<IComplex>('/api/v1/complex', data).then((response: AxiosResponse<IComplex>) => {
      // navigate('/appointments');
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" paragraph mt={4}>
        Добавить услугу
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Название услуги"
          name="name"
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) => setComplexName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Описание услуги"
          name="complex"
          multiline
          onChange={(e: ChangeEvent<HTMLInputElement>) => setComplexDescription(e.target.value)}
        />
        <Typography>Продолжительность</Typography>
        <Slider
          aria-label="Продолжительность"
          defaultValue={30}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
          step={10}
          marks={marks}
          min={30}
          max={300}
          onChange={handleInterval}
        />
        <TextField
          margin="normal"
          required
          id="price"
          label="Стоимость, руб"
          name="price"
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value === '' ? 0 : Number(e.target.value))
          }
        />
      </Box>
      <Button variant="contained" sx={{ mt: 3, mb: 2, display: 'block' }} onClick={sendData}>
        Добавить
      </Button>
    </Container>
  );
};
