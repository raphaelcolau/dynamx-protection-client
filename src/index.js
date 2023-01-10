import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageLogin from './pages/pageLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));

const darkDynamXTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e6750c',
      light: '#ffa545',
      dark: '#ad4700',
    },
  },
});

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<PageLogin />}>

  </Route>
))

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkDynamXTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);