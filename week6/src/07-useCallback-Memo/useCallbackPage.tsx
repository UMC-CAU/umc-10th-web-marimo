import { useState, useCallback, useMemo } from 'react';
import { useMovieSearch } from './hooks/useMovieSearch';
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import type { Movie } from './types/movie';
import './movieSearch.css';

export default function UseCallbackPage() {
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { movies, loading, error, searchMovies } = useMovieSearch();

  // ─────────────────────────────────────────────
  // useCallback: state setter는 항상 안정적 → deps 빈 배열
  // → SearchForm에 전달해도 SearchForm이 불필요하게 리렌더링되지 않음
  // ─────────────────────────────────────────────
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleAdultChange = useCallback((value: boolean) => {
    setIncludeAdult(value);
  }, []);

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
  }, []);

  // query/includeAdult/language가 바뀔 때만 함수 재생성
  const handleSearch = useCallback(() => {
    searchMovies(query, includeAdult, language);
  }, [query, includeAdult, language, searchMovies]);

  // setSelectedMovie는 안정적 → deps 빈 배열
  // → MovieList/MovieCard에 전달해도 selectedMovie 변경 시 리렌더링 없음
  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  // ─────────────────────────────────────────────
  // useMemo: movies 배열이 바뀔 때만 정렬 재계산
  // → selectedMovie 변경, language 변경 등 다른 상태 변경 시 재계산 안 함
  // ─────────────────────────────────────────────
  const sortedMovies = useMemo(() => {
    console.log('[useMemo] 영화 목록 평점 정렬 실행');
    return [...movies].sort((a, b) => b.vote_average - a.vote_average);
  }, [movies]);

  return (
    <div className="movie-search-page">
      <header className="movie-header">
        <h1 className="movie-header-title">🎬 영화 검색</h1>
        <SearchForm
          query={query}
          includeAdult={includeAdult}
          language={language}
          onQueryChange={handleQueryChange}
          onAdultChange={handleAdultChange}
          onLanguageChange={handleLanguageChange}
          onSubmit={handleSearch}
        />
      </header>

      <main className="movie-main">
        {loading && <p className="movie-status">검색 중...</p>}
        {error && <p className="movie-status error">{error}</p>}
        {!loading && !error && movies.length === 0 && query && (
          <p className="movie-status">검색 결과가 없습니다.</p>
        )}
        <MovieList movies={sortedMovies} onMovieClick={handleMovieClick} />
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
