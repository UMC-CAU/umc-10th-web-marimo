import { useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchLPs } from '../api/lp';
import { Card } from '../components/Card';
import { CardSkeleton } from '../components/Skeleton';
import { useIntersect } from '../hooks/useIntersect';
import { useDebounce } from '../hooks/useDebounce';
import './Search.css';

const LIMIT = 18;

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const trimmed = debouncedQuery.trim();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['search', trimmed],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      fetchLPs(pageParam, LIMIT, 'desc', trimmed),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: trimmed.length > 0,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 5,
  });

  const allLPs = data?.pages.flatMap((page) => page.data) ?? [];

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersect(handleIntersect);

  return (
    <div className="search-page">
      <div className="search-bar-wrap">
        <div className="search-input-group">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            type="text"
            autoFocus
            placeholder="LP 제목을 검색해보세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')} aria-label="지우기">
              ×
            </button>
          )}
        </div>
      </div>

      {/* 검색어 없을 때 */}
      {!trimmed && (
        <div className="search-empty">
          <p>검색어를 입력하면 LP를 찾아드릴게요.</p>
        </div>
      )}

      {/* 에러 */}
      {isError && (
        <div className="search-empty">
          <p>검색 중 오류가 발생했습니다.</p>
        </div>
      )}

      {/* 로딩 (첫 페이지) */}
      {isLoading && trimmed && (
        <div className="search-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 결과 없음 */}
      {!isLoading && trimmed && allLPs.length === 0 && !isError && (
        <div className="search-empty">
          <p>"{trimmed}"에 대한 검색 결과가 없습니다.</p>
        </div>
      )}

      {/* 결과 카드 그리드 */}
      {allLPs.length > 0 && (
        <>
          <p className="search-result-label">
            <strong>{trimmed}</strong> 검색 결과
          </p>
          <div className="search-grid">
            {allLPs.map((lp) => (
              <Card key={lp.id} lp={lp} onClick={(id) => navigate(`/lp/${id}`)} />
            ))}
            {isFetchingNextPage &&
              Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={`next-${i}`} />
              ))}
          </div>
          <div ref={sentinelRef} style={{ height: 1 }} />
        </>
      )}
    </div>
  );
}
