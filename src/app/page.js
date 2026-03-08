'use client';

import Link from 'next/link';
import Image from 'next/image';

const modulos = [
    {
        titulo: 'Usuários',
        descricao:
            'Administração de acessos da aplicação com operações de cadastro, edição, consulta e remoção.',
        icone: '👤',
    },
    {
        titulo: 'Famílias de Peças',
        descricao:
            'Organiza os tipos de peças que orientam a estratégia de análise utilizada pelo motor técnico.',
        icone: '🧩',
    },
    {
        titulo: 'Máquinas de Produção',
        descricao:
            'Cadastro dos recursos produtivos envolvidos na montagem dos roteiros e análise de capacidade.',
        icone: '⚙️',
    },
    {
        titulo: 'Processos de Fabricação',
        descricao:
            'Base de processos produtivos utilizados na composição dos roteiros gerados.',
        icone: '🏭',
    },
    {
        titulo: 'Regras de Roteirização',
        descricao:
            'Relaciona características da peça, processos, ordem operacional, máquinas elegíveis e critérios de tempo.',
        icone: '🗺️',
    },
    {
        titulo: 'Arquivos para Processar',
        descricao:
            'Entrada operacional dos desenhos técnicos com upload, seleção de família, execução e tratamento de erros.',
        icone: '🖼️',
    },
    {
        titulo: 'Roteiros',
        descricao:
            'Concentra os itens processados com sucesso, revisão manual e envio ao ERP.',
        icone: '📋',
    },
];

const beneficios = [
    'Redução do esforço manual na interpretação inicial dos desenhos',
    'Maior padronização na geração dos roteiros de fabricação',
    'Melhor aproveitamento das regras produtivas da fábrica',
    'Agilidade na preparação dos roteiros para integração com o ERP',
    'Rastreabilidade dos arquivos processados, erros e resultados',
    'Estrutura tecnológica preparada para evolução contínua da inteligência de análise',
];

const etapas = [
    {
        titulo: 'Upload e organização',
        descricao:
            'Os desenhos técnicos em imagem são carregados no portal e associados à família de peças correspondente.',
        numero: '01',
    },
    {
        titulo: 'Análise técnica em Python',
        descricao:
            'O job interpreta a imagem, identifica características relevantes da peça e retorna dados estruturados.',
        numero: '02',
    },
    {
        titulo: 'Aplicação das regras',
        descricao:
            'O portal usa as regras de roteirização para transformar a análise em um roteiro inicial de fabricação.',
        numero: '03',
    },
    {
        titulo: 'Revisão e integração',
        descricao:
            'Os roteiros gerados podem ser ajustados antes do envio automatizado ao ERP da empresa.',
        numero: '04',
    },
];

const valorHora = 150;
const horasSemana = 16;
const semanasEstimadas = 8;
const horasTotais = horasSemana * semanasEstimadas;
const valorTotal = valorHora * horasTotais;

