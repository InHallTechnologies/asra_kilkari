import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Authentication from './Pages/Authentication/Authentication.component.jsx';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.js';
import { ToastProvider } from './Contexts/ToastContextProvider.jsx';
import HomePage from './Pages/HomePage/HomePage.component.jsx';
import EnrollChild from './Pages/EnrollChild/EnrollChild.component.jsx';
import UpdateInformation from './Pages/UpdateInformation/UpdateInformation.component.jsx';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication />
    },
    {
        path: "/home",
        element: <HomePage />
    },
    {
        path: "/enroll-child",
        element: <EnrollChild />
    },
    {
        path: "/update-information",
        element: <UpdateInformation />
    }
])


createRoot(document.getElementById('root')).render(

    <ThemeProvider theme={theme} >
        <ToastProvider>
            <RouterProvider router={router} />
        </ToastProvider>
    </ThemeProvider>
)
