import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageButton from './pageButton';
import { useCustomFetch, type QueryParams } from '../hooks/useCustomFetch';
import { type Movie, type MovieResponse } from '../types/movie';

interface MovieListFetcherProps {
  endpoint: string;
  title: string;
  description: string;
  baseParams?: QueryParams;
}

const MovieListFetcher = ({ endpoint, title, description, baseParams }: MovieListFetcherProps) => {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useCustomFetch<MovieResponse>(endpoint, {
    params: {
      language: 'en-US',
      page,
      ...baseParams,
    },
  });

  const movies: Movie[] = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
        <div className="w-12 h-12 rounded-full border-4 border-slate-400/30 border-t-rose-400 animate-spin" />
        <p className="mt-4 text-base md:text-lg">영화 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black p-6">
        <p className="max-w-md text-center text-rose-300 font-semibold leading-7">
          {error}
          <br />
          네트워크 상태를 확인한 뒤 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_50%)] text-slate-100 pb-12">
      <section className="mx-auto max-w-7xl px-5 pt-10 pb-4">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h1>
        <p className="mt-2 text-slate-300">{description}</p>
      </section>

      <PageButton
        page={page}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        isPrevDisabled={page === 1}
        isNextDisabled={page >= totalPages}
      />

      <ul className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-4 px-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <li key={movie.id} className="relative list-none">
            <Link to={`/movies/${movie.id}`} className="group block cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-xl shadow-lg shadow-black/30 transition-all duration-300 ease-in-out group-hover:scale-[1.03] group-hover:blur-[2px] group-hover:brightness-50"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white w-[90%] flex flex-col items-center gap-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 pointer-events-none">
                <h3 className="text-sm md:text-base font-bold line-clamp-2">{movie.title}</h3>
                <p className="text-xs text-gray-200 m-0">개봉일 {movie.release_date}</p>
                <p className="text-xs font-semibold text-amber-300">평점 {movie.vote_average.toFixed(1)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {movies.length === 0 && (
        <p className="mt-10 text-center text-slate-300">표시할 영화가 없습니다.</p>
      )}
    </div>
  );
};

export default MovieListFetcher;