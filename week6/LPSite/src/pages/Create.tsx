import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ProtectedRoute } from '../components/ProtectedRoute';

export function Create() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <ProtectedRoute>
      <div className="create">
        <div className="create-card">
          <div className="create-avatar">
            {user?.name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <h1 className="create-name">{user?.name ?? '알 수 없음'}</h1>
          <button className="create-logout" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
