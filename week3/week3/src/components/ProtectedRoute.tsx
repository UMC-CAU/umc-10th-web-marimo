import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. 로그인 상태 확인 (예: localStorage에 accessToken이 있는지 확인)
  // 실제 프로젝트에서는 로컬 스토리지, 쿠키, 혹은 상태 관리 라이브러리(Zustand 등)에서 토큰을 가져옴
  const isAuthenticated = localStorage.getItem('accessToken'); 

  // 2. 토큰이 없다면? -> 로그인 페이지로 강제 이동 (리다이렉트)
  // replace를 true로 주면 뒤로가기를 눌러도 다시 이 페이지로 오지 않게 해줌
  if (!isAuthenticated) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/login" replace />;
  }

  // 3. 토큰이 있다면? -> 원래 가려던 페이지(자식 컴포넌트)를 그대로 보여줌
  return <Outlet />;
};

export default ProtectedRoute;