// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import PageButton from '../components/pageButton';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <PageButton />
      <Outlet />
    </>
  );
};

export default RootLayout;