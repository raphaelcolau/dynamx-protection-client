import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import PageLogin from './pages/pageLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<PageLogin />}>

  </Route>
))

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);