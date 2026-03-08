'use client';

import { useEffect } from 'react';
import './styles/style.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { PrivateRoute } from './components/privateRoute/index';

export default function AdminLayout({ children }) {
  useEffect(() => {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const body = document.body;
    const html = document.documentElement;

    window.toggleSubmenu = function (menuId) {
      const menu = document.getElementById(menuId);
      if (menu) menu.classList.toggle('show');
    };

    const handleSidebarToggle = () => {
      if (window.innerWidth <= 991.98) {
        sidebar.classList.toggle('show-mobile');
      } else {
        sidebar.classList.toggle('hidden-desktop');
      }
    };

    const handleThemeToggle = () => {
      const isDark = body.classList.contains('dark-theme');

      if (isDark) {
        body.classList.remove('dark-theme');
        html.classList.remove('dark-theme');
      } else {
        body.classList.add('dark-theme');
        html.classList.add('dark-theme');
      }

      const icon = toggleThemeBtn.querySelector('i');
      if (body.classList.contains('dark-theme')) {
        icon.classList.remove('lni-sun');
        icon.classList.add('lni-night');
      } else {
        icon.classList.remove('lni-night');
        icon.classList.add('lni-sun');
      }
    };

    if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', handleSidebarToggle);
    if (toggleThemeBtn) toggleThemeBtn.addEventListener('click', handleThemeToggle);

    return () => {
      if (toggleSidebarBtn) toggleSidebarBtn.removeEventListener('click', handleSidebarToggle);
      if (toggleThemeBtn) toggleThemeBtn.removeEventListener('click', handleThemeToggle);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <main className="content">
          <PrivateRoute>
            {children}
          </PrivateRoute>
        </main>
      </div>
      <Footer />
    </>
  );
}
