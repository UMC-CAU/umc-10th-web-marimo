import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const PageButton = () => {
    return (
        <section className="flex items-center justify-center gap-6 mt-8">
    <button className="w-12 h-10 flex items-center justify-center bg-gray-200 text-white font-bold rounded-md hover:bg-gray-300 transition-colors">
        &lt;
    </button>
    <span className="font-bold text-gray-700">
        1 페이지
    </span>
    <button className="w-12 h-10 flex items-center justify-center bg-fuchsia-300 text-white font-bold rounded-md hover:bg-fuchsia-400 transition-colors">
        &gt;
    </button>
    
</section>
    )
}

export default PageButton;