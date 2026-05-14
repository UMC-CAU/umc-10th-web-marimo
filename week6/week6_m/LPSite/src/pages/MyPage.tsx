import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { ProtectedRoute } from '../components/ProtectedRoute';
import './MyPage.css';

export function MyPage() {
  const { user, setUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [avatar, setAvatar] = useState(user?.avatar ?? '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ?? '');
  const [editError, setEditError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openEdit = () => {
    setName(user?.name ?? '');
    setBio(user?.bio ?? '');
    setAvatar(user?.avatar ?? '');
    setAvatarPreview(user?.avatar ?? '');
    setEditError('');
    setEditOpen(true);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setAvatar(result);
      setAvatarPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const updateMutation = useMutation({
    mutationFn: () => updateUser({
      name: name.trim() || undefined,
      bio: bio || undefined,
      avatar: avatar || undefined,
    }),
    onSuccess: (data) => {
      setUser({ ...user!, name: data.name ?? name, bio: data.bio ?? bio, avatar: data.avatar ?? avatar });
      setEditOpen(false);
    },
    onError: () => {
      setEditError('프로필 수정에 실패했습니다.');
    },
  });


  return (
    <ProtectedRoute>
      <div className="mypage">
        <div className="mypage-card">
          {avatarPreview && !editOpen ? (
            <img src={user?.avatar ?? ''} alt="프로필" className="mypage-avatar-img" />
          ) : (
            <div className="mypage-avatar">
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}
          <h1 className="mypage-name">{user?.name ?? '알 수 없음'}</h1>
          {user?.bio && <p className="mypage-bio">{user.bio}</p>}

          <div className="mypage-actions">
            <button className="mypage-settings" onClick={openEdit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              설정
            </button>
            <button className="mypage-logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* 프로필 수정 모달 */}
      {editOpen && (
        <div className="profile-modal-backdrop" onClick={() => setEditOpen(false)}>
          <div className="profile-modal-box" onClick={e => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2>프로필 수정</h2>
              <button className="profile-modal-close" onClick={() => setEditOpen(false)}>×</button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setEditError(''); updateMutation.mutate(); }} className="profile-modal-form">
              {/* 프로필 사진 */}
              <div className="profile-form-field">
                <label>프로필 사진 (선택)</label>
                <div className="profile-file-drop" onClick={() => fileRef.current?.click()}>
                  {avatarPreview
                    ? <img src={avatarPreview} alt="미리보기" className="profile-file-preview" />
                    : <span className="profile-file-placeholder">클릭하여 사진 선택</span>}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  style={{ display: 'none' }}
                />
              </div>

              {/* 이름 */}
              <div className="profile-form-field">
                <label>이름 *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>

              {/* Bio */}
              <div className="profile-form-field">
                <label>Bio (선택)</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="자기소개를 입력하세요"
                  rows={3}
                />
              </div>

              {editError && <p className="profile-modal-error">{editError}</p>}

              <button
                type="submit"
                className="profile-modal-submit"
                disabled={!name.trim() || updateMutation.isPending}
              >
                {updateMutation.isPending ? '저장 중...' : '저장'}
              </button>
            </form>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}