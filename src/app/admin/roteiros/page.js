'use client';

import { useMemo, useRef, useState } from 'react';

const roteirosFake = [
  {
    _id: 'rot001',
    codigoPeca: '6040220881-001',
    descricao: 'CHAPA PROTECAO AT70',
    familia: 'Chapas Dobradas',
    tempoTotalMin: 7.2,
    status: 'Pronto para ERP',
    imagemUrl: '/exemplos/6040220881-001.jpg',
    enviadoERP: false,
    etapas: [
      { ordem: 10, processo: 'Corte Laser', maquina: 'Laser Trumpf 01', tempoMin: 3.8 },
      { ordem: 20, processo: 'Dobra', maquina: 'Dobradeira 400T', tempoMin: 2.4 },
      { ordem: 30, processo: 'Inspeção', maquina: 'Mesa Insp. 01', tempoMin: 1.0 },
    ],
  },
  {
    _id: 'rot002',
    codigoPeca: '6040220124XAS',
    descricao: 'CONJUNTO SOLDADO',
    familia: 'Conjuntos Soldados',
    tempoTotalMin: 15.6,
    status: 'Em Revisão',
    imagemUrl: '/exemplos/6040220124XAS.jpg',
    enviadoERP: false,
    etapas: [
      { ordem: 10, processo: 'Corte Perfil', maquina: 'Serra 01', tempoMin: 4.2 },
      { ordem: 20, processo: 'Solda MIG', maquina: 'Célula de Solda 01', tempoMin: 8.9 },
      { ordem: 30, processo: 'Inspeção', maquina: 'Mesa Insp. 01', tempoMin: 2.5 },
    ],
  },
];

