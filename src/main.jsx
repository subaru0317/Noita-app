import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import Root from './routes/root';
import MyPage from './routes/mypage';
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import './index.css'
// import Footer from "./components/Footer";
// import Header from "./components/Header";

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
        path='/test'
        element={<test />}
        errorElement={<ErrorPage />}
      /> */}
      <Route
        path='/mypage/:usrid' // テキトー書いてるので注意
        element={<MyPage />}
        errorElement={<ErrorPage />}
      />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      {/* <RouterProvider router={router}>
        <Header />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Root />
        </React.Suspense>
        <Footer />
      </RouterProvider> */}
    </ChakraProvider>
  </React.StrictMode>,
)
