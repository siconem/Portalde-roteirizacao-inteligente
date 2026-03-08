'use client';

import { useMemo, useRef, useState } from 'react';

const gerarId = () => Math.random().toString(36).slice(2, 10);
const s = (v) => (v ?? '').toString().trim();

const regrasFake = [
  {
    _id: 'reg001',
    familia: 'Chapas Dobradas',
    processo: 'Corte Laser',
    maquinaPreferencial: 'Laser Trumpf 01',
    ordem: 10,
    formulaTempo: 'perimetro_mm / 800',
    condicao: 'Se possuir contorno externo e espessura <= 12mm',
    status: 'Ativo',
  },
  {
    _id: 'reg002',
    familia: 'Chapas Dobradas',
    processo: 'Dobra',
    maquinaPreferencial: 'Dobradeira 400T',
    ordem: 20,
    formulaTempo: 'qtd_dobras * 1.5',
    condicao: 'Se detectar linhas de dobra',
    status: 'Ativo',
  },
  {
    _id: 'reg003',
    familia: 'Conjuntos Soldados',
    processo: 'Solda MIG',
    maquinaPreferencial: 'Célula de Solda 01',
    ordem: 30,
    formulaTempo: 'comprimento_solda_mm / 120',
    condicao: 'Se houver indicação de solda',
    status: 'Ativo',
  },
];

