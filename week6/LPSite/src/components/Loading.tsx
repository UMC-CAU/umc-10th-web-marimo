import './Loading.css';

export function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>로딩 중...</p>
    </div>
  );
}
