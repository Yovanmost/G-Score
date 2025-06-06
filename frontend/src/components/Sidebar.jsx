import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { label: 'Menu', path: '/' },
    { label: 'Check Score', path: '/check-score' },
    { label: 'Score Report', path: '/score-report' },
    { label: 'Top Student', path: '/top-student' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-100 overflow-y-auto transition-all duration-300
        ${isOpen ? 'w-60 p-4 border-r' : 'w-0 p-0 border-none'}
      `}
    >
      {isOpen && (
        <>
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">G-Score</h2>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-blue-200 ${
                    isActive ? 'font-bold text-blue-700 bg-blue-100' : 'text-gray-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
