import { Link } from 'react-router-dom';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="relative bg-blue-600 text-white h-16 px-6 flex items-center justify-between shadow-md z-20">
      {/* Sidebar toggle button */}
      <button
        onClick={onToggleSidebar}
        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md z-30"
      >
        ☰ Menu
      </button>

      {/* Centered title with navigation */}
      <Link
        to="/"
        className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold hover:underline"
      >
        G-Score
      </Link>

      {/* Right spacer for layout balance */}
      <div className="w-[74px]"></div>
    </header>
  );
};

export default Header;
