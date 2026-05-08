import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchLPDetail } from '../api/lp';
import { Loading } from '../components/Loading';
import { ProtectedRoute } from '../components/ProtectedRoute';
import './Detail.css';

export function Detail() {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const lpIdNum = parseInt(lpid || '0', 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ['lp', lpIdNum],
    queryFn: () => fetchLPDetail(lpIdNum),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return (
    <ProtectedRoute>
      <div className="detail">
        {isLoading && <Loading />}

        {error && (
          <div className="error-container">
            <p>❌ 데이터를 불러오는데 실패했습니다.</p>
            <button
              onClick={() => navigate('/')}
              className="back-btn"
            >
              돌아가기
            </button>
          </div>
        )}

        {data && (
          <article className="detail-container">
            <button onClick={() => navigate('/')} className="back-btn">
              ← 돌아가기
            </button>

            <div className="detail-header">
              <h1>{data.title}</h1>
              <div className="detail-meta">
                <span>{new Date(data.createdAt).toLocaleDateString('ko-KR')}</span>
                <span>❤️ {data.likes}</span>
              </div>
            </div>

            <div className="detail-image">
              <img src={data.thumbnail} alt={data.title} />
            </div>

            <div className="detail-content">
              <p>{data.description}</p>
              {data.content && (
                <div className="content-body">
                  {data.content}
                </div>
              )}
            </div>

            <div className="detail-actions">
              <button className="btn-like">❤️ 좋아요</button>
              <button className="btn-edit">✏️ 수정</button>
              <button className="btn-delete">🗑️ 삭제</button>
            </div>
          </article>
        )}
      </div>
    </ProtectedRoute>
  );
}
