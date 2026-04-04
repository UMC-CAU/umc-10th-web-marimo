import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from './pages/home';
import Movies from './pages/movies';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';
import NowPlayingMoviesPage from './pages/showing_mov';
import UpcomingMoviesPage from './pages/soon_mov';
import TopRatedMoviesPage from './pages/estimation_mov';

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
        element: <Movies />
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
  return <RouterProvider router={router} />;
};

export default App;