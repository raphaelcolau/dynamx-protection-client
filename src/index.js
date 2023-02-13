import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageLogin from './pages/pageLogin';
import PageHome from './pages/pageHome';
import PageAdd from './pages/pageAdd';
import PagePacks from './pages/pagePacks';
import PageWhitelist from './pages/pageWhitelist';
import PageBlacklist from './pages/pageBlacklist';

const root = ReactDOM.createRoot(document.getElementById('root'));

const darkDynamXTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e6750c',
      light: '#ffa545',
      dark: '#ad4700',
    },
    background: {
      default: '#2F2F2F',
      paper: '#2F2F2F',
    },
  },
});

const router = createBrowserRouter([
  { path: '/', element: <PageLogin /> },
  { path: '/home', element: <PageHome /> },
  { path: '/add', element: <PageAdd /> },
  { path: '/packs', element: <PagePacks /> },
  { path: '/whitelist', element: <PageWhitelist /> },
  { path: '/blacklist', element: <PageBlacklist /> },
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkDynamXTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);