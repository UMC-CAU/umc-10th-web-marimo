import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './ProtectedRoute.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowModal(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>로그인이 필요합니다</h2>
              <p>이 페이지를 보기 위해서는 로그인이 필요합니다.</p>
              <div className="modal-buttons">
                <button onClick={() => navigate('/login')} className="btn-confirm">
                  로그인하러 가기
                </button>
                <button onClick={() => navigate('/')} className="btn-cancel">
                  돌아가기
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}
