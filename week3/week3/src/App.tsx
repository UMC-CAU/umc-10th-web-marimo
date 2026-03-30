import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>홈 페이지입니다.</h1>,
    // 매칭 실패/라우트 에러 시 보여줄 UI
    errorElement: <h1>너는 없는 경로에 들어왔다 ^ㅁ^ 야호~!</h1>,
  },
  {
    path: '/movies',
    element: <h1>영화 페이지 입니다.</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;