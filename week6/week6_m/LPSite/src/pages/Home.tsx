import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchLPs } from '../api/lp';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import './Home.css';

export function Home() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [cursorHistory, setCursorHistory] = useState<(number | undefined)[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['lps', order, cursor],
    queryFn: () => fetchLPs(cursor, 18, order),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const handleSortChange = (newOrder: 'asc' | 'desc') => {
    if (newOrder === order) return;
    setOrder(newOrder);
    setCursor(undefined);
    setCursorHistory([]);
  };

  const handleNext = () => {
    if (data?.nextCursor) {
      setCursorHistory(prev => [...prev, cursor]);
      setCursor(data.nextCursor);
    }
  };

  const handlePrev = () => {
    if (cursorHistory.length > 0) {
      const newHistory = [...cursorHistory];
      setCursor(newHistory.pop());
      setCursorHistory(newHistory);
    }
  };

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

      {isLoading && <Loading />}

      {error && (
        <div className="error-container">
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            다시 시도
          </button>
        </div>
      )}

      {data && (
        <>
          <div className="card-grid">
            {data.data.map((lp) => (
              <Card key={lp.id} lp={lp} onClick={(id) => navigate(`/lp/${id}`)} />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePrev} disabled={cursorHistory.length === 0} className="page-btn">
              ← 이전
            </button>
            <button onClick={handleNext} disabled={!data.hasNext} className="page-btn">
              다음 →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
