'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    const nome = localStorage.getItem('MF_USER_NOME');
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Erro ao ativar fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleLogoff = () => {
    localStorage.removeItem('MF_USER_TOKEN');
    localStorage.removeItem('MF_USER_NOME');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid">
        <button id="toggleSidebar" className="btn btn-sm btn-outline-primary me-2">
          <i className="lni lni-menu"></i>
        </button>

        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="lni lni-grid-alt me-2"></i>
          Portal de Roteirização Inteligente
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <i className="lni lni-cog"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto d-flex align-items-center flex-column flex-lg-row mt-3 mt-lg-0 gap-2">
            <span className="me-3">{nomeUsuario || 'Usuário'}</span>

            <button
              onClick={handleLogoff}
              className="btn btn-outline-danger btn-sm me-2"
            >
              <i className="lni lni-exit me-1"></i>
              Logoff
            </button>

            <button id="toggleTheme" className="btn btn-sm btn-outline-secondary">
              <i className="lni lni-sun"></i>
            </button>

            <button
              onClick={toggleFullscreen}
              className="btn btn-sm btn-outline-dark"
              title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              <i className={`lni ${isFullscreen ? 'lni-close' : 'lni-full-screen'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}