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
import ApplySaForm from './frontend_part/Profile/ApplySaForm';
import Home from './frontend_part/HomeSection/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        // loader: () => fetch('https://EKOTRO-website-server-jade.vercel.app/EKOTRO')
      },
    ],
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
  },
  {
    path: "/apply_sa",
    element: <ApplySaForm></ApplySaForm>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
