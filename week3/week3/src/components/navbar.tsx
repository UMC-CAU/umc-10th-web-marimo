import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center gap-4">
      <NavLink
        to="/"
        className= {({isActive})=>
          `mr-4
          ${isActive
          ? "text-green-400"
          : "text-gray-500 hover:text-blue-700"
          }`
        }
        >
        홈
      </NavLink>
      <NavLink
        to="/movies"
        className = {({isActive})=>
          `mr-4
          ${isActive
          ? "text-green-400"
          : "text-gray-500 hover:text-blue-700"
          }`
        }
        >
        인기 영화
      </NavLink>
      <NavLink
        to="/showing"
        className = {({isActive})=>
          `mr-4
          ${isActive
          ? "text-green-400"
          : "text-gray-500 hover:text-blue-700"
          }`
        }
        >
        상영 중
      </NavLink>
      <NavLink
        to="/top-rated"
        className = {({isActive})=>
          `mr-4
          ${isActive
          ? "text-green-400"
          : "text-gray-500 hover:text-blue-700"
          }`
        }
        >
        평점 높은
      </NavLink>
      <NavLink
        to="/soon"
        className = {({isActive})=>
          `mr-4
          ${isActive
          ? "text-green-400"
          : "text-gray-500 hover:text-blue-700"
          }`
        }
        >
        개봉 예정
      </NavLink>

    </nav>
  );
};

export default Navbar;