export default function RegrasRoteirizacaoPage() {
  const [regras, setRegras] = useState(regrasFake);
  const [filtros, setFiltros] = useState({ familia: '', processo: '', maquinaPreferencial: '', status: '' });
  const [novaRegra, setNovaRegra] = useState({ familia: '', processo: '', maquinaPreferencial: '', ordem: '', formulaTempo: '', condicao: '', status: 'Ativo' });
  const [editRegra, setEditRegra] = useState({ id: '', familia: '', processo: '', maquinaPreferencial: '', ordem: '', formulaTempo: '', condicao: '', status: 'Ativo' });

  const modalCadastroRef = useRef();
  const modalEdicaoRef = useRef();

  const fecharModal = (ref) => {
    const modal = window.bootstrap.Modal.getInstance(ref.current);
    if (modal) modal.hide();
  };

  const abrirModalCadastro = () => {
    setNovaRegra({ familia: '', processo: '', maquinaPreferencial: '', ordem: '', formulaTempo: '', condicao: '', status: 'Ativo' });
    new window.bootstrap.Modal(modalCadastroRef.current).show();
  };

  const abrirModalEdicao = (item) => {
    setEditRegra({
      id: item._id,
      familia: item.familia,
      processo: item.processo,
      maquinaPreferencial: item.maquinaPreferencial,
      ordem: item.ordem,
      formulaTempo: item.formulaTempo,
      condicao: item.condicao,
      status: item.status,
    });
    new window.bootstrap.Modal(modalEdicaoRef.current).show();
  };

  const regrasFiltradas = useMemo(() => {
    const toStr = (v) => (v ?? '').toString().toLowerCase();
    return regras.filter((r) =>
      toStr(r.familia).includes(toStr(filtros.familia)) &&
      toStr(r.processo).includes(toStr(filtros.processo)) &&
      toStr(r.maquinaPreferencial).includes(toStr(filtros.maquinaPreferencial)) &&
      toStr(r.status).includes(toStr(filtros.status))
    );
  }, [regras, filtros]);

  const cadastrarRegra = () => {
    if (!s(novaRegra.familia)) return alert('Informe a família.');
    if (!s(novaRegra.processo)) return alert('Informe o processo.');

    const item = {
      _id: gerarId(),
      familia: s(novaRegra.familia),
      processo: s(novaRegra.processo),
      maquinaPreferencial: s(novaRegra.maquinaPreferencial),
      ordem: Number(novaRegra.ordem || 0),
      formulaTempo: s(novaRegra.formulaTempo),
      condicao: s(novaRegra.condicao),
      status: novaRegra.status,
    };

    setRegras((prev) => [item, ...prev]);
    alert('Regra fake cadastrada com sucesso!');
    fecharModal(modalCadastroRef);
  };

  const editarRegra = () => {
    setRegras((prev) => prev.map((r) => r._id === editRegra.id ? {
      ...r,
      familia: s(editRegra.familia),
      processo: s(editRegra.processo),
      maquinaPreferencial: s(editRegra.maquinaPreferencial),
      ordem: Number(editRegra.ordem || 0),
      formulaTempo: s(editRegra.formulaTempo),
      condicao: s(editRegra.condicao),
      status: editRegra.status,
    } : r));

    alert('Regra fake editada com sucesso!');
    fecharModal(modalEdicaoRef);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">🧠 Regras de Roteirização</h2>

      <div className="accordion mb-3" id="accordionFiltrosRegras"><div className="accordion-item">
        <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltrosRegras">🔎 Filtros de Pesquisa</button></h2>
        <div id="collapseFiltrosRegras" className="accordion-collapse collapse show"><div className="accordion-body"><div className="row g-3">
          {[
            { key: 'familia', placeholder: 'família' },
            { key: 'processo', placeholder: 'processo' },
            { key: 'maquinaPreferencial', placeholder: 'máquina preferencial' },
            { key: 'status', placeholder: 'status' },
          ].map(({ key, placeholder }) => (
            <div key={key} className="col-12 col-md-6 col-lg-3"><input className="form-control" placeholder={placeholder} value={filtros[key]} onChange={(e) => setFiltros((p) => ({ ...p, [key]: e.target.value }))} /></div>
          ))}
        </div></div></div>
      </div></div>

      <div className="mb-3"><button className="btn btn-primary" onClick={abrirModalCadastro}><i className="lni lni-plus me-1" /> Cadastrar Regra</button></div>

      <div className="table-responsive" style={{ maxHeight: '600px', overflow: 'auto' }}>
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light"><tr>{['Ações', 'Família', 'Processo', 'Máquina Preferencial', 'Ordem', 'Fórmula de Tempo', 'Condição', 'Status'].map((h) => <th key={h} style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 2 }}>{h}</th>)}</tr></thead>
          <tbody>
            {regrasFiltradas.length === 0 ? <tr><td colSpan={8} className="text-center text-muted py-4">Nenhuma regra encontrada.</td></tr> : regrasFiltradas.map((item) => (
              <tr key={item._id}>
                <td><button className="btn btn-outline-secondary btn-sm" onClick={() => abrirModalEdicao(item)}><i className="lni lni-pencil" /></button></td>
                <td>{item.familia}</td>
                <td>{item.processo}</td>
                <td>{item.maquinaPreferencial || '-'}</td>
                <td>{item.ordem}</td>
                <td><code>{item.formulaTempo || '-'}</code></td>
                <td>{item.condicao || '-'}</td>
                <td><span className={`badge ${item.status === 'Ativo' ? 'text-bg-success' : 'text-bg-secondary'}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalCadastroRef}><div className="modal-dialog modal-xl modal-dialog-centered"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">🆕 Cadastrar Regra de Roteirização</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
        <div className="modal-body"><div className="row g-3">
          <div className="col-md-4"><label className="form-label">Família</label><input className="form-control" value={novaRegra.familia} onChange={(e) => setNovaRegra((p) => ({ ...p, familia: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Processo</label><input className="form-control" value={novaRegra.processo} onChange={(e) => setNovaRegra((p) => ({ ...p, processo: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Máquina Preferencial</label><input className="form-control" value={novaRegra.maquinaPreferencial} onChange={(e) => setNovaRegra((p) => ({ ...p, maquinaPreferencial: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Ordem</label><input type="number" className="form-control" value={novaRegra.ordem} onChange={(e) => setNovaRegra((p) => ({ ...p, ordem: e.target.value }))} /></div>
          <div className="col-md-5"><label className="form-label">Fórmula de Tempo</label><input className="form-control" value={novaRegra.formulaTempo} onChange={(e) => setNovaRegra((p) => ({ ...p, formulaTempo: e.target.value }))} placeholder="ex: perimetro_mm / 800" /></div>
          <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={novaRegra.status} onChange={(e) => setNovaRegra((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
          <div className="col-12"><label className="form-label">Condição</label><textarea className="form-control" rows="3" value={novaRegra.condicao} onChange={(e) => setNovaRegra((p) => ({ ...p, condicao: e.target.value }))} placeholder="Descreva quando esta regra deve ser aplicada" /></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalCadastroRef)}>Cancelar</button><button className="btn btn-success" onClick={cadastrarRegra}><i className="lni lni-checkmark me-1" /> Cadastrar</button></div>
      </div></div></div>

      <div className="modal fade" tabIndex="-1" ref={modalEdicaoRef}><div className="modal-dialog modal-xl modal-dialog-centered"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">✏️ Editar Regra de Roteirização</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
        <div className="modal-body"><div className="row g-3">
          <div className="col-md-3"><label className="form-label">ID</label><input className="form-control" readOnly value={editRegra.id} /></div>
          <div className="col-md-3"><label className="form-label">Família</label><input className="form-control" value={editRegra.familia} onChange={(e) => setEditRegra((p) => ({ ...p, familia: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Processo</label><input className="form-control" value={editRegra.processo} onChange={(e) => setEditRegra((p) => ({ ...p, processo: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Máquina Preferencial</label><input className="form-control" value={editRegra.maquinaPreferencial} onChange={(e) => setEditRegra((p) => ({ ...p, maquinaPreferencial: e.target.value }))} /></div>
          <div className="col-md-3"><label className="form-label">Ordem</label><input type="number" className="form-control" value={editRegra.ordem} onChange={(e) => setEditRegra((p) => ({ ...p, ordem: e.target.value }))} /></div>
          <div className="col-md-5"><label className="form-label">Fórmula de Tempo</label><input className="form-control" value={editRegra.formulaTempo} onChange={(e) => setEditRegra((p) => ({ ...p, formulaTempo: e.target.value }))} /></div>
          <div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={editRegra.status} onChange={(e) => setEditRegra((p) => ({ ...p, status: e.target.value }))}>{['Ativo', 'Inativo'].map((st) => <option key={st} value={st}>{st}</option>)}</select></div>
          <div className="col-12"><label className="form-label">Condição</label><textarea className="form-control" rows="3" value={editRegra.condicao} onChange={(e) => setEditRegra((p) => ({ ...p, condicao: e.target.value }))} /></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => fecharModal(modalEdicaoRef)}>Cancelar</button><button className="btn btn-primary" onClick={editarRegra}><i className="lni lni-checkmark me-1" /> Salvar Alterações</button></div>
      </div></div></div>
    </div>
  );
}
