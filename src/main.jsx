import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import VideoPage from './routes/videopage';
import MyPage from './routes/mypage';
import UploadVideoPage from './routes/uploadvideopage';
import Favorite from './routes/favoritepage';
import MyVideos from './routes/myvideospage';
import ErrorPage from "./error-page";
import Header from './components/Header';
import Footer from "./components/Footer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

const PageFrame = () => {
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
          element={<VideoPage />}
          errorElement={<ErrorPage />}
        />
        {/* <Route
          path='/test'
          element={<test />}
          errorElement={<ErrorPage />}
        /> */}
        <Route
          // path='mypage/:usrid' // テキトー書いてるので注意
          path='mypage'
          element={<MyPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path='uploadvideo'
          element={<UploadVideoPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path='myvideos'
          element={<MyVideos />}
          errorElement={<ErrorPage />}
        />
        <Route
          path='favorite'
          element={<Favorite />}
          errorElement={<ErrorPage />}
        />
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </ChakraProvider>
  </React.StrictMode>
)
