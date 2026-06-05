import { memo, useEffect } from 'react';
import type { Movie } from '../types/movie';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

// memo: 부모 컴포넌트가 리렌더링될 때 모달이 불필요하게 리렌더링되는 것을 방지
const MovieModal = memo(function MovieModal({ movie, onClose }: MovieModalProps) {
  console.log(`[MovieModal] 렌더링: ${movie.title}`);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-x" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        {movie.poster_path && (
          <img
            className="modal-poster"
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <div className="modal-body">
          <h2 className="modal-title">{movie.title}</h2>
          {movie.original_title !== movie.title && (
            <p className="modal-original-title">{movie.original_title}</p>
          )}

          <div className="modal-meta">
            <span>⭐ {rating}</span>
            <span>({movie.vote_count.toLocaleString()}명 평가)</span>
            <span>📅 {movie.release_date || '정보 없음'}</span>
            <span>🌐 {movie.original_language.toUpperCase()}</span>
            {movie.adult && <span className="adult-badge">🔞 성인</span>}
          </div>

          {movie.overview && (
            <p className="modal-overview">{movie.overview}</p>
          )}

          <div className="modal-actions">
            <a
              href={imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="imdb-btn"
            >
              IMDb에서 검색하기
            </a>
            <button className="close-btn" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MovieModal;
