import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import Root from './routes/root';
import MyPage from './routes/mypage';
import UploadVideo from './routes/uploadvideo';
import ErrorPage from "./error-page";
import Header from './components/Header';
import Footer from "./components/Footer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
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

function PageFrame() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<PageFrame />}>
        <Route
          path='list'
          element={<Root />}
          errorElement={<ErrorPage />}
        />
        {/* <Route
          path='/test'
          element={<test />}
          errorElement={<ErrorPage />}
        /> */}
        <Route
          path='mypage/:usrid' // テキトー書いてるので注意
          element={<MyPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path='mypage/uploadvideo'
          element={<UploadVideo />}
          errorElement={<ErrorPage />}
        />
      </Route>
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
