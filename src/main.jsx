import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import VideoCardListPage from './routes/videocardlistpage';
import VideoDetailPage from "./routes/videodetailpage";
import MyPage from './routes/mypage';
import UploadVideoPage from './routes/uploadvideopage';
import Favorite from './routes/favoritepage';
import MyVideos from './routes/myvideospage';
import ErrorPage from "./error-page";
import Header from './components/Header';
import Footer from './components/Footer';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
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
          index
          element={<VideoCardListPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path='list/:imageId'
          element={<VideoDetailPage />}
          errorElement={<ErrorPage />}
        />
        
        <Route
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
          path='myvideos/:userId'
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
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
