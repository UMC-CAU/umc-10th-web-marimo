import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {type Movie, type MovieResponse} from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const params = useParams();
  const [movies, setMovies] =useState<Movie[]>([]);

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const {data} = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
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
    <ul className="movie-grid">
      {movies?.map((movie) => (
        <li key={movie.id} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movie-poster" alt={movie.title}/>
          <div className="inner-content">
            <span className="title">{movie.title}</span>
            <span className="overview">
              {movie.overview}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;

