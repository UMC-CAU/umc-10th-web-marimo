import { type LP } from '../types';
import './Card.css';

interface CardProps {
  lp: LP;
  onClick: (id: number) => void;
}

export function Card({ lp, onClick }: CardProps) {
  return (
    <article className="card" onClick={() => onClick(lp.id)}>
      <div className="card-image">
        <img src={lp.thumbnail} alt={lp.title} />
        <div className="card-overlay">
          <div className="card-meta">
            <h3 className="card-title">{lp.title}</h3>
            <p className="card-date">{new Date(lp.createdAt).toLocaleDateString('ko-KR')}</p>
            <div className="card-likes">
              <span>❤️ {lp.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
