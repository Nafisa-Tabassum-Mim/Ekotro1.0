import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './frontend_part/authentication/Login';
import StudentRegister from './frontend_part/authentication/StudentRegister';
import CompanyRegister from './frontend_part/authentication/CompanyRegister';
import Root from './frontend_part/root/Root';
import StudentProfile from './frontend_part/Profile/StudentProfile';
import CompanyProfile from './frontend_part/Profile/CompanyProfile';
import ApplySaForm from './frontend_part/Profile/ApplySaForm';
import Home from './frontend_part/HomeSection/Home';
import UpcomingEvent from './frontend_part/Event/UpcomingEvent';
import Internship from './frontend_part/Event/Internship';
import EventDetails from './frontend_part/Event/EventDetails';
import ProtectedRoute from './frontend_part/authentication/ProtectedRoute';
import ContactUs from './frontend_part/HomeSection/ContactUs';
import EventWishlist from './frontend_part/Profile/EventWishlist';
import CreateEvent from './frontend_part/AdminPage/CreateEvent';
import ApplyFunding from './frontend_part/AdminPage/ApplyFunding';
import Funding from './frontend_part/Event/Funding';
import All_sa from './frontend_part/AdminPage/All_sa';
import ProtectedAdminRoute from './frontend_part/authentication/ProtectedAdminRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/upcoming_event',
        element: <UpcomingEvent></UpcomingEvent>,
        loader: () => fetch('http://127.0.0.1:5000/event')
      },
      {
        path: '/upcoming_event/:event_id',
        element: <ProtectedRoute> <EventDetails></EventDetails></ProtectedRoute>,
      },
      {
        path: '/internship',
        element: <Internship></Internship>,
      },
      {
        path: '/contact_us',
        element: <ContactUs></ContactUs>,
      },
      // admin 
      {
        path: "/create_event",
        element: <ProtectedAdminRoute><CreateEvent></CreateEvent></ProtectedAdminRoute>,
      },
      {
        path: '/upcoming_event/fund/:event_id',
        element: <ProtectedAdminRoute> <ApplyFunding></ApplyFunding></ProtectedAdminRoute>,
      },
      // student 
      {
        path: "/student_profile",
        element: <ProtectedRoute><StudentProfile></StudentProfile></ProtectedRoute>,
      },
      {
        path: "/apply_sa",
        element: <ProtectedRoute><ApplySaForm></ApplySaForm></ProtectedRoute>,
      },
      {
        path: "/my_eventList",
        element: <ProtectedRoute><EventWishlist></EventWishlist></ProtectedRoute>,
      },
      {
        path: "/all_student_ambassador",
        element: <ProtectedRoute><All_sa></All_sa></ProtectedRoute>,
      },
      {
        path: "/funding",
        element: <Funding></Funding>,
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
    path: "/company_profile",
    element: <CompanyProfile></CompanyProfile>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
