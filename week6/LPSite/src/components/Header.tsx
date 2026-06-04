import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logoutAPI } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      logout();
      navigate('/');
    },
    onError: () => {
      logout();
      navigate('/');
    },
  });

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="메뉴">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Link to="/" className="logo">Moim</Link>
      </div>

      <nav className="header-nav">
        <button className="icon-btn" aria-label="검색" onClick={() => navigate('/search')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {isAuthenticated && user ? (
          <div className="auth-section">
            <span className="welcome-text">{user.name}님 반갑습니다 👋</span>
            <button
              onClick={() => logoutMutation.mutate()}
              className="btn-logout"
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">로그인</Link>
            <Link to="/signup" className="btn btn-signup">회원가입</Link>
          </div>
        )}
      </nav>
    </header>
  );
}