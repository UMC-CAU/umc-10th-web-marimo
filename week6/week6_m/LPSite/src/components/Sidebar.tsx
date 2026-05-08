import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="burger-btn" onClick={toggleSidebar}>
        <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
        </svg>
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item" onClick={closeSidebar}>
            🏠 홈
          </Link>
          <Link to="/" className="nav-item" onClick={closeSidebar}>
            🎨 핏
          </Link>
          <Link to="/" className="nav-item" onClick={closeSidebar}>
            👥 커뮤니티
          </Link>
          <Link to="/" className="nav-item" onClick={closeSidebar}>
            ⭐ 인기
          </Link>
        </nav>
      </aside>
    </>
  );
}
