import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { DynamXTheme } from './config/dynamxtheme';
import PageLogin from './pages/pageLogin';
import PageHome from './pages/pageHome';
import PageAdd from './pages/pageAdd';
import PagePacks from './pages/pagePacks';
import PageWhitelist from './pages/pageWhitelist';
import PageBlacklist from './pages/pageBlacklist';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
    <ThemeProvider theme={DynamXTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);