import { memo } from 'react';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

// memo: selectedMovie 상태 변경(모달 오픈/클로즈) 시 MovieList가 리렌더링되지 않도록 방지
const MovieList = memo(function MovieList({ movies, onMovieClick }: MovieListProps) {
  console.log('[MovieList] 렌더링');

  if (movies.length === 0) return null;

  return (
    <div className="movie-list-container">
      <p className="movie-count">검색 결과: {movies.length}편 (평점 높은 순)</p>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </div>
  );
});

export default MovieList;
