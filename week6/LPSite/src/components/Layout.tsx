import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LPFormModal } from './LPFormModal';
import { useSidebar } from '../hooks/useSidebar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isOpen, close, toggle } = useSidebar();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="layout">
      <Header onMenuClick={toggle} />
      <Sidebar isOpen={isOpen} onClose={close} />
      <main className="main-content">
        {children}
      </main>
      <button className="floating-btn" onClick={() => setCreateModalOpen(true)}>
        +
      </button>
      {createModalOpen && <LPFormModal onClose={() => setCreateModalOpen(false)} />}
    </div>
  );
}
