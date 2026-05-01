import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {type Movie, type MovieResponse} from '../types/movie';
import axios from 'axios';
import PageButton from '../components/pageButton';

const NowPlayingMoviesPage = () => {
  const [movies, setMovies] =useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const {data} = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch {
        setError('영화 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      }
    };

    fetchMovies();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  if (error) {
    return <p className="p-5 text-red-500 font-semibold">{error}</p>;
  }
  
  return (
    <>
    <PageButton
        page={page}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        isPrevDisabled={page === 1}
        isNextDisabled={page >= totalPages}
      />
      <ul className="grid grid-cols-6 gap-5 p-5 m-0">
        {movies?.map((movie) => (
          <li key={movie.id} className="relative list-none">
            <Link to={`/movies/${movie.id}`} className="group block cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg shadow-md transition-all duration-300 ease-in-out
            group-hover:scale-105 group-hover:blur-[3px] group-hover:brightness-50"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          text-center text-white w-[90%] flex flex-col items-center gap-2
                          opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 pointer-events-none">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-200 m-0 line-clamp-5">{movie.release_date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      
    </>
  );
};

export default NowPlayingMoviesPage;

