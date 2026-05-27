import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LPFormModal } from './LPFormModal';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="layout">
      <Header onMenuClick={() => setSidebarOpen(o => !o)} />
      <div className="layout-container">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content">
          {children}
        </main>
      </div>
      <button className="floating-btn" onClick={() => setCreateModalOpen(true)}>
        +
      </button>
      {createModalOpen && <LPFormModal onClose={() => setCreateModalOpen(false)} />}
    </div>
  );
}