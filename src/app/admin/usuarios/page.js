'use client';

import { useMemo, useRef, useState } from 'react';

const gerarId = () => Math.random().toString(36).slice(2, 10);
const s = (v) => (v ?? '').toString().trim();

const usuariosFake = [
  {
    _id: 'usr001',
    nome: 'Caio Basdao',
    email: 'caio@empresa.com.br',
    contato: '(43) 99999-0001',
    tipo: 0,
    status: 'Ativo',
  },
  {
    _id: 'usr002',
    nome: 'Mariana Souza',
    email: 'mariana@empresa.com.br',
    contato: '(43) 99999-0002',
    tipo: 1,
    status: 'Ativo',
  },
  {
    _id: 'usr003',
    nome: 'Wesley Costa',
    email: 'wesley@empresa.com.br',
    contato: '(43) 99999-0003',
    tipo: 2,
    status: 'Inativo',
  },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(usuariosFake);
  const [filtros, setFiltros] = useState({ nome: '', email: '', contato: '', tipo: '' });

  const [novoUsuario, setNovoUsuario] = useState({
    nomeNovoUsuario: '',
    emailNovoUsuario: '',
    contatoNovoUsuario: '',
    senhaNovoUsuario: '',
    repeteSenhaNovoUsuario: '',
    tipoNovoUsuario: 0,
  });

  const [editUsuario, setEditUsuario] = useState({
    idUsuario: '',
    nome: '',
    email: '',
    contato: '',
    tipo: 0,
    status: 'Ativo',
  });

  const [trocaSenha, setTrocaSenha] = useState({
    emailUsuario: '',
    senhaAntigaUsuario: '',
    novaSenhaUsuario: '',
    repeteNovaSenhaUsuario: '',
  });

  const modalCadastroRef = useRef();
  const modalEdicaoRef = useRef();
  const modalTrocarSenhaRef = useRef();

  const abrirModalCadastro = () => {
    setNovoUsuario({
      nomeNovoUsuario: '',
      emailNovoUsuario: '',
      contatoNovoUsuario: '',
      senhaNovoUsuario: '',
      repeteSenhaNovoUsuario: '',
      tipoNovoUsuario: 0,
    });
    new window.bootstrap.Modal(modalCadastroRef.current).show();
  };

  const abrirModalEdicao = (u) => {
    setEditUsuario({
      idUsuario: u._id,
      nome: u.nome,
      email: u.email,
      contato: u.contato,
      tipo: u.tipo,
      status: u.status,
    });
    new window.bootstrap.Modal(modalEdicaoRef.current).show();
  };

  const abrirModalTrocarSenha = () => {
    setTrocaSenha({
      emailUsuario: '',
      senhaAntigaUsuario: '',
      novaSenhaUsuario: '',
      repeteNovaSenhaUsuario: '',
    });
    new window.bootstrap.Modal(modalTrocarSenhaRef.current).show();
  };

  const fecharModal = (ref) => {
    const modal = window.bootstrap.Modal.getInstance(ref.current);
    if (modal) modal.hide();
  };

  const usuariosFiltrados = useMemo(() => {
    const toStr = (v) => (v ?? '').toString().toLowerCase();
    return usuarios.filter((u) => {
      const matchNome = toStr(u.nome).includes(toStr(filtros.nome));
      const matchEmail = toStr(u.email).includes(toStr(filtros.email));
      const matchContato = toStr(u.contato).includes(toStr(filtros.contato));
      const matchTipo = filtros.tipo === '' ? true : toStr(u.tipo).includes(toStr(filtros.tipo));
      return matchNome && matchEmail && matchContato && matchTipo;
    });
  }, [usuarios, filtros]);

  const cadastrarUsuario = () => {
    if (!s(novoUsuario.nomeNovoUsuario)) return alert('Informe o nome.');
    if (!s(novoUsuario.emailNovoUsuario)) return alert('Informe o email.');
    if (novoUsuario.senhaNovoUsuario !== novoUsuario.repeteSenhaNovoUsuario) {
      return alert('As senhas não coincidem.');
    }

    const novo = {
      _id: gerarId(),
      nome: s(novoUsuario.nomeNovoUsuario),
      email: s(novoUsuario.emailNovoUsuario),
      contato: s(novoUsuario.contatoNovoUsuario),
      tipo: Number(novoUsuario.tipoNovoUsuario),
      status: 'Ativo',
    };

    setUsuarios((prev) => [novo, ...prev]);
    alert('Usuário fake cadastrado com sucesso!');
    fecharModal(modalCadastroRef);
  };

  const editarUsuario = () => {
    if (!s(editUsuario.idUsuario)) return alert('Usuário inválido.');

    setUsuarios((prev) =>
      prev.map((u) =>
        u._id === editUsuario.idUsuario
          ? {
              ...u,
              nome: s(editUsuario.nome),
              email: s(editUsuario.email),
              contato: s(editUsuario.contato),
              tipo: Number(editUsuario.tipo),
              status: editUsuario.status,
            }
          : u
      )
    );

    alert('Usuário fake editado com sucesso!');
    fecharModal(modalEdicaoRef);
  };

  const trocarSenhaUsuario = () => {
    if (!s(trocaSenha.emailUsuario)) return alert('Informe o email.');
    if (!s(trocaSenha.novaSenhaUsuario)) return alert('Informe a nova senha.');
    if (trocaSenha.novaSenhaUsuario !== trocaSenha.repeteNovaSenhaUsuario) {
      return alert('As novas senhas não coincidem.');
    }

    alert(`Senha fake alterada para ${trocaSenha.emailUsuario}.`);
    fecharModal(modalTrocarSenhaRef);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">👤 Usuários</h2>

      <div className="accordion mb-3" id="accordionFiltrosUsuarios">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFiltrosUsuarios"
            >
              🔎 Filtros de Pesquisa
            </button>
          </h2>
          <div id="collapseFiltrosUsuarios" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <div className="row g-3">
                {[
                  { key: 'nome', placeholder: 'nome', type: 'text' },
                  { key: 'email', placeholder: 'email', type: 'text' },
                  { key: 'contato', placeholder: 'contato', type: 'text' },
                  { key: 'tipo', placeholder: 'tipo (0/1/2/3/4)', type: 'number' },
                ].map(({ key, placeholder, type }) => (
                  <div key={key} className="col-12 col-md-6 col-lg-3">
                    <input
                      type={type}
                      className="form-control"
                      placeholder={placeholder}
                      value={filtros[key]}
                      onChange={(e) => setFiltros((prev) => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 d-flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={abrirModalCadastro}>
          <i className="lni lni-plus me-1" /> Cadastrar Usuário
        </button>
        <button className="btn btn-warning" onClick={abrirModalTrocarSenha}>
          <i className="lni lni-lock me-1" /> Trocar Senha
        </button>
      </div>

      <div className="table-responsive" style={{ maxHeight: '600px', overflow: 'auto' }}>
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light">
            <tr>
              {['Ações', 'Nome', 'Email', 'Contato', 'Tipo', 'Status'].map((header) => (
                <th key={header} style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 2 }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((u) => (
                <tr key={u._id}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => abrirModalEdicao(u)}>
                      <i className="lni lni-pencil" />
                    </button>
                  </td>
                  <td>{u.nome}</td>
                  <td>{u.email}</td>
                  <td>{u.contato || '-'}</td>
                  <td>{u.tipo}</td>
                  <td>
                    <span className={`badge ${u.status === 'Ativo' ? 'text-bg-success' : 'text-bg-secondary'}`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalCadastroRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">🆕 Cadastrar Usuário</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nome</label>
                  <input className="form-control" value={novoUsuario.nomeNovoUsuario} onChange={(e) => setNovoUsuario((p) => ({ ...p, nomeNovoUsuario: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={novoUsuario.emailNovoUsuario} onChange={(e) => setNovoUsuario((p) => ({ ...p, emailNovoUsuario: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contato</label>
                  <input className="form-control" value={novoUsuario.contatoNovoUsuario} onChange={(e) => setNovoUsuario((p) => ({ ...p, contatoNovoUsuario: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tipo</label>
                  <select className="form-select" value={novoUsuario.tipoNovoUsuario} onChange={(e) => setNovoUsuario((p) => ({ ...p, tipoNovoUsuario: Number(e.target.value) }))}>
                    {[0, 1, 2, 3, 4].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Senha</label>
                  <input type="password" className="form-control" value={novoUsuario.senhaNovoUsuario} onChange={(e) => setNovoUsuario((p) => ({ ...p, senhaNovoUsuario: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Repita a Senha</label>
                  <input type="password" className="form-control" value={novoUsuario.repeteSenhaNovoUsuario} onChange={(e) => setNovoUsuario((p) => ({ ...p, repeteSenhaNovoUsuario: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalCadastroRef)}>Cancelar</button>
              <button className="btn btn-success" onClick={cadastrarUsuario}><i className="lni lni-checkmark me-1" /> Cadastrar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalEdicaoRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">✏️ Editar Usuário</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">ID</label>
                  <input className="form-control" value={editUsuario.idUsuario} readOnly />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Tipo</label>
                  <select className="form-select" value={editUsuario.tipo} onChange={(e) => setEditUsuario((p) => ({ ...p, tipo: Number(e.target.value) }))}>
                    {[0, 1, 2, 3, 4].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={editUsuario.status} onChange={(e) => setEditUsuario((p) => ({ ...p, status: e.target.value }))}>
                    {['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nome</label>
                  <input className="form-control" value={editUsuario.nome} onChange={(e) => setEditUsuario((p) => ({ ...p, nome: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={editUsuario.email} onChange={(e) => setEditUsuario((p) => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contato</label>
                  <input className="form-control" value={editUsuario.contato} onChange={(e) => setEditUsuario((p) => ({ ...p, contato: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalEdicaoRef)}>Cancelar</button>
              <button className="btn btn-primary" onClick={editarUsuario}><i className="lni lni-checkmark me-1" /> Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalTrocarSenhaRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">🔒 Trocar Senha</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Email do Usuário</label>
                  <input className="form-control" value={trocaSenha.emailUsuario} onChange={(e) => setTrocaSenha((p) => ({ ...p, emailUsuario: e.target.value }))} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Senha Antiga</label>
                  <input type="password" className="form-control" value={trocaSenha.senhaAntigaUsuario} onChange={(e) => setTrocaSenha((p) => ({ ...p, senhaAntigaUsuario: e.target.value }))} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Nova Senha</label>
                  <input type="password" className="form-control" value={trocaSenha.novaSenhaUsuario} onChange={(e) => setTrocaSenha((p) => ({ ...p, novaSenhaUsuario: e.target.value }))} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Repita a Nova Senha</label>
                  <input type="password" className="form-control" value={trocaSenha.repeteNovaSenhaUsuario} onChange={(e) => setTrocaSenha((p) => ({ ...p, repeteNovaSenhaUsuario: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalTrocarSenhaRef)}>Cancelar</button>
              <button className="btn btn-warning" onClick={trocarSenhaUsuario}><i className="lni lni-checkmark me-1" /> Alterar Senha</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
