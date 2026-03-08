'use client';

import { useMemo, useRef, useState } from 'react';

const gerarId = () => Math.random().toString(36).slice(2, 10);
const s = (v) => (v ?? '').toString().trim();

const familiasFake = [
  { _id: 'fam001', nome: 'Chapas Dobradas', descricao: 'Peças com corte e dobra', codigoInterno: 'CHD', status: 'Ativo' },
  { _id: 'fam002', nome: 'Eixos Usinados', descricao: 'Peças torneadas e usinadas', codigoInterno: 'EIX', status: 'Ativo' },
  { _id: 'fam003', nome: 'Conjuntos Soldados', descricao: 'Montagens com solda e inspeção', codigoInterno: 'CSO', status: 'Ativo' },
];

export default function FamiliasPecasPage() {
  const [familias, setFamilias] = useState(familiasFake);
  const [filtros, setFiltros] = useState({ nome: '', descricao: '', codigoInterno: '', status: '' });
  const [novaFamilia, setNovaFamilia] = useState({ nome: '', descricao: '', codigoInterno: '', status: 'Ativo' });
  const [editFamilia, setEditFamilia] = useState({ id: '', nome: '', descricao: '', codigoInterno: '', status: 'Ativo' });

  const modalCadastroRef = useRef();
  const modalEdicaoRef = useRef();

  const abrirModalCadastro = () => {
    setNovaFamilia({ nome: '', descricao: '', codigoInterno: '', status: 'Ativo' });
    new window.bootstrap.Modal(modalCadastroRef.current).show();
  };

  const abrirModalEdicao = (item) => {
    setEditFamilia({
      id: item._id,
      nome: item.nome,
      descricao: item.descricao,
      codigoInterno: item.codigoInterno,
      status: item.status,
    });
    new window.bootstrap.Modal(modalEdicaoRef.current).show();
  };

  const fecharModal = (ref) => {
    const modal = window.bootstrap.Modal.getInstance(ref.current);
    if (modal) modal.hide();
  };

  const familiasFiltradas = useMemo(() => {
    const toStr = (v) => (v ?? '').toString().toLowerCase();
    return familias.filter((f) => {
      return (
        toStr(f.nome).includes(toStr(filtros.nome)) &&
        toStr(f.descricao).includes(toStr(filtros.descricao)) &&
        toStr(f.codigoInterno).includes(toStr(filtros.codigoInterno)) &&
        toStr(f.status).includes(toStr(filtros.status))
      );
    });
  }, [familias, filtros]);

  const cadastrarFamilia = () => {
    if (!s(novaFamilia.nome)) return alert('Informe o nome da família.');

    const item = { _id: gerarId(), ...novaFamilia };
    setFamilias((prev) => [item, ...prev]);
    alert('Família fake cadastrada com sucesso!');
    fecharModal(modalCadastroRef);
  };

  const editarFamilia = () => {
    if (!s(editFamilia.id)) return alert('Família inválida.');

    setFamilias((prev) => prev.map((f) => (f._id === editFamilia.id ? {
      ...f,
      nome: s(editFamilia.nome),
      descricao: s(editFamilia.descricao),
      codigoInterno: s(editFamilia.codigoInterno),
      status: editFamilia.status,
    } : f)));

    alert('Família fake editada com sucesso!');
    fecharModal(modalEdicaoRef);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">🧩 Famílias de Peças</h2>

      <div className="accordion mb-3" id="accordionFiltrosFamilias">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltrosFamilias">
              🔎 Filtros de Pesquisa
            </button>
          </h2>
          <div id="collapseFiltrosFamilias" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <div className="row g-3">
                {[
                  { key: 'nome', placeholder: 'nome' },
                  { key: 'descricao', placeholder: 'descrição' },
                  { key: 'codigoInterno', placeholder: 'código interno' },
                  { key: 'status', placeholder: 'status' },
                ].map(({ key, placeholder }) => (
                  <div key={key} className="col-12 col-md-6 col-lg-3">
                    <input className="form-control" placeholder={placeholder} value={filtros[key]} onChange={(e) => setFiltros((p) => ({ ...p, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-primary" onClick={abrirModalCadastro}>
          <i className="lni lni-plus me-1" /> Cadastrar Família
        </button>
      </div>

      <div className="table-responsive" style={{ maxHeight: '600px', overflow: 'auto' }}>
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light">
            <tr>
              {['Ações', 'Nome', 'Descrição', 'Código Interno', 'Status'].map((header) => (
                <th key={header} style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 2 }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {familiasFiltradas.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-muted py-4">Nenhuma família encontrada.</td></tr>
            ) : familiasFiltradas.map((item) => (
              <tr key={item._id}>
                <td>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => abrirModalEdicao(item)}>
                    <i className="lni lni-pencil" />
                  </button>
                </td>
                <td>{item.nome}</td>
                <td>{item.descricao || '-'}</td>
                <td>{item.codigoInterno || '-'}</td>
                <td><span className={`badge ${item.status === 'Ativo' ? 'text-bg-success' : 'text-bg-secondary'}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalCadastroRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">🆕 Cadastrar Família</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
          <div className="modal-body"><div className="row g-3">
            <div className="col-md-6"><label className="form-label">Nome</label><input className="form-control" value={novaFamilia.nome} onChange={(e) => setNovaFamilia((p) => ({ ...p, nome: e.target.value }))} /></div>
            <div className="col-md-6"><label className="form-label">Código Interno</label><input className="form-control" value={novaFamilia.codigoInterno} onChange={(e) => setNovaFamilia((p) => ({ ...p, codigoInterno: e.target.value }))} /></div>
            <div className="col-12"><label className="form-label">Descrição</label><textarea className="form-control" rows="3" value={novaFamilia.descricao} onChange={(e) => setNovaFamilia((p) => ({ ...p, descricao: e.target.value }))} /></div>
            <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={novaFamilia.status} onChange={(e) => setNovaFamilia((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
          </div></div>
          <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalCadastroRef)}>Cancelar</button><button className="btn btn-success" onClick={cadastrarFamilia}><i className="lni lni-checkmark me-1" /> Cadastrar</button></div>
        </div></div>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalEdicaoRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">✏️ Editar Família</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
          <div className="modal-body"><div className="row g-3">
            <div className="col-md-4"><label className="form-label">ID</label><input className="form-control" readOnly value={editFamilia.id} /></div>
            <div className="col-md-4"><label className="form-label">Nome</label><input className="form-control" value={editFamilia.nome} onChange={(e) => setEditFamilia((p) => ({ ...p, nome: e.target.value }))} /></div>
            <div className="col-md-4"><label className="form-label">Código Interno</label><input className="form-control" value={editFamilia.codigoInterno} onChange={(e) => setEditFamilia((p) => ({ ...p, codigoInterno: e.target.value }))} /></div>
            <div className="col-12"><label className="form-label">Descrição</label><textarea className="form-control" rows="3" value={editFamilia.descricao} onChange={(e) => setEditFamilia((p) => ({ ...p, descricao: e.target.value }))} /></div>
            <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={editFamilia.status} onChange={(e) => setEditFamilia((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
          </div></div>
          <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalEdicaoRef)}>Cancelar</button><button className="btn btn-primary" onClick={editarFamilia}><i className="lni lni-checkmark me-1" /> Salvar Alterações</button></div>
        </div></div>
      </div>
    </div>
  );
}
