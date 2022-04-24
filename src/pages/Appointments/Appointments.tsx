import { Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../..';
import { getAppointments } from '../../api/api';

export interface IAppointment {
  id: number;
  name?: string;
  description?: string;
  scheduled_at: Date;
  created_at: Date;
  updated_at: Date;
}

export const Appointments = (): JSX.Element => {
  const context = useContext(UserContext);
  const [appointments, setAppointments] = useState<Array<IAppointment>>();

  const fetchAppointments = async (): Promise<void> => {
    console.log(context.access_token);
    const app = await getAppointments(context.access_token);
    setAppointments(app);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="md">
      <List>
        {appointments?.map((appointment: IAppointment) => (
          <ListItem key={appointment.id}>
            <ListItemText
              primary={appointment.name}
              secondary={appointment.scheduled_at.toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" fullWidth>
        Записаться
      </Button>
    </Container>
  );
};
