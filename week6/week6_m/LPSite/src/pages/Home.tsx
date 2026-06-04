import { useState, useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchLPs } from '../api/lp';
import { Card } from '../components/Card';
import { CardSkeleton } from '../components/Skeleton';
import { useIntersect } from '../hooks/useIntersect';
import { useThrottle } from '../hooks/useThrottle';
import './Home.css';

const LIMIT = 18;
const SKELETON_COUNT = LIMIT;
// 스크롤 이벤트를 1초에 한 번만 처리 (너무 빠른 연속 요청 방지)
const THROTTLE_INTERVAL = 1000;

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

  // 교차 감지 이벤트를 카운터로 변환 → useThrottle로 throttle
  const [intersectTick, setIntersectTick] = useState(0);
  const throttledTick = useThrottle(intersectTick, THROTTLE_INTERVAL);

  // stale closure 없이 항상 최신 값을 읽기 위한 ref
  const latestRef = useRef({ hasNextPage, isFetchingNextPage, fetchNextPage });
  latestRef.current = { hasNextPage, isFetchingNextPage, fetchNextPage };

  const handleIntersect = useCallback(() => {
    setIntersectTick(t => t + 1);
  }, []);

  // throttledTick이 바뀔 때만 실행 → 1초에 한 번만 fetchNextPage 호출
  useEffect(() => {
    if (throttledTick === 0) return;
    const { hasNextPage: has, isFetchingNextPage: fetching, fetchNextPage: doFetch } =
      latestRef.current;
    if (has && !fetching) {
      console.log(`[Throttle] fetchNextPage 호출 (tick: ${throttledTick})`);
      doFetch();
    }
  }, [throttledTick]);

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
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}

        {allLPs.map(lp => (
          <Card key={lp.id} lp={lp} onClick={id => navigate(`/lp/${id}`)} />
        ))}

        {isFetchingNextPage &&
          Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={`next-${i}`} />
          ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
