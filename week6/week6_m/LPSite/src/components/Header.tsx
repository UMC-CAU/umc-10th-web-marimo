import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { logout } from '../api/auth';
import './Header.css';

export function Header() {
  const { user, isAuthenticated, setAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🎨 Moim</h1>
        </Link>

        <nav className="header-nav">
          {isAuthenticated && user ? (
            <div className="auth-section">
              <span className="welcome-text">{user.nickname}님 반갑습니다 👋</span>
              <button onClick={handleLogout} className="btn-logout">
                로그아웃
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-login">
                로그인
              </Link>
              <Link to="/signup" className="btn btn-signup">
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
