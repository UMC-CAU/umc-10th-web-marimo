import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {type Movie, type MovieResponse} from '../types/movie';
import axios from 'axios';

const UpcomingMoviesPage = () => {
  const params = useParams();
  const [movies, setMovies] =useState<Movie[]>([]);

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const {data} = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWM5MzI3YjFlODg3ZmJmZDRkOWZkOTdkNWYwNDhmNCIsIm5iZiI6MTc3NDg2Mzk0NC44NzgsInN1YiI6IjY5Y2E0NjQ4N2ZlNWE0NjI5NzFlY2U4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lUy95AcWLdz_E8WOV6LPrmR9IwqsiZlClH12wZwLzX8',
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);
  
  return (
    <ul className="grid grid-cols-6 gap-5 p-5 m-0">
      {movies?.map((movie) => (
        <li key={movie.id} className="relative list-none group cursor-pointer">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-md transition-all duration-300 ease-in-out
            group-hover:scale-105 group-hover:blur-[3px] group-hover:brightness-50"
            />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          text-center text-white w-[90%] flex flex-col items-center gap-2
                          opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <p className="text-sm text-gray-200 m-0 line-clamp-5">
              {movie.release_date}
              </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UpcomingMoviesPage;

