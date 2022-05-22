import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/pages/Home/Profile';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import { createTheme, ThemeProvider } from '@mui/material';

let user = { sum: 50, name: 'Avi' };

const theme = createTheme({
  palette: {
    primary: {
      light: 'rgba(0, 171, 85, 0.08)',
      main: '#00ab55',
      dark: '#007B55',
    },
    secondary: {
      light: 'rgba(145, 158, 171, 0.08)',
      main: '#919eab',
    },
    text: {
      primary: '#212b36',
      secondary: '#919eab',
      disabled: '#637381',
    },
    background: {
      paper: '#c8facd',
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<App />}>
            <Route index element={<Home user={user} />} />
            <Route path='transactions' element={<p>Hi</p>}  />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
