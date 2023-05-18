import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import Root from './routes/root';
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import './index.css'


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  }
}

const theme = extendTheme({ colors })

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={<Root />}
        errorElement={<ErrorPage />}
      />
      {/* <Route
        path='/registerform'
        element={<RegisterForm />}
        errorElement={<ErrorPage />}
      /> */}
      {/* <Route
        path='/login'
        element={<Login />}
        errorElement={<ErrorPage />}
      /> */}
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
