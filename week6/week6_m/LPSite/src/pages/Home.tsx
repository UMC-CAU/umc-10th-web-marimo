import { useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchLPs } from '../api/lp';
import { Card } from '../components/Card';
import { CardSkeleton } from '../components/Skeleton';
import { useIntersect } from '../hooks/useIntersect';
import './Home.css';

const LIMIT = 18;
const SKELETON_COUNT = LIMIT;

export function Home() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['lps', order],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      fetchLPs(pageParam, LIMIT, order),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const allLPs = data?.pages.flatMap(page => page.data) ?? [];

  const handleSortChange = (newOrder: 'asc' | 'desc') => {
    if (newOrder === order) return;
    setOrder(newOrder);
  };

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersect(handleIntersect);

  return (
    <div className="home">
      <div className="home-header">
        <div className="sort-buttons">
          <button
            className={`sort-btn ${order === 'asc' ? 'active' : ''}`}
            onClick={() => handleSortChange('asc')}
          >오래된순</button>
          <button
            className={`sort-btn ${order === 'desc' ? 'active' : ''}`}
            onClick={() => handleSortChange('desc')}
          >최신순</button>
        </div>
      </div>

      {isError && (
        <div className="error-container">
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            다시 시도
          </button>
        </div>
      )}

      <div className="card-grid">
        {/* 초기 로딩: 스켈레톤 전체 표시 */}
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}

        {/* 로드된 카드 */}
        {allLPs.map(lp => (
          <Card key={lp.id} lp={lp} onClick={id => navigate(`/lp/${id}`)} />
        ))}

        {/* 추가 로딩: 스켈레톤 하단 표시 */}
        {isFetchingNextPage &&
          Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={`next-${i}`} />
          ))}
      </div>

      {/* 무한 스크롤 센티넬 */}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
