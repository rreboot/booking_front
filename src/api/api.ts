import axios from 'axios';
import { IAppointment } from '../pages/Appointments/Appointments';

export const getAppointments = async (token: string): Promise<Array<IAppointment>> => {
  const response = await axios.get<Array<IAppointment>>('/api/v1/appointments/', {
    headers: { 'WWW-Authenticate': `Bearer ${token}` }
  });
  console.log(token);
  response.data.map((appointment: IAppointment) => {
    appointment.scheduled_at = new Date(appointment.scheduled_at);
    appointment.created_at = new Date(appointment.created_at);
    appointment.updated_at = new Date(appointment.updated_at);
  });
  return response.data;
};
