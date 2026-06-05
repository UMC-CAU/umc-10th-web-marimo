import { useState, useCallback } from 'react';
import type { Movie, TMDBSearchResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export function useMovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback: searchMovies 함수 참조 고정 (deps 없음 → 항상 동일한 참조)
  const searchMovies = useCallback(async (
    query: string,
    includeAdult: boolean,
    language: string,
  ) => {
    const token = import.meta.env.VITE_TMDB_API_KEY as string | undefined;

    if (!token) {
      setError('.env 파일에 VITE_TMDB_API_KEY를 설정해주세요.');
      return;
    }

    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        query: query.trim(),
        include_adult: String(includeAdult),
        language,
        page: '1',
      });

      const response = await fetch(`${BASE_URL}/search/movie?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }

      const data: TMDBSearchResponse = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, searchMovies };
}