export default function RoteirosPage() {
  const [roteiros, setRoteiros] = useState(roteirosFake);
  const [filtros, setFiltros] = useState({ codigoPeca: '', descricao: '', familia: '', status: '' });
  const [roteiroSelecionado, setRoteiroSelecionado] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const modalRoteiroRef = useRef();
  const modalImagemRef = useRef();

  const roteirosFiltrados = useMemo(() => {
    const toStr = (v) => (v ?? '').toString().toLowerCase();
    return roteiros.filter((r) =>
      toStr(r.codigoPeca).includes(toStr(filtros.codigoPeca)) &&
      toStr(r.descricao).includes(toStr(filtros.descricao)) &&
      toStr(r.familia).includes(toStr(filtros.familia)) &&
      toStr(r.status).includes(toStr(filtros.status))
    );
  }, [roteiros, filtros]);

  const abrirModalRoteiro = (item) => {
    setRoteiroSelecionado(JSON.parse(JSON.stringify(item)));
    new window.bootstrap.Modal(modalRoteiroRef.current).show();
  };

  const abrirModalImagem = (item) => {
    setImagemSelecionada(item);
    new window.bootstrap.Modal(modalImagemRef.current).show();
  };

  const atualizarEtapa = (index, campo, valor) => {
    setRoteiroSelecionado((prev) => {
      const copia = { ...prev, etapas: [...prev.etapas] };
      copia.etapas[index] = {
        ...copia.etapas[index],
        [campo]: campo === 'ordem' || campo === 'tempoMin' ? Number(valor) : valor,
      };
      copia.tempoTotalMin = copia.etapas.reduce((acc, etapa) => acc + Number(etapa.tempoMin || 0), 0);
      return copia;
    });
  };

  const salvarAjustes = () => {
    if (!roteiroSelecionado) return;
    setRoteiros((prev) => prev.map((r) => (r._id === roteiroSelecionado._id ? roteiroSelecionado : r)));
    alert('Roteiro fake ajustado com sucesso!');
    const modal = window.bootstrap.Modal.getInstance(modalRoteiroRef.current);
    if (modal) modal.hide();
  };

  const enviarParaERP = (id) => {
    setRoteiros((prev) => prev.map((r) => (r._id === id ? { ...r, enviadoERP: true, status: 'Enviado ao ERP' } : r)));
    alert('Roteiro fake enviado ao Protheus com sucesso!');
  };

  const badgeStatus = (status) => {
    if (status === 'Enviado ao ERP') return 'text-bg-primary';
    if (status === 'Pronto para ERP') return 'text-bg-success';
    return 'text-bg-warning';
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">🛣️ Roteiros</h2>

      <div className="accordion mb-3" id="accordionFiltrosRoteiros"><div className="accordion-item">
        <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltrosRoteiros">🔎 Filtros de Pesquisa</button></h2>
        <div id="collapseFiltrosRoteiros" className="accordion-collapse collapse show"><div className="accordion-body"><div className="row g-3">
          {[
            { key: 'codigoPeca', placeholder: 'código da peça' },
            { key: 'descricao', placeholder: 'descrição' },
            { key: 'familia', placeholder: 'família' },
            { key: 'status', placeholder: 'status' },
          ].map(({ key, placeholder }) => (
            <div key={key} className="col-12 col-md-6 col-lg-3"><input className="form-control" placeholder={placeholder} value={filtros[key]} onChange={(e) => setFiltros((p) => ({ ...p, [key]: e.target.value }))} /></div>
          ))}
        </div></div></div>
      </div></div>

      <div className="table-responsive" style={{ maxHeight: '650px', overflow: 'auto' }}>
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light"><tr>{['Ações', 'Código', 'Descrição', 'Família', 'Tempo Total (min)', 'Status', 'ERP'].map((h) => <th key={h} style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 2 }}>{h}</th>)}</tr></thead>
          <tbody>
            {roteirosFiltrados.length === 0 ? <tr><td colSpan={7} className="text-center text-muted py-4">Nenhum roteiro encontrado.</td></tr> : roteirosFiltrados.map((item) => (
              <tr key={item._id}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary" onClick={() => abrirModalImagem(item)} title="Visualizar JPEG"><i className="lni lni-image" /></button>
                    <button className="btn btn-outline-secondary" onClick={() => abrirModalRoteiro(item)} title="Ajustar roteiro"><i className="lni lni-pencil" /></button>
                    <button className="btn btn-outline-success" onClick={() => enviarParaERP(item._id)} title="Enviar para ERP" disabled={item.enviadoERP}><i className="lni lni-upload" /></button>
                  </div>
                </td>
                <td>{item.codigoPeca}</td>
                <td>{item.descricao}</td>
                <td>{item.familia}</td>
                <td>{item.tempoTotalMin.toFixed(2)}</td>
                <td><span className={`badge ${badgeStatus(item.status)}`}>{item.status}</span></td>
                <td>{item.enviadoERP ? <span className="badge text-bg-primary">Enviado</span> : <span className="badge text-bg-secondary">Pendente</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalImagemRef}>
        <div className="modal-dialog modal-xl modal-dialog-centered"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">🖼️ Visualizar Desenho 2D</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
          <div className="modal-body text-center">
            {imagemSelecionada ? (
              <>
                <p className="mb-3"><strong>{imagemSelecionada.codigoPeca}</strong> — {imagemSelecionada.descricao}</p>
                <img src={imagemSelecionada.imagemUrl} alt={imagemSelecionada.codigoPeca} className="img-fluid border rounded" style={{ maxHeight: '70vh' }} />
              </>
            ) : <p className="text-muted">Nenhuma imagem selecionada.</p>}
          </div>
        </div></div>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalRoteiroRef}>
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">✏️ Ajustar Roteiro</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
          <div className="modal-body">
            {roteiroSelecionado ? (
              <>
                <div className="row g-3 mb-3">
                  <div className="col-md-3"><label className="form-label">Código</label><input className="form-control" readOnly value={roteiroSelecionado.codigoPeca} /></div>
                  <div className="col-md-5"><label className="form-label">Descrição</label><input className="form-control" value={roteiroSelecionado.descricao} onChange={(e) => setRoteiroSelecionado((p) => ({ ...p, descricao: e.target.value }))} /></div>
                  <div className="col-md-2"><label className="form-label">Família</label><input className="form-control" value={roteiroSelecionado.familia} onChange={(e) => setRoteiroSelecionado((p) => ({ ...p, familia: e.target.value }))} /></div>
                  <div className="col-md-2"><label className="form-label">Tempo Total</label><input className="form-control" readOnly value={roteiroSelecionado.tempoTotalMin.toFixed(2)} /></div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered table-sm align-middle">
                    <thead className="table-light"><tr><th>Ordem</th><th>Processo</th><th>Máquina</th><th>Tempo (min)</th></tr></thead>
                    <tbody>
                      {roteiroSelecionado.etapas.map((etapa, index) => (
                        <tr key={`${roteiroSelecionado._id}-${index}`}>
                          <td><input type="number" className="form-control form-control-sm" value={etapa.ordem} onChange={(e) => atualizarEtapa(index, 'ordem', e.target.value)} /></td>
                          <td><input className="form-control form-control-sm" value={etapa.processo} onChange={(e) => atualizarEtapa(index, 'processo', e.target.value)} /></td>
                          <td><input className="form-control form-control-sm" value={etapa.maquina} onChange={(e) => atualizarEtapa(index, 'maquina', e.target.value)} /></td>
                          <td><input type="number" step="0.1" className="form-control form-control-sm" value={etapa.tempoMin} onChange={(e) => atualizarEtapa(index, 'tempoMin', e.target.value)} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : <p className="text-muted">Nenhum roteiro selecionado.</p>}
          </div>
          <div className="modal-footer"><button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button className="btn btn-primary" onClick={salvarAjustes}><i className="lni lni-checkmark me-1" /> Salvar Ajustes</button></div>
        </div></div>
      </div>
    </div>
  );
}
