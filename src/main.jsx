import React, { useEffect, useState, lazy, Suspense } from 'react'
import { ChakraProvider, extendTheme, Flex, Box } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
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

const VideoCardListPage = lazy(() => import('./routes/videocardlistpage'));
const VideoDetailPage = lazy(() => import('./routes/videodetailpage'));
const MyPage = lazy(() => import('./routes/mypage'));
const UploadVideoPage = lazy(() => import('./routes/uploadvideopage'));
const Favorite = lazy(() => import('./routes/favoritepage'));
const MyVideosPage = lazy(() => import('./routes/myvideospage'));
// const ErrorPage = lazy(() => import('./error-page'));

const PageFrame = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
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