export default function HomePage() {
    return (
        <>
            <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: Inter, Arial, Helvetica, sans-serif;
          color: #eef4ff;
          background:
            radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.22), transparent 28%),
            radial-gradient(circle at 85% 10%, rgba(34, 211, 238, 0.18), transparent 22%),
            radial-gradient(circle at 50% 55%, rgba(124, 58, 237, 0.12), transparent 24%),
            linear-gradient(180deg, #030712 0%, #08111f 30%, #0a1728 65%, #08111f 100%);
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .landing-root {
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .noise-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: radial-gradient(circle at center, black 50%, transparent 100%);
        }

        .glow-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          opacity: 0.45;
          pointer-events: none;
          animation: floatOrb 8s ease-in-out infinite;
        }

        .glow-a {
          width: 320px;
          height: 320px;
          background: rgba(37, 99, 235, 0.35);
          top: 80px;
          left: -60px;
        }

        .glow-b {
          width: 260px;
          height: 260px;
          background: rgba(6, 182, 212, 0.26);
          top: 140px;
          right: -40px;
          animation-delay: 1.2s;
        }

        .glow-c {
          width: 300px;
          height: 300px;
          background: rgba(124, 58, 237, 0.20);
          bottom: 180px;
          left: 45%;
          animation-delay: 2.2s;
        }

        @keyframes floatOrb {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-18px) translateX(12px) scale(1.04);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseSoft {
          0%, 100% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.16);
          }
        }

        .container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 26px 0 10px;
          animation: fadeUp 0.7s ease forwards;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-logo-box {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 18px 45px rgba(37, 99, 235, 0.18);
          backdrop-filter: blur(10px);
          flex-shrink: 0;
        }

        .brand-overline {
          font-size: 12px;
          color: #86b6ff;
          text-transform: uppercase;
          letter-spacing: 1.8px;
          margin-bottom: 3px;
        }

        .brand-title {
          font-size: 22px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-link {
          color: #c2d6f6;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 14px;
          transition: 0.2s ease;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: #ffffff;
          font-weight: 800;
          border: none;
          box-shadow: 0 16px 38px rgba(37, 99, 235, 0.34);
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 44px rgba(37, 99, 235, 0.38);
          opacity: 0.98;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          color: #eef4ff;
          font-weight: 700;
          border: 1px solid rgba(255, 255, 255, 0.10);
          transition: 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.08);
        }

        .hero {
          padding: 30px 0 56px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 28px;
          align-items: center;
        }

        .hero-left {
          animation: fadeUp 0.8s ease forwards;
        }

        .hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: #c8dcfa;
          font-size: 14px;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          margin: 0 0 18px;
          font-size: clamp(2.6rem, 5.5vw, 5rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: #ffffff;
          max-width: 860px;
        }

        .hero-gradient {
          background: linear-gradient(90deg, #60a5fa, #22d3ee, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text {
          margin: 0 0 28px;
          max-width: 760px;
          color: #c6d7f1;
          font-size: 18px;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .hero-mini-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          max-width: 860px;
        }

        .mini-card {
          border-radius: 18px;
          padding: 16px;
          min-height: 124px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(10px);
          transition: 0.25s ease;
        }

        .mini-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.07);
        }

        .mini-title {
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .mini-text {
          color: #c2d6f4;
          font-size: 14px;
          line-height: 1.6;
        }

        .hero-right {
          animation: fadeUp 0.95s ease forwards;
        }

        .dashboard-shell {
          position: relative;
          padding: 20px;
          border-radius: 30px;
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(14px);
          overflow: hidden;
          animation: pulseSoft 5s ease-in-out infinite;
        }

        .dashboard-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(59,130,246,0.12), transparent 35%, rgba(34,211,238,0.08)),
            radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 28%);
          pointer-events: none;
        }

        .mock-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .mock-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #d7e6ff;
          font-weight: 700;
        }

        .mock-dots {
          display: flex;
          gap: 7px;
        }

        .mock-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.22);
        }

        .mock-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .mock-process {
          padding: 18px;
          border-radius: 20px;
          background: rgba(5, 10, 22, 0.55);
          border: 1px solid rgba(255,255,255,0.08);
          transition: 0.25s ease;
        }

        .mock-process:hover {
          transform: translateX(4px);
          border-color: rgba(255,255,255,0.14);
        }

        .mock-badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: 0.04em;
        }

        .mock-title {
          color: #ffffff;
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .mock-desc {
          color: #c3d6f1;
          font-size: 14px;
          line-height: 1.65;
        }

        .section {
          padding: 34px 0;
        }

        .section-header {
          max-width: 860px;
          margin-bottom: 28px;
        }

        .eyebrow {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.6px;
          color: #7dd3fc;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .section-title {
          margin: 0 0 10px;
          font-size: clamp(1.9rem, 3vw, 3rem);
          line-height: 1.08;
          color: #ffffff;
        }

        .section-subtitle {
          margin: 0;
          color: #c1d4ef;
          font-size: 17px;
          line-height: 1.75;
        }

        .arch-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 22px;
        }

        .arch-card,
        .flow-card,
        .module-card,
        .info-card,
        .mvp-card,
        .prazo-card,
        .stack-logo-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          transition: 0.25s ease;
        }

        .arch-card:hover,
        .flow-card:hover,
        .module-card:hover,
        .info-card:hover,
        .mvp-card:hover,
        .prazo-card:hover,
        .stack-logo-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,0.16);
          background: rgba(255, 255, 255, 0.07);
        }

        .arch-card {
          padding: 24px;
          min-height: 220px;
        }

        .arch-index {
          color: #67e8f9;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1.6px;
          margin-bottom: 14px;
        }

        .arch-title {
          margin: 0 0 12px;
          color: #ffffff;
          font-size: 22px;
          line-height: 1.2;
        }

        .arch-text {
          margin: 0;
          color: #c3d6f1;
          font-size: 15px;
          line-height: 1.7;
        }

        .stack-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .stack-logo-card {
          padding: 18px;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .stack-logo-wrap {
          width: 72px;
          height: 72px;
          position: relative;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stack-title {
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
        }

        .flow-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .flow-card {
          padding: 22px;
          min-height: 235px;
          position: relative;
          overflow: hidden;
        }

        .flow-card::after {
          content: '';
          position: absolute;
          inset: auto -10px -40px auto;
          width: 120px;
          height: 120px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(96,165,250,0.18), transparent 68%);
          pointer-events: none;
        }

        .flow-number {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 900;
          color: #ffffff;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          box-shadow: 0 14px 34px rgba(37, 99, 235, 0.25);
          margin-bottom: 16px;
        }

        .flow-title {
          margin: 0 0 10px;
          color: #ffffff;
          font-size: 19px;
          line-height: 1.25;
        }

        .flow-text {
          margin: 0;
          color: #bfd3ef;
          font-size: 15px;
          line-height: 1.68;
        }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .module-card {
          padding: 22px;
          min-height: 225px;
        }

        .module-icon {
          font-size: 30px;
          margin-bottom: 14px;
        }

        .module-title {
          margin: 0 0 10px;
          color: #ffffff;
          font-size: 21px;
          line-height: 1.2;
        }

        .module-text {
          margin: 0;
          color: #c4d6ef;
          font-size: 15px;
          line-height: 1.68;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .info-card {
          padding: 26px;
        }

        .info-label {
          display: inline-block;
          margin-bottom: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(34, 211, 238, 0.10);
          color: #67e8f9;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .info-title {
          margin: 0 0 12px;
          color: #ffffff;
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          line-height: 1.15;
        }

        .info-text {
          margin: 0;
          color: #c3d6f1;
          font-size: 15.5px;
          line-height: 1.8;
        }

        .mvp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .mvp-card {
          padding: 24px;
        }

        .mvp-card-title {
          margin: 0 0 14px;
          font-size: 22px;
          color: #ffffff;
        }

        .mvp-list {
          margin: 0;
          padding-left: 20px;
          color: #c4d6ef;
          line-height: 1.9;
          font-size: 15.5px;
        }

        .prazo-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 22px;
        }

        .prazo-card {
          padding: 26px;
        }

        .prazo-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .prazo-stat {
          padding: 18px;
          border-radius: 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .prazo-stat-label {
          color: #9fc2f8;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 8px;
        }

        .prazo-stat-value {
          color: #ffffff;
          font-size: 28px;
          font-weight: 900;
          line-height: 1.1;
        }

        .prazo-stat-sub {
          color: #bfd3ef;
          font-size: 14px;
          margin-top: 6px;
          line-height: 1.5;
        }

        .prazo-alerta {
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(250, 204, 21, 0.10);
          border: 1px solid rgba(250, 204, 21, 0.18);
          color: #fef3c7;
          font-size: 14px;
          line-height: 1.65;
        }

        .cta-wrap {
          padding: 20px 0 80px;
        }

        .cta-box {
          position: relative;
          border-radius: 34px;
          overflow: hidden;
          padding: 38px 28px;
          background:
            linear-gradient(135deg, rgba(37,99,235,0.28), rgba(8,145,178,0.22) 55%, rgba(124,58,237,0.22)),
            rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 28px 70px rgba(0,0,0,0.28);
        }

        .cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14), transparent 24%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08), transparent 24%);
          pointer-events: none;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .cta-kicker {
          display: inline-block;
          margin-bottom: 14px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          color: #d7e8ff;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .cta-title {
          margin: 0 0 12px;
          color: #ffffff;
          font-size: clamp(1.9rem, 3.4vw, 3.1rem);
          line-height: 1.08;
          max-width: 760px;
        }

        .cta-text {
          margin: 0;
          color: #d7e8ff;
          font-size: 17px;
          line-height: 1.7;
          max-width: 760px;
        }

        .cta-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .footer-note {
          margin-top: 18px;
          color: #91a7ca;
          font-size: 13px;
        }

        @media (max-width: 1100px) {
          .hero-grid,
          .two-col,
          .mvp-grid,
          .prazo-grid {
            grid-template-columns: 1fr;
          }

          .arch-grid,
          .module-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .flow-grid,
          .stack-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hero-mini-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .arch-grid,
          .module-grid,
          .flow-grid,
          .stack-grid,
          .prazo-stats {
            grid-template-columns: 1fr;
          }

          .hero {
            padding-top: 16px;
          }

          .hero-title {
            font-size: 2.35rem;
          }

          .brand-title {
            font-size: 18px;
          }

          .cta-content {
            align-items: flex-start;
          }

          .brand-logo-box {
            width: 48px;
            height: 48px;
            border-radius: 14px;
          }
        }
      `}</style>

            <div className="landing-root">
                <div className="noise-layer" />
                <div className="glow-orb glow-a" />
                <div className="glow-orb glow-b" />
                <div className="glow-orb glow-c" />

                <div className="container">
                    <header className="topbar">
                        <div className="brand">
                            <div className="brand-logo-box">
                                <Image
                                    src="/logo.png"
                                    alt="Logo da empresa"
                                    width={40}
                                    height={40}
                                    style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '40px' }}
                                    priority
                                />
                            </div>

                            <div>
                                <div className="brand-overline">MVP de automação industrial</div>
                                <div className="brand-title">Portal de Roteirização Inteligente</div>
                            </div>
                        </div>

                        <nav className="nav">
                            <a href="#arquitetura" className="nav-link">Arquitetura</a>
                            <a href="#fluxo" className="nav-link">Fluxo</a>
                            <a href="#modulos" className="nav-link">Módulos</a>
                            <a href="#prazo-investimento" className="nav-link">Prazo & Investimento</a>
                            <a href="#mvp" className="nav-link">MVP</a>
                            <Link href="/admin" className="btn-primary">Acessar Portal</Link>
                        </nav>
                    </header>
                </div>

                <section className="hero">
                    <div className="container">
                        <div className="hero-grid">
                            <div className="hero-left">
                                <div className="hero-chip">
                                    <span>Desenho técnico 2D</span>
                                    <span>→</span>
                                    <span>Análise automatizada</span>
                                    <span>→</span>
                                    <span>Roteiro de fabricação</span>
                                </div>

                                <h1 className="hero-title">
                                    Transforme desenhos técnicos em{' '}
                                    <span className="hero-gradient">roteiros de fabricação</span>{' '}
                                    com inteligência aplicada ao processo industrial.
                                </h1>

                                <p className="hero-text">
                                    Uma solução web para gestão, processamento e geração assistida de roteiros de fabricação
                                    com base na leitura de desenhos técnicos em imagem, combinando interface em{' '}
                                    <strong style={{ color: '#fff' }}>Next.js</strong>, operação em{' '}
                                    <strong style={{ color: '#fff' }}>Node.js</strong>, persistência em{' '}
                                    <strong style={{ color: '#fff' }}>MongoDB</strong> e um motor técnico em{' '}
                                    <strong style={{ color: '#fff' }}>Python</strong>.
                                </p>

                                <div className="hero-actions">
                                    <Link href="/admin" className="btn-primary">
                                        Entrar no Portal
                                    </Link>
                                    <a href="#modulos" className="btn-secondary">
                                        Explorar módulos
                                    </a>
                                </div>

                                <div className="hero-mini-grid">
                                    <div className="mini-card">
                                        <div className="mini-title">Análise por família</div>
                                        <div className="mini-text">
                                            Cada família de peça direciona a estratégia de leitura mais adequada no motor técnico.
                                        </div>
                                    </div>
                                    <div className="mini-card">
                                        <div className="mini-title">Roteirização assistida</div>
                                        <div className="mini-text">
                                            O sistema propõe o roteiro com base nas regras operacionais cadastradas no portal.
                                        </div>
                                    </div>
                                    <div className="mini-card">
                                        <div className="mini-title">Integração com ERP</div>
                                        <div className="mini-text">
                                            Os roteiros podem ser revisados e enviados para cadastro automatizado no Protheus.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-right">
                                <div className="dashboard-shell">
                                    <div className="mock-top">
                                        <div className="mock-brand">
                                            <span>🧠</span>
                                            <span>Motor de análise + Portal operacional</span>
                                        </div>
                                        <div className="mock-dots">
                                            <div className="mock-dot" />
                                            <div className="mock-dot" />
                                            <div className="mock-dot" />
                                        </div>
                                    </div>

                                    <div className="mock-grid">
                                        <MockProcess
                                            badge="Entrada"
                                            color="#2563eb"
                                            title="Desenho técnico em imagem"
                                            desc="Upload do 2D, associação da família da peça e preparação do lote para processamento."
                                        />
                                        <MockProcess
                                            badge="Motor técnico"
                                            color="#06b6d4"
                                            title="Interpretação com Python"
                                            desc="Leitura da imagem, identificação de características relevantes e retorno de dados estruturados."
                                        />
                                        <MockProcess
                                            badge="Inteligência de negócio"
                                            color="#8b5cf6"
                                            title="Regras de roteirização"
                                            desc="Relação entre processos, máquinas elegíveis, sequência operacional e fórmulas de tempo."
                                        />
                                        <MockProcess
                                            badge="Saída"
                                            color="#22c55e"
                                            title="Roteiro sugerido"
                                            desc="Revisão manual, ajuste das etapas e envio para o ERP de forma controlada."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="arquitetura" className="section">
                    <div className="container">
                        <div className="section-header">
                            <div className="eyebrow">Arquitetura da solução</div>
                            <h2 className="section-title">Quatro tecnologias compondo a base do MVP</h2>
                            <p className="section-subtitle">
                                A proposta separa com clareza interface, operação, persistência de dados e inteligência técnica,
                                mantendo a solução organizada, escalável e preparada para evolução futura.
                            </p>
                        </div>

                        <div className="arch-grid">
                            <ArchCard
                                index="01"
                                title="Frontend em Next.js"
                                text="Responsável pela interface, navegação, visualização dos módulos e operação do portal."
                            />
                            <ArchCard
                                index="02"
                                title="Backend em Node.js"
                                text="Responsável pela gestão dos dados, fluxo operacional, integrações e controle dos processamentos."
                            />
                            <ArchCard
                                index="03"
                                title="Banco em MongoDB"
                                text="Responsável pela persistência dos cadastros, arquivos processados, roteiros gerados e histórico operacional."
                            />
                            <ArchCard
                                index="04"
                                title="Motor técnico em Python"
                                text="Responsável pela leitura das imagens, interpretação dos desenhos técnicos e retorno dos dados estruturados para geração do roteiro."
                            />
                        </div>

                        <div className="info-card" style={{ marginBottom: 22 }}>
                            <div className="info-label">Stack principal</div>
                            <h2 className="info-title">Tecnologias previstas para a solução</h2>
                            <p className="info-text" style={{ marginBottom: 18 }}>
                                A arquitetura combina tecnologias modernas e aderentes ao objetivo do MVP, equilibrando
                                experiência de uso, produtividade de desenvolvimento, flexibilidade operacional e capacidade
                                técnica para processamento das imagens.
                            </p>

                            <div className="stack-grid">
                                <StackLogo src="/next.png" alt="Next.js" titulo="Next.js" />
                                <StackLogo src="/node.png" alt="Node.js" titulo="Node.js" />
                                <StackLogo src="/mongo.png" alt="MongoDB" titulo="MongoDB" />
                                <StackLogo src="/python.png" alt="Python" titulo="Python" />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="fluxo" className="section">
                    <div className="container">
                        <div className="section-header">
                            <div className="eyebrow">Fluxo operacional</div>
                            <h2 className="section-title">Do desenho técnico ao roteiro inicial</h2>
                            <p className="section-subtitle">
                                O sistema organiza o processamento em etapas claras, rastreáveis e assistidas,
                                permitindo que a análise técnica se converta em produção com contexto real.
                            </p>
                        </div>

                        <div className="flow-grid">
                            {etapas.map((item) => (
                                <div className="flow-card" key={item.numero}>
                                    <div className="flow-number">{item.numero}</div>
                                    <h3 className="flow-title">{item.titulo}</h3>
                                    <p className="flow-text">{item.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="modulos" className="section">
                    <div className="container">
                        <div className="section-header">
                            <div className="eyebrow">Módulos do portal</div>
                            <h2 className="section-title">Sete áreas para sustentar a operação do MVP</h2>
                            <p className="section-subtitle">
                                Os cadastros e áreas operacionais formam a base que permite transformar análise
                                técnica em um roteiro aderente à realidade da fábrica.
                            </p>
                        </div>

                        <div className="module-grid">
                            {modulos.map((item) => (
                                <div className="module-card" key={item.titulo}>
                                    <div className="module-icon">{item.icone}</div>
                                    <h3 className="module-title">{item.titulo}</h3>
                                    <p className="module-text">{item.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="two-col">
                            <div className="info-card">
                                <div className="info-label">Lógica de análise</div>
                                <h2 className="info-title">A inteligência fica concentrada no motor técnico</h2>
                                <p className="info-text">
                                    Durante o processamento, os arquivos recebem a informação da família de peças.
                                    A partir dessa família, o job em Python escolhe internamente a estratégia mais
                                    adequada para leitura da imagem, interpretação dos dados e identificação das
                                    características relevantes para fabricação.
                                </p>
                            </div>

                            <div className="info-card">
                                <div className="info-label">Regras de roteirização</div>
                                <h2 className="info-title">
                                    A análise vira produção com contexto industrial real
                                </h2>
                                <p className="info-text">
                                    Após a interpretação do desenho, o portal aplica as regras cadastradas para
                                    relacionar características da peça, processos aplicáveis, sequência das operações,
                                    máquinas elegíveis e fórmulas de tempo, compondo o roteiro inicial de fabricação.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="prazo-investimento" className="section">
                    <div className="container">
                        <div className="section-header">
                            <div className="eyebrow">Prazo e investimento</div>
                            <h2 className="section-title">Estimativa inicial para desenvolvimento do MVP</h2>
                            <p className="section-subtitle">
                                Considerando uma dedicação parcial ao projeto, a proposta abaixo representa uma estimativa
                                inicial para construção do MVP funcional e operacional.
                            </p>
                        </div>

                        <div className="prazo-grid">
                            <div className="prazo-card">
                                <div className="info-label">Premissas consideradas</div>
                                <h2 className="info-title">Escopo inicial com dedicação de 16h semanais</h2>
                                <p className="info-text">
                                    A estimativa considera o desenvolvimento de um MVP com foco em fluxo controlado de arquivos,
                                    análise assistida das imagens, aplicação das regras de roteirização, geração de roteiros iniciais
                                    e interface operacional para revisão antes da integração com o ERP.
                                </p>

                                <div className="prazo-stats">
                                    <div className="prazo-stat">
                                        <div className="prazo-stat-label">Valor hora</div>
                                        <div className="prazo-stat-value">R$ {valorHora}</div>
                                        <div className="prazo-stat-sub">Cobrança por hora técnica trabalhada</div>
                                    </div>

                                    <div className="prazo-stat">
                                        <div className="prazo-stat-label">Esforço semanal</div>
                                        <div className="prazo-stat-value">{horasSemana}h</div>
                                        <div className="prazo-stat-sub">Dedicação semanal estimada ao projeto</div>
                                    </div>

                                    <div className="prazo-stat">
                                        <div className="prazo-stat-label">Prazo estimado</div>
                                        <div className="prazo-stat-value">{semanasEstimadas} semanas</div>
                                        <div className="prazo-stat-sub">Previsão inicial para conclusão do MVP</div>
                                    </div>

                                    <div className="prazo-stat">
                                        <div className="prazo-stat-label">Investimento estimado</div>
                                        <div className="prazo-stat-value">
                                            {valorTotal.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </div>
                                        <div className="prazo-stat-sub">
                                            Baseado em {horasTotais} horas estimadas de desenvolvimento
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="prazo-card">
                                <div className="info-label">Observação importante</div>
                                <h2 className="info-title">Estimativa inicial sujeita a ajuste ao longo do projeto</h2>
                                <p className="info-text">
                                    Como o modelo de contratação é baseado em hora técnica, o prazo total e o investimento final
                                    poderão variar conforme a evolução do projeto e o nível de clareza obtido durante a execução.
                                    À medida que avançarmos e tivermos mais certeza sobre o comportamento da solução, complexidade
                                    real das análises, regras produtivas e necessidades de integração, essa estimativa poderá ser
                                    ajustada de forma transparente.
                                </p>

                                <div className="prazo-alerta">
                                    A estimativa apresentada deve ser entendida como uma previsão inicial para o escopo do MVP.
                                    Conforme o projeto evoluir, o esforço total poderá ser ajustado tanto para mais quanto para menos,
                                    de acordo com as definições consolidadas, volume de exceções identificado e grau de refinamento
                                    necessário em cada etapa.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="mvp" className="section">
                    <div className="container">
                        <div className="section-header">
                            <div className="eyebrow">Objetivo do MVP</div>
                            <h2 className="section-title">Validar a proposta técnica em ambiente real</h2>
                            <p className="section-subtitle">
                                A primeira etapa busca automatizar a parte mais repetitiva, estruturável e operacional
                                do processo, sem tentar eliminar toda validação humana desde o início.
                            </p>
                        </div>

                        <div className="mvp-grid">
                            <div className="mvp-card">
                                <h3 className="mvp-card-title">O que o MVP busca entregar</h3>
                                <ul className="mvp-list">
                                    <li>Organização dos desenhos em fluxo controlado</li>
                                    <li>Processamento assistido por família de peça</li>
                                    <li>Interpretação automatizada das imagens</li>
                                    <li>Aplicação das regras de roteirização</li>
                                    <li>Geração de roteiros iniciais com tempos estimados</li>
                                    <li>Revisão humana antes da integração final com o ERP</li>
                                </ul>
                            </div>

                            <div className="mvp-card">
                                <h3 className="mvp-card-title">Benefícios esperados</h3>
                                <ul className="mvp-list">
                                    {beneficios.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-wrap">
                    <div className="container">
                        <div className="cta-box">
                            <div className="cta-content">
                                <div>
                                    <div className="cta-kicker">Call to action</div>
                                    <h2 className="cta-title">
                                        Explore o portal e visualize o MVP em funcionamento.
                                    </h2>
                                    <p className="cta-text">
                                        Acesse a área administrativa para navegar pelos módulos, entender o fluxo de
                                        processamento e visualizar como a solução transforma desenhos técnicos em
                                        roteiros de fabricação assistidos.
                                    </p>
                                    <div className="footer-note">
                                        Demonstração conceitual da solução • foco em operação, análise técnica e roteirização
                                    </div>
                                </div>

                                <div className="cta-actions">
                                    <Link href="/admin" className="btn-primary">
                                        Acessar Portal /admin
                                    </Link>
                                    <a href="#arquitetura" className="btn-secondary">
                                        Ver arquitetura
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer
                    style={{
                        width: '100%',
                        padding: '28px 20px',
                        marginTop: '50px',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '1240px',
                            margin: '0 auto',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            paddingTop: '22px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#91a7ca',
                            fontSize: '14px',
                            lineHeight: '1.7',
                        }}
                    >
                        <span>
                            Desenvolvido por{' '}
                            <a
                                href="https://siconem.com"
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    color: '#ffffff',
                                    fontWeight: '800',
                                    textDecoration: 'none',
                                }}
                            >
                                siconem.com
                            </a>
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}

function ArchCard({ index, title, text }) {
    return (
        <div className="arch-card">
            <div className="arch-index">{index}</div>
            <h3 className="arch-title">{title}</h3>
            <p className="arch-text">{text}</p>
        </div>
    );
}

function MockProcess({ badge, color, title, desc }) {
    return (
        <div className="mock-process">
            <div
                className="mock-badge"
                style={{
                    background: `${color}20`,
                    color,
                    border: `1px solid ${color}40`,
                }}
            >
                {badge}
            </div>
            <div className="mock-title">{title}</div>
            <div className="mock-desc">{desc}</div>
        </div>
    );
}

function StackLogo({ src, alt, titulo }) {
    return (
        <div className="stack-logo-card">
            <div className="stack-logo-wrap">
                <Image
                    src={src}
                    alt={alt}
                    width={72}
                    height={72}
                    style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '72px' }}
                />
            </div>
            <div className="stack-title">{titulo}</div>
        </div>
    );
}