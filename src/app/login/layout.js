'use client';

import './styles/style.css';
import { useEffect, useState } from 'react';

export default function LoginLayout({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    // Sempre limpa o dark quando entra no /login
    body.classList.add('login-page');
    body.classList.remove('dark-theme');
    html.classList.remove('dark-theme');

    setIsReady(true);

    return () => {
      body.classList.remove('login-page');
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const body = document.body;
    const html = document.documentElement;
    const toggleThemeBtn = document.getElementById('toggleTheme');

    const handleToggle = () => {
      const isDark = body.classList.contains('dark-theme');
      if (isDark) {
        body.classList.remove('dark-theme');
        html.classList.remove('dark-theme');
      } else {
        body.classList.add('dark-theme');
        html.classList.add('dark-theme');
      }

      const icon = toggleThemeBtn?.querySelector('i');
      if (icon) {
        if (body.classList.contains('dark-theme')) {
          icon.classList.remove('lni-sun');
          icon.classList.add('lni-night');
        } else {
          icon.classList.remove('lni-night');
          icon.classList.add('lni-sun');
        }
      }
    };

    if (toggleThemeBtn) {
      toggleThemeBtn.addEventListener('click', handleToggle);
    }

    return () => {
      if (toggleThemeBtn) {
        toggleThemeBtn.removeEventListener('click', handleToggle);
      }
    };
  }, [isReady]);

  if (!isReady) return null;

  return (
    <>
      {children}
    </>
  );
}
