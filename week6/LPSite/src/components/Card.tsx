import { type LP } from '../types';
import './Card.css';

interface CardProps {
  lp: LP;
  onClick: (id: number) => void;
}

function relativeTime(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return '방금 전';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  const days = Math.floor(seconds / 86400);
  if (days < 30) return `${days}일 전`;
  return `${Math.floor(days / 30)}달 전`;
}

export function Card({ lp, onClick }: CardProps) {
  return (
    <article className="card" onClick={() => onClick(lp.id)}>
      <div className="card-image">
        <img src={lp.thumbnail} alt={lp.title} loading="lazy" />
        <div className="card-overlay">
          <p className="card-title">{lp.title}</p>
          <div className="card-sub">
            <span>{relativeTime(lp.createdAt)}</span>
            <span>♥ {lp.likes.length}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
