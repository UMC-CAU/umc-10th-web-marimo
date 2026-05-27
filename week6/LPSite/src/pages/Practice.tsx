import { useCustomFetch } from '../hooks/react_query_test';
import './Practice.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

export function Practice() {
  const { data, isLoading, isError, error, isFetching, refetch } =
    useCustomFetch<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');

  return (
    <div className="practice">
      <h1 className="practice-title">useCustomFetch 실습</h1>

      <section className="practice-section">
        <div className="section-header">
          <h2>GET https://jsonplaceholder.typicode.com/posts</h2>
          <button
            className="btn-outline"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? '갱신 중...' : '수동 refetch'}
          </button>
        </div>
        <p className="section-desc">
          staleTime: 5분 · gcTime: 10분 · retry: 3 · retryDelay: 지수 백오프
        </p>

        {isLoading && <p className="status">로딩 중...</p>}
        {isError && (
          <p className="status error">에러: {(error as Error).message}</p>
        )}

        <ul className="post-list">
          {data?.map((post) => (
            <li key={post.id} className="post-item">
              <span className="post-id">#{post.id}</span>
              <span className="post-title">{post.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
