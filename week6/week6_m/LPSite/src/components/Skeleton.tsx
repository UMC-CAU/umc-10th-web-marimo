import './Skeleton.css';

export function CardSkeleton() {
  return <div className="skeleton card-skeleton" />;
}

export function CommentSkeleton() {
  return (
    <div className="comment-skeleton">
      <div className="skeleton comment-sk-avatar" />
      <div className="comment-sk-body">
        <div className="skeleton comment-sk-name" />
        <div className="skeleton comment-sk-text" />
      </div>
    </div>
  );
}
