import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Detail } from './pages/Detail';
import { MyPage } from './pages/MyPage';
import { Practice } from './pages/Practice';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { NotFound } from './pages/NotFound';
import './App.css';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/lp/:lpid"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/mypage"
          element={
            <Layout>
              <MyPage />
            </Layout>
          }
        />
        <Route
          path="/practice"
          element={
            <Layout>
              <Practice />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;