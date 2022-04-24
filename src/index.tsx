import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Complex } from './components/Complex/Complex';
import './index.css';
import { Appointments } from './pages/Appointments/Appointments';
import { ComplexCreate } from './pages/ComplexCreate/ComplexCreate';
import { ComplexList } from './pages/ComplexList/ComplexList';
import { SignIn } from './pages/Signin/Signin';
import { SignUp } from './pages/Signup/SignUp';

export interface IDataToken {
  access_token: string;
  token_type: string;
  expires?: number;
}
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
export const UserContext = React.createContext({} as IDataToken);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="appointments" element={<Appointments />} />
        <Route path="complex">
          <Route path="create" element={<ComplexCreate />} />
          <Route path="list" element={<ComplexList />} />
        </Route>
      </Route>

      <Route path="login" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
