import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'ml-60' : 'ml-0'} w-full transition-all duration-300`}>
        {/* Header with toggle button */}
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
