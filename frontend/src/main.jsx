import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './frontend_part/authentication/Login';
import StudentRegister from './frontend_part/authentication/StudentRegister';
import CompanyRegister from './frontend_part/authentication/CompanyRegister';
import Root from './frontend_part/root/Root';
// import UserProfile from './frontend_part/CommonPage/UserProfile';
import StudentProfile from './frontend_part/Profile/StudentProfile';
import CompanyProfile from './frontend_part/Profile/CompanyProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    // children: [
    //   {
    //     path: '/',
    //     element: <Root></Root>,
    //     // loader: () => fetch('https://tourism-website-server-jade.vercel.app/tourism')
    //   },
    // ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <StudentRegister></StudentRegister>,
  },
  {
    path: "/company_register",
    element: <CompanyRegister></CompanyRegister>,
  },
  {
    path: "/student_profile",
    element: <StudentProfile></StudentProfile>,
  },
  {
    path: "/company_profile",
    element: <CompanyProfile></CompanyProfile>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
