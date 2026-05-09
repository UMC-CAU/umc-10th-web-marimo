import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLPDetail, likeLP, unlikeLP, deleteLP } from '../api/lp';
import { Loading } from '../components/Loading';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuthStore } from '../store/authStore';
import './Detail.css';

function relativeTime(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return '방금 전';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  const days = Math.floor(seconds / 86400);
  if (days < 30) return `${days}일 전`;
  return `${Math.floor(days / 30)}달 전`;
}

export function Detail() {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const lpIdNum = parseInt(lpid || '0', 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ['lp', lpIdNum],
    queryFn: () => fetchLPDetail(lpIdNum),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const isLiked = !!data?.likes.some(like => like.userId === user?.id);
  const isOwner = data?.authorId === user?.id;

  const likeMutation = useMutation({
    mutationFn: () => isLiked ? unlikeLP(lpIdNum) : likeLP(lpIdNum),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lp', lpIdNum] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLP(lpIdNum),
    onSuccess: () => navigate('/'),
  });

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  return (
    <ProtectedRoute>
      <div className="detail">
        {isLoading && <Loading />}

        {error && (
          <div className="detail-error">
            <p>데이터를 불러오는데 실패했습니다.</p>
            <button onClick={() => navigate('/')}>돌아가기</button>
          </div>
        )}

        {data && (
          <article className="detail-container">
            {/* 상단: 작성자 + 수정/삭제 */}
            <div className="detail-top">
              <div className="detail-author">
                <div className="author-avatar">
                  {data.author?.name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <span className="author-name">{data.author?.name ?? '알 수 없음'}</span>
                  <span className="detail-date">{relativeTime(data.createdAt)}</span>
                </div>
              </div>

              {isOwner && (
                <div className="detail-actions-top">
                  <button className="icon-action" title="수정">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="icon-action icon-delete"
                    title="삭제"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* 제목 */}
            <h1 className="detail-title">{data.title}</h1>

            {/* 바이닐 레코드 이미지 */}
            <div className="vinyl-wrapper">
              <div className="vinyl-container">
                <img className="vinyl-disc" src={data.thumbnail} alt={data.title} />
                <div className="vinyl-hole" />
              </div>
            </div>

            {/* 본문 */}
            {data.content && (
              <p className="detail-content">{data.content}</p>
            )}

            {/* 태그 */}
            {data.tags.length > 0 && (
              <div className="detail-tags">
                {data.tags.map(tag => (
                  <span key={tag.id} className="tag">#{tag.name}</span>
                ))}
              </div>
            )}

            {/* 좋아요 */}
            <div className="detail-footer">
              <button
                className={`like-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => likeMutation.mutate()}
                disabled={likeMutation.isPending}
              >
                <span>{isLiked ? '♥' : '♡'}</span>
                <span>{data.likes.length}</span>
              </button>
            </div>
          </article>
        )}
      </div>
    </ProtectedRoute>
  );
}
