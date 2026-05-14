import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const withdrawMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      logout();
      navigate('/login');
    },
  });

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item" onClick={onClose}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>찾기</span>
          </Link>
          <Link to="/mypage" className="nav-item" onClick={onClose}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>마이페이지</span>
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item withdraw-btn" onClick={() => setConfirmOpen(true)}>
            탈퇴하기
          </button>
        </div>
      </aside>

      {/* 탈퇴 확인 모달 */}
      {confirmOpen && (
        <div className="withdraw-backdrop" onClick={() => setConfirmOpen(false)}>
          <div className="withdraw-modal" onClick={e => e.stopPropagation()}>
            <p className="withdraw-msg">정말 탈퇴하시겠습니까?</p>
            <p className="withdraw-sub">탈퇴 시 모든 데이터가 삭제됩니다.</p>
            {withdrawMutation.isError && (
              <p className="withdraw-error">탈퇴 처리 중 오류가 발생했습니다.</p>
            )}
            <div className="withdraw-actions">
              <button
                className="withdraw-confirm"
                onClick={() => withdrawMutation.mutate()}
                disabled={withdrawMutation.isPending}
              >
                {withdrawMutation.isPending ? '처리 중...' : '예'}
              </button>
              <button
                className="withdraw-cancel"
                onClick={() => setConfirmOpen(false)}
                disabled={withdrawMutation.isPending}
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}