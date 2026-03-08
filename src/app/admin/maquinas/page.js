'use client';

import { useMemo, useRef, useState } from 'react';

const gerarId = () => Math.random().toString(36).slice(2, 10);
const s = (v) => (v ?? '').toString().trim();

const maquinasFake = [
  { _id: 'maq001', nome: 'Laser Trumpf 01', codigo: 'LAS-01', processoPadrao: 'Corte Laser', larguraMax: 3000, comprimentoMax: 1500, status: 'Ativo' },
  { _id: 'maq002', nome: 'Dobradeira 400T', codigo: 'DOB-01', processoPadrao: 'Dobra', larguraMax: 4000, comprimentoMax: 800, status: 'Ativo' },
  { _id: 'maq003', nome: 'Centro de Usinagem 02', codigo: 'USI-02', processoPadrao: 'Usinagem', larguraMax: 1200, comprimentoMax: 800, status: 'Ativo' },
];

export default function MaquinasProducaoPage() {
  const [maquinas, setMaquinas] = useState(maquinasFake);
  const [filtros, setFiltros] = useState({ nome: '', codigo: '', processoPadrao: '', status: '' });
  const [novaMaquina, setNovaMaquina] = useState({ nome: '', codigo: '', processoPadrao: '', larguraMax: '', comprimentoMax: '', status: 'Ativo' });
  const [editMaquina, setEditMaquina] = useState({ id: '', nome: '', codigo: '', processoPadrao: '', larguraMax: '', comprimentoMax: '', status: 'Ativo' });

  const modalCadastroRef = useRef();
  const modalEdicaoRef = useRef();

  const fecharModal = (ref) => {
    const modal = window.bootstrap.Modal.getInstance(ref.current);
    if (modal) modal.hide();
  };

  const abrirModalCadastro = () => {
    setNovaMaquina({ nome: '', codigo: '', processoPadrao: '', larguraMax: '', comprimentoMax: '', status: 'Ativo' });
    new window.bootstrap.Modal(modalCadastroRef.current).show();
  };

  const abrirModalEdicao = (item) => {
    setEditMaquina({
      id: item._id,
      nome: item.nome,
      codigo: item.codigo,
      processoPadrao: item.processoPadrao,
      larguraMax: item.larguraMax,
      comprimentoMax: item.comprimentoMax,
      status: item.status,
    });
    new window.bootstrap.Modal(modalEdicaoRef.current).show();
  };

  const maquinasFiltradas = useMemo(() => {
    const toStr = (v) => (v ?? '').toString().toLowerCase();
    return maquinas.filter((m) =>
      toStr(m.nome).includes(toStr(filtros.nome)) &&
      toStr(m.codigo).includes(toStr(filtros.codigo)) &&
      toStr(m.processoPadrao).includes(toStr(filtros.processoPadrao)) &&
      toStr(m.status).includes(toStr(filtros.status))
    );
  }, [maquinas, filtros]);

  const cadastrarMaquina = () => {
    if (!s(novaMaquina.nome)) return alert('Informe o nome da máquina.');
    const item = {
      _id: gerarId(),
      nome: s(novaMaquina.nome),
      codigo: s(novaMaquina.codigo),
      processoPadrao: s(novaMaquina.processoPadrao),
      larguraMax: Number(novaMaquina.larguraMax || 0),
      comprimentoMax: Number(novaMaquina.comprimentoMax || 0),
      status: novaMaquina.status,
    };
    setMaquinas((prev) => [item, ...prev]);
    alert('Máquina fake cadastrada com sucesso!');
    fecharModal(modalCadastroRef);
  };

  const editarMaquina = () => {
    setMaquinas((prev) => prev.map((m) => m._id === editMaquina.id ? {
      ...m,
      nome: s(editMaquina.nome),
      codigo: s(editMaquina.codigo),
      processoPadrao: s(editMaquina.processoPadrao),
      larguraMax: Number(editMaquina.larguraMax || 0),
      comprimentoMax: Number(editMaquina.comprimentoMax || 0),
      status: editMaquina.status,
    } : m));
    alert('Máquina fake editada com sucesso!');
    fecharModal(modalEdicaoRef);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">🏭 Máquinas de Produção</h2>

      <div className="accordion mb-3" id="accordionFiltrosMaquinas">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltrosMaquinas">🔎 Filtros de Pesquisa</button>
          </h2>
          <div id="collapseFiltrosMaquinas" className="accordion-collapse collapse show"><div className="accordion-body">
            <div className="row g-3">
              {[
                { key: 'nome', placeholder: 'nome' },
                { key: 'codigo', placeholder: 'código' },
                { key: 'processoPadrao', placeholder: 'processo padrão' },
                { key: 'status', placeholder: 'status' },
              ].map(({ key, placeholder }) => (
                <div key={key} className="col-12 col-md-6 col-lg-3">
                  <input className="form-control" placeholder={placeholder} value={filtros[key]} onChange={(e) => setFiltros((p) => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
            </div>
          </div></div>
        </div>
      </div>

      <div className="mb-3"><button className="btn btn-primary" onClick={abrirModalCadastro}><i className="lni lni-plus me-1" /> Cadastrar Máquina</button></div>

      <div className="table-responsive" style={{ maxHeight: '600px', overflow: 'auto' }}>
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light"><tr>{['Ações', 'Nome', 'Código', 'Processo Padrão', 'Largura Máx.', 'Comprimento Máx.', 'Status'].map((h) => <th key={h} style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 2 }}>{h}</th>)}</tr></thead>
          <tbody>
            {maquinasFiltradas.length === 0 ? <tr><td colSpan={7} className="text-center text-muted py-4">Nenhuma máquina encontrada.</td></tr> : maquinasFiltradas.map((item) => (
              <tr key={item._id}>
                <td><button className="btn btn-outline-secondary btn-sm" onClick={() => abrirModalEdicao(item)}><i className="lni lni-pencil" /></button></td>
                <td>{item.nome}</td>
                <td>{item.codigo || '-'}</td>
                <td>{item.processoPadrao || '-'}</td>
                <td>{item.larguraMax} mm</td>
                <td>{item.comprimentoMax} mm</td>
                <td><span className={`badge ${item.status === 'Ativo' ? 'text-bg-success' : 'text-bg-secondary'}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalCadastroRef}><div className="modal-dialog modal-lg modal-dialog-centered"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">🆕 Cadastrar Máquina</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
        <div className="modal-body"><div className="row g-3">
          <div className="col-md-6"><label className="form-label">Nome</label><input className="form-control" value={novaMaquina.nome} onChange={(e) => setNovaMaquina((p) => ({ ...p, nome: e.target.value }))} /></div>
          <div className="col-md-6"><label className="form-label">Código</label><input className="form-control" value={novaMaquina.codigo} onChange={(e) => setNovaMaquina((p) => ({ ...p, codigo: e.target.value }))} /></div>
          <div className="col-md-6"><label className="form-label">Processo Padrão</label><input className="form-control" value={novaMaquina.processoPadrao} onChange={(e) => setNovaMaquina((p) => ({ ...p, processoPadrao: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Largura Máx. (mm)</label><input type="number" className="form-control" value={novaMaquina.larguraMax} onChange={(e) => setNovaMaquina((p) => ({ ...p, larguraMax: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Comprimento Máx. (mm)</label><input type="number" className="form-control" value={novaMaquina.comprimentoMax} onChange={(e) => setNovaMaquina((p) => ({ ...p, comprimentoMax: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={novaMaquina.status} onChange={(e) => setNovaMaquina((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalCadastroRef)}>Cancelar</button><button className="btn btn-success" onClick={cadastrarMaquina}><i className="lni lni-checkmark me-1" /> Cadastrar</button></div>
      </div></div></div>

      <div className="modal fade" tabIndex="-1" ref={modalEdicaoRef}><div className="modal-dialog modal-lg modal-dialog-centered"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">✏️ Editar Máquina</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
        <div className="modal-body"><div className="row g-3">
          <div className="col-md-4"><label className="form-label">ID</label><input className="form-control" readOnly value={editMaquina.id} /></div>
          <div className="col-md-4"><label className="form-label">Nome</label><input className="form-control" value={editMaquina.nome} onChange={(e) => setEditMaquina((p) => ({ ...p, nome: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Código</label><input className="form-control" value={editMaquina.codigo} onChange={(e) => setEditMaquina((p) => ({ ...p, codigo: e.target.value }))} /></div>
          <div className="col-md-6"><label className="form-label">Processo Padrão</label><input className="form-control" value={editMaquina.processoPadrao} onChange={(e) => setEditMaquina((p) => ({ ...p, processoPadrao: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Largura Máx. (mm)</label><input type="number" className="form-control" value={editMaquina.larguraMax} onChange={(e) => setEditMaquina((p) => ({ ...p, larguraMax: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Comprimento Máx. (mm)</label><input type="number" className="form-control" value={editMaquina.comprimentoMax} onChange={(e) => setEditMaquina((p) => ({ ...p, comprimentoMax: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={editMaquina.status} onChange={(e) => setEditMaquina((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalEdicaoRef)}>Cancelar</button><button className="btn btn-primary" onClick={editarMaquina}><i className="lni lni-checkmark me-1" /> Salvar Alterações</button></div>
      </div></div></div>
    </div>
  );
}
