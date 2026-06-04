import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './ProtectedRoute.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-icon">🔒</div>
          <h2>로그인이 필요합니다</h2>
          <p>이 페이지를 보려면 로그인이 필요합니다.</p>
          <div className="modal-buttons">
            <button
              className="btn-confirm"
              onClick={() => navigate('/login', { state: { from: location.pathname } })}
            >
              로그인하러 가기
            </button>
            <button className="btn-cancel" onClick={() => navigate('/')}>
              돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
