// src/components/navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        홈 페이지로 이동
      </Link>
      <Link to="/movies" className="text-blue-500 hover:text-blue-700 ml-4">
        영화 목록 페이지로 이동
      </Link>
    </nav>
  );
};

export default Navbar;