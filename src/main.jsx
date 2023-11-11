import React, { useEffect, useState } from 'react'
import { ChakraProvider, extendTheme, Flex, Box } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import VideoCardListPage from './routes/videocardlistpage';
import VideoDetailPage from "./routes/videodetailpage";
import MyPage from './routes/mypage';
import UploadVideoPage from './routes/uploadvideopage';
import Favorite from './routes/favoritepage';
import MyVideosPage from './routes/myvideospage';
import ErrorPage from "./error-page";
import Header from './components/Header';
import Footer from './components/Footer';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useNavigate,
  Navigate
} from "react-router-dom"
import './index.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsAuth(true);
        setLoading(false);
      } else {
        navigate('/');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      {!loading && isAuth && children}
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageFrame />}>
      <Route index element={<VideoCardListPage />} />
      <Route path="list/:imageId" element={<VideoDetailPage />} />
      <Route path="mypage/:userId" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
      <Route path="uploadvideo" element={<ProtectedRoute><UploadVideoPage /></ProtectedRoute>} />
      <Route path="myvideos/:userId" element={<ProtectedRoute><MyVideosPage /></ProtectedRoute>} />
      <Route path="favorite/:userId" element={<ProtectedRoute><Favorite /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
