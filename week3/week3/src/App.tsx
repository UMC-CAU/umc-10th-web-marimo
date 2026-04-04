import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
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
]);

function App() {
  const [loading, setLoading] = React.useState(true);

  const handleLoading = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWM5MzI3YjFlODg3ZmJmZDRkOWZkOTdkNWYwNDhmNCIsIm5iZiI6MTc3NDg2Mzk0NC44NzgsInN1YiI6IjY5Y2E0NjQ4N2ZlNWE0NjI5NzFlY2U4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lUy95AcWLdz_E8WOV6LPrmR9IwqsiZlClH12wZwLzX8',
        },
      });
      const result = await response.json();
      console.log('mainData', result);
      setLoading(false);
    } catch (error){
      window.alert(error);
    }
  };

  useEffect(() => {
    handleLoading();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
};


export default App;