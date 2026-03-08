'use client';

import { useMemo, useRef, useState } from 'react';

const gerarId = () => Math.random().toString(36).slice(2, 10);

const arquivosFake = [
  {
    _id: 'arq001',
    codigoPeca: '6040220881-001',
    descricao: 'CHAPA PROTECAO AT70',
    nomeArquivo: '6040220881-001.jpg',
    familia: '',
    status: 'Aguardando Processamento',
    erro: '',
    imagemUrl: '/exemplos/6040220881-001.jpg',
    selecionado: false,
  },
  {
    _id: 'arq002',
    codigoPeca: '6016120989-019',
    descricao: 'EIXO MOVIDOREDUTOR',
    nomeArquivo: '6016120989-019.jpg',
    familia: '',
    status: 'Erro de Processamento',
    erro: 'OCR não conseguiu ler a dimensão principal.',
    imagemUrl: '/exemplos/6016120989-019.jpg',
    selecionado: false,
  },
  {
    _id: 'arq003',
    codigoPeca: '6040220124XAS',
    descricao: 'CONJUNTO SOLDADO',
    nomeArquivo: '6040220124XAS.jpg',
    familia: '',
    status: 'Aguardando Processamento',
    erro: '',
    imagemUrl: '/exemplos/6040220124XAS.jpg',
    selecionado: false,
  },
];

const familiasDisponiveis = ['Chapas Dobradas', 'Eixos Usinados', 'Conjuntos Soldados', 'Perfis Estruturais'];

