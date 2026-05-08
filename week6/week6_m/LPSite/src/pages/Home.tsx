import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchLPs } from '../api/lp';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import './Home.css';

export function Home() {
  const navigate = useNavigate();
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['lps', sort, page],
    queryFn: () => fetchLPs(page, 12, sort),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });

  const handleCardClick = (id: number) => {
    navigate(`/lp/${id}`);
  };

  const toggleSort = () => {
    setSort(sort === 'latest' ? 'oldest' : 'latest');
    setPage(1);
  };

  return (
    <div className="home">
      <div className="home-header">
        <h2>🎨 LP 목록</h2>
        <button onClick={toggleSort} className="sort-btn">
          {sort === 'latest' ? '최신순' : '오래된순'} 📅
        </button>
      </div>

      {isLoading && <Loading />}

      {error && (
        <div className="error-container">
          <p>❌ 데이터를 불러오는데 실패했습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            다시 시도
          </button>
        </div>
      )}

      {data && (
        <>
          <div className="card-grid">
            {data.data.map((lp) => (
              <Card key={lp.id} lp={lp} onClick={handleCardClick} />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="page-btn"
            >
              ← 이전
            </button>
            <span className="page-info">
              {page} / {Math.ceil(data.pagination.total / data.pagination.limit)}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page === Math.ceil(data.pagination.total / data.pagination.limit)}
              className="page-btn"
            >
              다음 →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
