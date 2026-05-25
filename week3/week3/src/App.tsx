import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useEffect } from 'react';
import Loading from './components/Loading';

import HomePage from './pages/home';
import Movies from './pages/movies';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';
import NowPlayingMoviesPage from './pages/showing_mov';
import UpcomingMoviesPage from './pages/soon_mov';
import TopRatedMoviesPage from './pages/estimation_mov';
import MovieDetailPage from './pages/movie-detail';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ProtectedRoute from './components/ProtectedRoute';
import OAuthCallbackPage from './pages/oauth-callback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'v1/auth/google/callback',
        element: <OAuthCallbackPage />,
      },
      
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'movies',
            element: <Movies />
          },
          {
            path: 'movies/:movieId',
            element: <MovieDetailPage />
          },
          {
            path: 'showing',
            element: <NowPlayingMoviesPage />
          },
          {
            path: 'soon',
            element: <UpcomingMoviesPage />
          },
          {
            path: 'top-rated',
            element: <TopRatedMoviesPage />
          },
        ],
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = React.useState(true);

  const handleLoading = async () => {
  
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    handleLoading();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
}

export default App;