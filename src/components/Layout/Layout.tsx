import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useStore } from '../../store/useStore';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useStore();

  return (
    <div className="h-screen bg-white dark:bg-neutral-900 overflow-hidden">
      <Sidebar />
      <div className={`h-full flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-16'}`}>
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
