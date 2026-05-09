import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ProtectedRoute } from '../components/ProtectedRoute';
import './MyPage.css';

export function MyPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <ProtectedRoute>
      <div className="mypage">
        <div className="mypage-card">
          <div className="mypage-avatar">
            {user?.name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <h1 className="mypage-name">{user?.name ?? '알 수 없음'}</h1>
          <button className="mypage-logout" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
