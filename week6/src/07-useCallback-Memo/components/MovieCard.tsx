import { memo } from 'react';
import type { Movie } from '../types/movie';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

// memo: 다른 카드 클릭 시 이 카드가 불필요하게 리렌더링되는 것을 방지
const MovieCard = memo(function MovieCard({ movie, onClick }: MovieCardProps) {
  console.log(`[MovieCard] 렌더링: ${movie.title}`);

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      {movie.poster_path ? (
        <img
          className="movie-card-poster"
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className="movie-card-no-poster">포스터 없음</div>
      )}
      <div className="movie-card-info">
        <p className="movie-card-title">{movie.title}</p>
        <div className="movie-card-meta">
          <span className="movie-card-rating">⭐ {rating}</span>
          <span className="movie-card-year">{year}</span>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