export default function ArquivosParaProcessarPage() {
  const [arquivos, setArquivos] = useState(arquivosFake);
  const [familiaLote, setFamiliaLote] = useState('');
  const [filtros, setFiltros] = useState({ codigoPeca: '', descricao: '', status: '', familia: '' });
  const [preview, setPreview] = useState(null);
  const modalPreviewRef = useRef();

  const abrirPreview = (item) => {
    setPreview(item);
    new window.bootstrap.Modal(modalPreviewRef.current).show();
  };

  const arquivosFiltrados = useMemo(() => {
    const toStr = (v) => (v ?? '').toString().toLowerCase();
    return arquivos.filter((a) =>
      toStr(a.codigoPeca).includes(toStr(filtros.codigoPeca)) &&
      toStr(a.descricao).includes(toStr(filtros.descricao)) &&
      toStr(a.status).includes(toStr(filtros.status)) &&
      toStr(a.familia).includes(toStr(filtros.familia))
    );
  }, [arquivos, filtros]);

  const alternarSelecao = (id) => {
    setArquivos((prev) => prev.map((a) => (a._id === id ? { ...a, selecionado: !a.selecionado } : a)));
  };

  const selecionarTodosVisiveis = (checked) => {
    const idsVisiveis = new Set(arquivosFiltrados.map((a) => a._id));
    setArquivos((prev) => prev.map((a) => (idsVisiveis.has(a._id) ? { ...a, selecionado: checked } : a)));
  };

  const carregarArquivosFake = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const novos = files.map((file, index) => ({
      _id: gerarId() + index,
      codigoPeca: file.name.replace(/\.[^.]+$/, ''),
      descricao: 'Novo desenho carregado para apresentação',
      nomeArquivo: file.name,
      familia: '',
      status: 'Aguardando Processamento',
      erro: '',
      imagemUrl: URL.createObjectURL(file),
      selecionado: false,
    }));

    setArquivos((prev) => [...novos, ...prev]);
    event.target.value = '';
    alert('Arquivos fake adicionados com sucesso!');
  };

  const rodarJobFake = () => {
    if (!familiaLote) return alert('Selecione a família do lote antes de rodar o job.');

    const selecionados = arquivos.filter((a) => a.selecionado);
    if (!selecionados.length) return alert('Selecione pelo menos um item.');

    setArquivos((prev) =>
      prev.map((a) => {
        if (!a.selecionado) return a;
        const deuErro = a.codigoPeca.includes('989');
        return {
          ...a,
          familia: familiaLote,
          selecionado: false,
          status: deuErro ? 'Erro de Processamento' : 'Processado com Sucesso',
          erro: deuErro ? 'Falha fake ao interpretar contorno principal da peça.' : '',
        };
      })
    );

    alert('Job fake executado com sucesso!');
  };

  const limparErro = (id) => {
    setArquivos((prev) => prev.map((a) => a._id === id ? { ...a, status: 'Aguardando Processamento', erro: '' } : a));
    alert('Erro fake limpo com sucesso!');
  };

  const statusBadge = (status) => {
    if (status === 'Processado com Sucesso') return 'text-bg-success';
    if (status === 'Erro de Processamento') return 'text-bg-danger';
    return 'text-bg-warning';
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">🗂️ Arquivos para Processar</h2>

      <div className="accordion mb-3" id="accordionFiltrosArquivos"><div className="accordion-item">
        <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltrosArquivos">🔎 Filtros de Pesquisa</button></h2>
        <div id="collapseFiltrosArquivos" className="accordion-collapse collapse show"><div className="accordion-body"><div className="row g-3">
          {[
            { key: 'codigoPeca', placeholder: 'código da peça' },
            { key: 'descricao', placeholder: 'descrição' },
            { key: 'status', placeholder: 'status' },
            { key: 'familia', placeholder: 'família' },
          ].map(({ key, placeholder }) => (
            <div key={key} className="col-12 col-md-6 col-lg-3"><input className="form-control" placeholder={placeholder} value={filtros[key]} onChange={(e) => setFiltros((p) => ({ ...p, [key]: e.target.value }))} /></div>
          ))}
        </div></div></div>
      </div></div>

      <div className="card mb-3 border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-lg-4">
              <label className="form-label">Carregar novos arquivos</label>
              <input type="file" accept="image/*" multiple className="form-control" onChange={carregarArquivosFake} />
            </div>
            <div className="col-12 col-lg-4">
              <label className="form-label">Família do lote</label>
              <select className="form-select" value={familiaLote} onChange={(e) => setFamiliaLote(e.target.value)}>
                <option value="">Selecione</option>
                {familiasDisponiveis.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="col-12 col-lg-4 d-flex flex-wrap gap-2">
              <button className="btn btn-primary" onClick={rodarJobFake}><i className="lni lni-cogs me-1" /> Rodar Job</button>
              <button className="btn btn-outline-secondary" onClick={() => selecionarTodosVisiveis(true)}>Selecionar Visíveis</button>
              <button className="btn btn-outline-secondary" onClick={() => selecionarTodosVisiveis(false)}>Limpar Seleção</button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive" style={{ maxHeight: '650px', overflow: 'auto' }}>
        <table className="table table-bordered table-striped table-sm align-middle">
          <thead className="table-light"><tr>{['Sel.', 'Ações', 'Código', 'Descrição', 'Arquivo', 'Família', 'Status', 'Erro'].map((h) => <th key={h} style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 2 }}>{h}</th>)}</tr></thead>
          <tbody>
            {arquivosFiltrados.length === 0 ? <tr><td colSpan={8} className="text-center text-muted py-4">Nenhum arquivo encontrado.</td></tr> : arquivosFiltrados.map((item) => (
              <tr key={item._id}>
                <td><input type="checkbox" className="form-check-input" checked={item.selecionado} onChange={() => alternarSelecao(item._id)} /></td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary" onClick={() => abrirPreview(item)} title="Visualizar JPEG"><i className="lni lni-image" /></button>
                    {item.status === 'Erro de Processamento' && (
                      <button className="btn btn-outline-warning" onClick={() => limparErro(item._id)} title="Limpar erro"><i className="lni lni-reload" /></button>
                    )}
                  </div>
                </td>
                <td>{item.codigoPeca}</td>
                <td>{item.descricao}</td>
                <td>{item.nomeArquivo}</td>
                <td>{item.familia || '-'}</td>
                <td><span className={`badge ${statusBadge(item.status)}`}>{item.status}</span></td>
                <td>{item.erro || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalPreviewRef}>
        <div className="modal-dialog modal-xl modal-dialog-centered"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">🖼️ Visualizar Desenho 2D</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
          <div className="modal-body text-center">
            {preview ? (
              <>
                <p className="mb-3"><strong>{preview.codigoPeca}</strong> — {preview.descricao}</p>
                <img src={preview.imagemUrl} alt={preview.nomeArquivo} className="img-fluid border rounded" style={{ maxHeight: '70vh' }} />
              </>
            ) : <p className="text-muted">Nenhum item selecionado.</p>}
          </div>
        </div></div>
      </div>
    </div>
  );
}
