'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.toggleSubmenu) {
      window.toggleSubmenu = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.toggle('show');
      };
    }
  }, []);

  return (
    <aside id="sidebar" className="sidebar">
      {/* Famílias */}
      <h5
        className="menu-title"
        onClick={() => window.toggleSubmenu('familiaMenu')}
        role="button"
        aria-controls="familiaMenu"
        aria-expanded="false"
      >
        <i className="lni lni-layers me-2"></i> Famílias
      </h5>
      <ul id="familiaMenu" className="collapse-menu">
        <li className="submenu">
          <Link href="/admin/familias">
            <i className="lni lni-eye me-2"></i> Visualizar
          </Link>
        </li>
      </ul>

      {/* Máquinas */}
      <h5
        className="menu-title"
        onClick={() => window.toggleSubmenu('maquinaMenu')}
        role="button"
        aria-controls="maquinaMenu"
        aria-expanded="false"
      >
        <i className="lni lni-cog me-2"></i> Máquinas
      </h5>
      <ul id="maquinaMenu" className="collapse-menu">
        <li className="submenu">
          <Link href="/admin/maquinas">
            <i className="lni lni-eye me-2"></i> Visualizar
          </Link>
        </li>
      </ul>

      {/* Processos */}
      <h5
        className="menu-title"
        onClick={() => window.toggleSubmenu('processoMenu')}
        role="button"
        aria-controls="processoMenu"
        aria-expanded="false"
      >
        <i className="lni lni-network me-2"></i> Processos
      </h5>
      <ul id="processoMenu" className="collapse-menu">
        <li className="submenu">
          <Link href="/admin/processos">
            <i className="lni lni-eye me-2"></i> Visualizar
          </Link>
        </li>
      </ul>

      {/* Regras de roteirização */}
      <h5
        className="menu-title"
        onClick={() => window.toggleSubmenu('regrasRoteirizacaoMenu')}
        role="button"
        aria-controls="regrasRoteirizacaoMenu"
        aria-expanded="false"
      >
        <i className="lni lni-direction me-2"></i> Roteirização
      </h5>
      <ul id="regrasRoteirizacaoMenu" className="collapse-menu">
        <li className="submenu">
          <Link href="/admin/regrasRoteirizacao">
            <i className="lni lni-eye me-2"></i> Visualizar
          </Link>
        </li>
      </ul>

      {/* Arquivos para processar */}
      <h5
        className="menu-title"
        onClick={() => window.toggleSubmenu('arquivosProcessarMenu')}
        role="button"
        aria-controls="arquivosProcessarMenu"
        aria-expanded="false"
      >
        <i className="lni lni-files me-2"></i> Para Processar
      </h5>
      <ul id="arquivosProcessarMenu" className="collapse-menu">
        <li className="submenu">
          <Link href="/admin/arquivosProcessar">
            <i className="lni lni-eye me-2"></i> Visualizar
          </Link>
        </li>
      </ul>

      {/* Roteiros */}
      <h5
        className="menu-title"
        onClick={() => window.toggleSubmenu('roteirosMenu')}
        role="button"
        aria-controls="roteirosMenu"
        aria-expanded="false"
      >
        <i className="lni lni-clipboard me-2"></i> Roteiros
      </h5>
      <ul id="roteirosMenu" className="collapse-menu">
        <li className="submenu">
          <Link href="/admin/roteiros">
            <i className="lni lni-eye me-2"></i> Visualizar
          </Link>
        </li>
      </ul>

      {/* Usuários */}
      <h5
        className="menu-title"
        onClick={() => window.toggleSubmenu('usuarioMenu')}
        role="button"
        aria-controls="usuarioMenu"
        aria-expanded="false"
      >
        <i className="lni lni-users me-2"></i> Usuários
      </h5>
      <ul id="usuarioMenu" className="collapse-menu">
        <li className="submenu">
          <Link href="/admin/usuarios">
            <i className="lni lni-eye me-2"></i> Visualizar
          </Link>
        </li>
      </ul>
    </aside>
  );
}