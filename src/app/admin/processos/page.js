'use client';

import { useMemo, useRef, useState } from 'react';

const gerarId = () => Math.random().toString(36).slice(2, 10);
const s = (v) => (v ?? '').toString().trim();

const processosFake = [
  { _id: 'proc001', nome: 'Corte Laser', codigo: 'P001', setor: 'Corte', unidadeTempo: 'min', tempoSetup: 8, status: 'Ativo' },
  { _id: 'proc002', nome: 'Dobra', codigo: 'P002', setor: 'Conformação', unidadeTempo: 'min', tempoSetup: 5, status: 'Ativo' },
  { _id: 'proc003', nome: 'Solda MIG', codigo: 'P003', setor: 'Solda', unidadeTempo: 'min', tempoSetup: 10, status: 'Ativo' },
];

export default function ProcessosFabricacaoPage() {
  const [processos, setProcessos] = useState(processosFake);
  const [filtros, setFiltros] = useState({ nome: '', codigo: '', setor: '', status: '' });
  const [novoProcesso, setNovoProcesso] = useState({ nome: '', codigo: '', setor: '', unidadeTempo: 'min', tempoSetup: '', status: 'Ativo' });
  const [editProcesso, setEditProcesso] = useState({ id: '', nome: '', codigo: '', setor: '', unidadeTempo: 'min', tempoSetup: '', status: 'Ativo' });

  const modalCadastroRef = useRef();
  const modalEdicaoRef = useRef();

  const fecharModal = (ref) => {
    const modal = window.bootstrap.Modal.getInstance(ref.current);
    if (modal) modal.hide();
  };

  const abrirModalCadastro = () => {
    setNovoProcesso({ nome: '', codigo: '', setor: '', unidadeTempo: 'min', tempoSetup: '', status: 'Ativo' });
    new window.bootstrap.Modal(modalCadastroRef.current).show();
  };

  const abrirModalEdicao = (item) => {
    setEditProcesso({
      id: item._id,
      nome: item.nome,
      codigo: item.codigo,
      setor: item.setor,
      unidadeTempo: item.unidadeTempo,
      tempoSetup: item.tempoSetup,
      status: item.status,
    });
    new window.bootstrap.Modal(modalEdicaoRef.current).show();
  };

  const processosFiltrados = useMemo(() => {
    const toStr = (v) => (v ?? '').toString().toLowerCase();
    return processos.filter((p) =>
      toStr(p.nome).includes(toStr(filtros.nome)) &&
      toStr(p.codigo).includes(toStr(filtros.codigo)) &&
      toStr(p.setor).includes(toStr(filtros.setor)) &&
      toStr(p.status).includes(toStr(filtros.status))
    );
  }, [processos, filtros]);

  const cadastrarProcesso = () => {
    if (!s(novoProcesso.nome)) return alert('Informe o nome do processo.');
    const item = {
      _id: gerarId(),
      nome: s(novoProcesso.nome),
      codigo: s(novoProcesso.codigo),
      setor: s(novoProcesso.setor),
      unidadeTempo: novoProcesso.unidadeTempo,
      tempoSetup: Number(novoProcesso.tempoSetup || 0),
      status: novoProcesso.status,
    };
    setProcessos((prev) => [item, ...prev]);
    alert('Processo fake cadastrado com sucesso!');
    fecharModal(modalCadastroRef);
  };

  const editarProcesso = () => {
    setProcessos((prev) => prev.map((p) => p._id === editProcesso.id ? {
      ...p,
      nome: s(editProcesso.nome),
      codigo: s(editProcesso.codigo),
      setor: s(editProcesso.setor),
      unidadeTempo: editProcesso.unidadeTempo,
      tempoSetup: Number(editProcesso.tempoSetup || 0),
      status: editProcesso.status,
    } : p));
    alert('Processo fake editado com sucesso!');
    fecharModal(modalEdicaoRef);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">⚙️ Processos de Fabricação</h2>

      <div className="accordion mb-3" id="accordionFiltrosProcessos"><div className="accordion-item">
        <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltrosProcessos">🔎 Filtros de Pesquisa</button></h2>
        <div id="collapseFiltrosProcessos" className="accordion-collapse collapse show"><div className="accordion-body"><div className="row g-3">
          {[
            { key: 'nome', placeholder: 'nome' },
            { key: 'codigo', placeholder: 'código' },
            { key: 'setor', placeholder: 'setor' },
            { key: 'status', placeholder: 'status' },
          ].map(({ key, placeholder }) => (
            <div key={key} className="col-12 col-md-6 col-lg-3"><input className="form-control" placeholder={placeholder} value={filtros[key]} onChange={(e) => setFiltros((p) => ({ ...p, [key]: e.target.value }))} /></div>
          ))}
        </div></div></div>
      </div></div>

      <div className="mb-3"><button className="btn btn-primary" onClick={abrirModalCadastro}><i className="lni lni-plus me-1" /> Cadastrar Processo</button></div>

      <div className="table-responsive" style={{ maxHeight: '600px', overflow: 'auto' }}>
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light"><tr>{['Ações', 'Nome', 'Código', 'Setor', 'Unidade de Tempo', 'Tempo Setup', 'Status'].map((h) => <th key={h} style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 2 }}>{h}</th>)}</tr></thead>
          <tbody>
            {processosFiltrados.length === 0 ? <tr><td colSpan={7} className="text-center text-muted py-4">Nenhum processo encontrado.</td></tr> : processosFiltrados.map((item) => (
              <tr key={item._id}>
                <td><button className="btn btn-outline-secondary btn-sm" onClick={() => abrirModalEdicao(item)}><i className="lni lni-pencil" /></button></td>
                <td>{item.nome}</td>
                <td>{item.codigo || '-'}</td>
                <td>{item.setor || '-'}</td>
                <td>{item.unidadeTempo}</td>
                <td>{item.tempoSetup} {item.unidadeTempo}</td>
                <td><span className={`badge ${item.status === 'Ativo' ? 'text-bg-success' : 'text-bg-secondary'}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalCadastroRef}><div className="modal-dialog modal-lg modal-dialog-centered"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">🆕 Cadastrar Processo</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
        <div className="modal-body"><div className="row g-3">
          <div className="col-md-6"><label className="form-label">Nome</label><input className="form-control" value={novoProcesso.nome} onChange={(e) => setNovoProcesso((p) => ({ ...p, nome: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Código</label><input className="form-control" value={novoProcesso.codigo} onChange={(e) => setNovoProcesso((p) => ({ ...p, codigo: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Setor</label><input className="form-control" value={novoProcesso.setor} onChange={(e) => setNovoProcesso((p) => ({ ...p, setor: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Unidade de Tempo</label><select className="form-select" value={novoProcesso.unidadeTempo} onChange={(e) => setNovoProcesso((p) => ({ ...p, unidadeTempo: e.target.value }))}>{['min', 'hora'].map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
          <div className="col-md-4"><label className="form-label">Tempo de Setup</label><input type="number" className="form-control" value={novoProcesso.tempoSetup} onChange={(e) => setNovoProcesso((p) => ({ ...p, tempoSetup: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={novoProcesso.status} onChange={(e) => setNovoProcesso((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalCadastroRef)}>Cancelar</button><button className="btn btn-success" onClick={cadastrarProcesso}><i className="lni lni-checkmark me-1" /> Cadastrar</button></div>
      </div></div></div>

      <div className="modal fade" tabIndex="-1" ref={modalEdicaoRef}><div className="modal-dialog modal-lg modal-dialog-centered"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">✏️ Editar Processo</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
        <div className="modal-body"><div className="row g-3">
          <div className="col-md-4"><label className="form-label">ID</label><input className="form-control" readOnly value={editProcesso.id} /></div>
          <div className="col-md-4"><label className="form-label">Nome</label><input className="form-control" value={editProcesso.nome} onChange={(e) => setEditProcesso((p) => ({ ...p, nome: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Código</label><input className="form-control" value={editProcesso.codigo} onChange={(e) => setEditProcesso((p) => ({ ...p, codigo: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Setor</label><input className="form-control" value={editProcesso.setor} onChange={(e) => setEditProcesso((p) => ({ ...p, setor: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Unidade de Tempo</label><select className="form-select" value={editProcesso.unidadeTempo} onChange={(e) => setEditProcesso((p) => ({ ...p, unidadeTempo: e.target.value }))}>{['min', 'hora'].map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
          <div className="col-md-4"><label className="form-label">Tempo de Setup</label><input type="number" className="form-control" value={editProcesso.tempoSetup} onChange={(e) => setEditProcesso((p) => ({ ...p, tempoSetup: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={editProcesso.status} onChange={(e) => setEditProcesso((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalEdicaoRef)}>Cancelar</button><button className="btn btn-primary" onClick={editarProcesso}><i className="lni lni-checkmark me-1" /> Salvar Alterações</button></div>
      </div></div></div>
    </div>
  );
}
