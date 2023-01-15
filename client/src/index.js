import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Layout from "./Layout"
import TablePage from './Pages/TablePage';
import UpdatePage from './Pages/UpdatePage';

import './index.css';
import reportWebVitals from './reportWebVitals';
import CreatePage from './Pages/CreatePage';



const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children: [
      {
      path: "/employees",
      element: <TablePage target = {"employees"} />,
      },
      {
        path: "/equipment",
        element: <TablePage target = {"equipment"} />
      },
      {
        path: "/employees/update/:id",
        element: <UpdatePage target = {"employees"}/>
      },
      {
        path: "/equipment/update/:id",
        element: <UpdatePage target = {"equipment"}/>
      },
      {
        path: "/employees/create",
        element: <CreatePage target = {"employees"}/>
      },
      {
        path: "/equipment/create",
        element: <CreatePage target = {"equipment"}/>
      },
    ],
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
