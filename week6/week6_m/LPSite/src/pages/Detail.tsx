import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLPDetail, likeLP, unlikeLP, deleteLP } from '../api/lp';
import { fetchComments, createComment, updateComment, deleteComment } from '../api/comment';
import { Loading } from '../components/Loading';
import { CommentSkeleton } from '../components/Skeleton';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { LPFormModal } from '../components/LPFormModal';
import { useAuthStore } from '../store/authStore';
import { useIntersect } from '../hooks/useIntersect';
import './Detail.css';

function relativeTime(dateStr: string): string {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 60) return '방금 전';
  if (s < 3600) return `${Math.floor(s / 60)}분 전`;
  if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
  const d = Math.floor(s / 86400);
  return d < 30 ? `${d}일 전` : `${Math.floor(d / 30)}달 전`;
}

export function Detail() {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const lpIdNum = parseInt(lpid || '0', 10);

  const [commentOrder, setCommentOrder] = useState<'asc' | 'desc'>('desc');
  const [commentText, setCommentText] = useState('');
  const [editLPOpen, setEditLPOpen] = useState(false);

  /* 댓글 수정 상태 */
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState('');
  /* 댓글 메뉴 오픈 상태 */
  const [menuCommentId, setMenuCommentId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* 메뉴 외부 클릭 시 닫기 */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuCommentId(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* ── LP 상세 ── */
  const { data, isLoading, error } = useQuery({
    queryKey: ['lp', lpIdNum],
    queryFn: () => fetchLPDetail(lpIdNum),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const isLiked = !!data?.likes.some(l => l.userId === user?.id);
  const isOwner = data?.authorId === user?.id;

  const likeMutation = useMutation({
    mutationFn: () => (isLiked ? unlikeLP(lpIdNum) : likeLP(lpIdNum)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lp', lpIdNum] }),
  });

  const deleteLPMutation = useMutation({
    mutationFn: () => deleteLP(lpIdNum),
    onSuccess: () => navigate('/'),
  });

  /* ── 댓글 (useInfiniteQuery) ── */
  const {
    data: commentPages,
    isLoading: commentsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['lpComments', lpIdNum, commentOrder],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      fetchComments(lpIdNum, pageParam, 10, commentOrder),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: p => (p.hasNext ? p.nextCursor : undefined),
    staleTime: 1000 * 60,
  });

  const allComments = commentPages?.pages.flatMap(p => p.data) ?? [];

  const handleCommentIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const commentSentinelRef = useIntersect(handleCommentIntersect);

  const createCommentMutation = useMutation({
    mutationFn: () => createComment(lpIdNum, commentText),
    onSuccess: () => {
      setCommentText('');
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpIdNum] });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(lpIdNum, commentId, content),
    onSuccess: () => {
      setEditingCommentId(null);
      setEditCommentText('');
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpIdNum] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(lpIdNum, commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lpComments', lpIdNum] }),
  });

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    createCommentMutation.mutate();
  };

  const startEditComment = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditCommentText(currentContent);
    setMenuCommentId(null);
  };

  const submitEditComment = (e: React.FormEvent<HTMLFormElement>, commentId: number) => {
    e.preventDefault();
    if (!editCommentText.trim()) return;
    updateCommentMutation.mutate({ commentId, content: editCommentText });
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
            {/* 작성자 + 수정·삭제 */}
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
                  <button
                    className="icon-action"
                    title="수정"
                    onClick={() => setEditLPOpen(true)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="icon-action icon-delete"
                    title="삭제"
                    onClick={() => window.confirm('정말 삭제하시겠습니까?') && deleteLPMutation.mutate()}
                    disabled={deleteLPMutation.isPending}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* 제목 */}
            <h1 className="detail-title">{data.title}</h1>

            {/* 바이닐 레코드 */}
            <div className="vinyl-wrapper">
              <div className="vinyl-container">
                <img className="vinyl-disc" src={data.thumbnail} alt={data.title} />
                <div className="vinyl-hole" />
              </div>
            </div>

            {/* 본문 */}
            {data.content && <p className="detail-content">{data.content}</p>}

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

            {/* ── 댓글 섹션 ── */}
            <section className="comment-section">
              <div className="comment-section-header">
                <h2 className="comment-title">댓글</h2>
                <div className="sort-buttons">
                  <button
                    className={`sort-btn ${commentOrder === 'asc' ? 'active' : ''}`}
                    onClick={() => setCommentOrder('asc')}
                  >오래된순</button>
                  <button
                    className={`sort-btn ${commentOrder === 'desc' ? 'active' : ''}`}
                    onClick={() => setCommentOrder('desc')}
                  >최신순</button>
                </div>
              </div>

              {/* 댓글 작성 */}
              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <input
                  className="comment-input"
                  placeholder="댓글을 입력해주세요"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  maxLength={500}
                />
                <button
                  type="submit"
                  className="comment-submit"
                  disabled={!commentText.trim() || createCommentMutation.isPending}
                >
                  작성
                </button>
              </form>
              {commentText.trim() === '' && createCommentMutation.isError && (
                <p className="comment-hint">댓글 내용을 입력해주세요.</p>
              )}

              {/* 초기 로딩 스켈레톤 */}
              {commentsLoading &&
                Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)}

              {/* 댓글 목록 */}
              {allComments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    {comment.author.name[0]?.toUpperCase()}
                  </div>
                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-author">{comment.author.name}</span>
                      <span className="comment-date">{relativeTime(comment.createdAt)}</span>
                    </div>

                    {/* 수정 모드 */}
                    {editingCommentId === comment.id ? (
                      <form
                        className="comment-edit-form"
                        onSubmit={e => submitEditComment(e, comment.id)}
                      >
                        <input
                          className="comment-input"
                          value={editCommentText}
                          onChange={e => setEditCommentText(e.target.value)}
                          maxLength={500}
                          autoFocus
                        />
                        <div className="comment-edit-actions">
                          <button
                            type="submit"
                            className="comment-submit"
                            disabled={!editCommentText.trim() || updateCommentMutation.isPending}
                          >
                            저장
                          </button>
                          <button
                            type="button"
                            className="comment-cancel"
                            onClick={() => setEditingCommentId(null)}
                          >
                            취소
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="comment-content">{comment.content}</p>
                    )}
                  </div>

                  {/* 본인 댓글 메뉴 */}
                  {comment.authorId === user?.id && editingCommentId !== comment.id && (
                    <div className="comment-menu-wrap" ref={menuCommentId === comment.id ? menuRef : null}>
                      <button
                        className="comment-menu-btn"
                        onClick={() => setMenuCommentId(prev => prev === comment.id ? null : comment.id)}
                        aria-label="댓글 메뉴"
                      >
                        •••
                      </button>
                      {menuCommentId === comment.id && (
                        <div className="comment-menu-dropdown">
                          <button onClick={() => startEditComment(comment.id, comment.content)}>수정</button>
                          <button
                            className="menu-delete"
                            onClick={() => {
                              setMenuCommentId(null);
                              deleteCommentMutation.mutate(comment.id);
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* 추가 로딩 스켈레톤 */}
              {isFetchingNextPage &&
                Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={`next-${i}`} />)}

              {/* 무한 스크롤 센티넬 */}
              <div ref={commentSentinelRef} style={{ height: 1 }} />
            </section>
          </article>
        )}
      </div>

      {/* LP 수정 모달 */}
      {editLPOpen && data && (
        <LPFormModal
          editTarget={data}
          onClose={() => setEditLPOpen(false)}
        />
      )}
    </ProtectedRoute>
  );
}