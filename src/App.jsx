import { useMemo, useState, useEffect, useRef } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0b;
    --bg2: #111114;
    --bg3: #16161a;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.15);
    --text: #f0eee8;
    --muted: #8a8790;
    --accent: #b8ff6e;
    --accent2: #6ebaff;
    --accent3: #ff8c6e;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2.5rem;
    background: rgba(10,10,11,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .nav-brand {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent);
    letter-spacing: 0.05em;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-links a {
    font-size: 0.85rem;
    color: var(--muted);
    text-decoration: none;
    font-family: var(--font-mono);
    letter-spacing: 0.03em;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--text); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 2.5rem 5rem;
    position: relative;
    overflow: hidden;
  }

  .hero-bg-text {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-display);
    font-size: clamp(80px, 16vw, 220px);
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.04);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 2rem;
    height: 1px;
    background: var(--accent);
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    max-width: 900px;
  }

  .hero h1 span { color: var(--accent); }

  .hero-lead {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 520px;
    margin-bottom: 2.5rem;
    font-weight: 300;
    line-height: 1.75;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    padding: 0.75rem 1.75rem;
    border-radius: 2px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-block;
  }

  .btn-primary {
    background: var(--accent);
    color: #0a0a0b;
    font-weight: 500;
  }

  .btn-primary:hover { background: #d4ff99; transform: translateY(-1px); }

  .btn-ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border-hover);
  }

  .btn-ghost:hover { border-color: var(--text); }

  .scroll-hint {
    position: absolute;
    bottom: 2.5rem; right: 2.5rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .scroll-hint::after {
    content: '';
    display: block;
    width: 1px;
    height: 3rem;
    background: var(--muted);
  }

  /* SECTIONS */
  .section {
    padding: 7rem 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .section-eyebrow::before {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1px;
    background: var(--accent);
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.1;
    margin-bottom: 3.5rem;
    max-width: 600px;
  }

  /* ABOUT / IDENTITY */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .info-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2rem;
    transition: border-color 0.2s;
  }

  .info-card:hover { border-color: var(--border-hover); }

  .info-card h3 {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }

  .info-list { list-style: none; }

  .info-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
    color: var(--muted);
  }

  .info-list li:last-child { border-bottom: none; }

  .info-list li strong {
    color: var(--text);
    font-weight: 400;
    min-width: 80px;
    font-size: 0.85rem;
    font-family: var(--font-mono);
  }

  /* RECRUITER CARD */
  .recruiter-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2rem;
    transition: border-color 0.2s;
  }

  .recruiter-card:hover { border-color: var(--border-hover); }

  .recruiter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .recruiter-header h3 {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .toggle-btn {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.35rem 0.85rem;
    border-radius: 100px;
    border: 1px solid var(--border-hover);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.03em;
  }

  .toggle-btn.active {
    background: var(--accent);
    border-color: var(--accent);
    color: #0a0a0b;
  }

  .toggle-btn:hover { color: var(--text); border-color: var(--text); }
  .toggle-btn.active:hover { background: #d4ff99; }

  .recruiter-list { list-style: none; }

  .recruiter-list li {
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
    color: var(--muted);
    padding-left: 1.25rem;
    position: relative;
    line-height: 1.5;
  }

  .recruiter-list li:last-child { border-bottom: none; }

  .recruiter-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 0.7rem;
    top: 0.75rem;
  }

  /* STACK */
  .stack-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .stack-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2rem;
    transition: border-color 0.2s, transform 0.2s;
  }

  .stack-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }

  .stack-area {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .stack-icon {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .stack-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: var(--text);
  }

  .chip-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chip-list li {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 0.3rem 0.75rem;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--muted);
    letter-spacing: 0.02em;
    transition: all 0.15s;
  }

  .chip-list li:hover {
    background: rgba(184,255,110,0.06);
    border-color: rgba(184,255,110,0.2);
    color: var(--accent);
  }

  /* PROJECTS */
  .project-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .project-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2rem;
    transition: border-color 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .project-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }
  .project-card:hover::before { opacity: 1; }

  .project-num {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: rgba(184,255,110,0.4);
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .project-subtitle {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--accent2);
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .project-title {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--text);
    line-height: 1.25;
  }

  .project-desc {
    font-size: 0.875rem;
    color: var(--muted);
    margin-bottom: 1.5rem;
    line-height: 1.65;
    font-weight: 300;
  }

  .project-highlights {
    list-style: none;
    border-top: 1px solid var(--border);
    padding-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .project-highlights li {
    font-size: 0.8rem;
    color: var(--muted);
    padding-left: 1rem;
    position: relative;
    font-family: var(--font-mono);
  }

  .project-highlights li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--border-hover);
    font-size: 0.65rem;
    top: 0.1rem;
  }

  /* CONTACT */
  .contact-section {
    padding: 7rem 2.5rem;
    background: var(--bg2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .contact-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s;
    color: var(--text);
  }

  .contact-link:hover {
    border-color: var(--border-hover);
    transform: translateX(4px);
  }

  .contact-link-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.2rem;
  }

  .contact-link-value {
    font-size: 0.9rem;
    color: var(--text);
  }

  .contact-link-icon {
    font-size: 1.1rem;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .contact-cta h2 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
  }

  .contact-cta h2 span { color: var(--accent); }

  .contact-cta p {
    font-size: 0.9rem;
    color: var(--muted);
    margin-bottom: 2rem;
    line-height: 1.7;
    font-weight: 300;
    max-width: 340px;
  }

  /* FOOTER */
  .footer {
    padding: 2rem 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer p {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .footer-dot {
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    display: inline-block;
    margin: 0 0.5rem;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* REVEAL */
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .nav { padding: 1rem 1.25rem; }
    .nav-links { display: none; }
    .hero { padding: 0 1.25rem 4rem; }
    .section { padding: 5rem 1.25rem; }
    .about-grid,
    .stack-grid,
    .project-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .contact-section { padding: 5rem 1.25rem; }
    .hero-bg-text { display: none; }
    .footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(true)

  const stack = useMemo(() => [
    {
      icon: '⬡',
      area: 'Backend',
      title: 'Backend',
      skills: ['Python', 'Laravel (PHP)', 'Java', 'C#', 'PostgreSQL', 'MySQL'],
    },
    {
      icon: '◈',
      area: 'Frontend',
      title: 'Frontend',
      skills: ['React', 'JavaScript', 'Angular', 'Ionic'],
    },
    {
      icon: '⬕',
      area: 'Cloud / DevOps',
      title: 'Cloud & DevOps',
      skills: [
        'AWS (EC2, S3, Route 53)',
        'VPS Administration',
        'Hostinger VPS',
        'CyberPanel',
        'DNS Configuration',
        'Domain Migration',
        'Server Deployment',
        'Linux Server Management',
        'Git / GitHub',
      ],
    },
  ], [])

  const projects = useMemo(() => [
    {
      num: '01',
      name: 'Sistema de Tiquetería',
      subtitle: 'Laravel · PostgreSQL · Angular',
      description: 'Plataforma de venta de tickets online con generación de códigos QR, gestión de eventos, pagos y facturación.',
      highlights: ['Venta de entradas online', 'Generación automática de QR', 'Gestión de eventos y zonas', 'Facturación y métodos de pago', 'Panel administrativo'],
    },
    {
      num: '02',
      name: 'Migración y Administración VPS',
      subtitle: 'Linux · Hostinger VPS · CyberPanel',
      description: 'Migración completa de sitios web, configuración de servicios productivos y fortalecimiento de seguridad base.',
      highlights: ['Configuración de VPS y CyberPanel', 'Gestión de usuarios y dominios', 'Configuración DNS y migración de sitios', 'Administración Linux y hardening básico'],
    },
    {
      num: '03',
      name: 'Plataforma para Ceagrodex',
      subtitle: 'Laravel · PostgreSQL',
      description: 'Desarrollo y soporte de módulos backend para entorno empresarial, orientado a rendimiento y estabilidad.',
      highlights: ['Desarrollo backend', 'Optimización de base de datos', 'Integración de módulos', 'Soporte técnico y mejoras de rendimiento'],
    },
    {
      num: '04',
      name: 'Automatización con Python',
      subtitle: 'Python · APIs',
      description: 'Scripts para automatización de tareas técnicas, validación de IPs y procesamiento de datos.',
      highlights: ['Automatización de pruebas', 'Scripts de validación', 'Procesamiento de datos', 'Integración con APIs'],
    },
  ], [])

  const recruiterSummary = [
    'Perfil orientado a backend y despliegue de aplicaciones en producción.',
    'Experiencia en React, Python, Laravel y bases de datos relacionales.',
    'Conocimiento práctico en VPS, DNS, migraciones y administración Linux.',
  ]

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#inicio" className="nav-brand">ODMM.DEV</a>
        <ul className="nav-links">
          <li><a href="#inicio">inicio</a></li>
          <li><a href="#stack">stack</a></li>
          <li><a href="#proyectos">proyectos</a></li>
          <li><a href="#contacto">contacto</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="inicio" className="hero">
        <div className="hero-bg-text" aria-hidden="true">SOFTWARE</div>

        <div className="hero-eyebrow">
          Ingeniería de Software · Colombia
        </div>

        <h1>
          Oscar<br />
          <span>Mancipe</span><br />
          Molina
        </h1>

        <p className="hero-lead">
          Estudiante de Ingeniería de Software en FET Neiva. Desarrollo web full-stack,
          administración de servidores VPS y automatización de procesos.
        </p>

        <div className="hero-actions">
          <a href="mailto:oscarmancipedev@gmail.com" className="btn btn-primary">
            Contactar
          </a>
          <a
            href="https://github.com/Osdam"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub →
          </a>
        </div>

        <div className="scroll-hint" aria-hidden="true">scroll</div>
      </section>

      {/* ABOUT */}
      <section id="sobre-mi" style={{ padding: '7rem 2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <RevealSection>
          <p className="section-eyebrow">Sobre mí</p>
          <h2 className="section-title">Perfil profesional</h2>
        </RevealSection>

        <RevealSection>
          <div className="about-grid">
            <div className="info-card">
              <h3>Información</h3>
              <ul className="info-list">
                <li><strong>Nombre</strong> Oscar Daniel Mancipe Molina</li>
                <li><strong>Carrera</strong> Ingeniería de Software (en curso)</li>
                <li><strong>Universidad</strong> Fundación Escuela Tecnológica de Neiva</li>
                <li><strong>Ubicación</strong> Colombia</li>
              </ul>
            </div>

            <div className="recruiter-card">
              <div className="recruiter-header">
                <h3>Resumen ejecutivo</h3>
                <button
                  type="button"
                  className={`toggle-btn ${recruiterMode ? 'active' : ''}`}
                  onClick={() => setRecruiterMode(v => !v)}
                  aria-pressed={recruiterMode}
                >
                  {recruiterMode ? 'Breve ✓' : 'Detallado'}
                </button>
              </div>

              {recruiterMode ? (
                <ul className="recruiter-list">
                  {recruiterSummary.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.7', fontWeight: 300 }}>
                  Perfil con capacidad para participar en ciclos completos: desde construcción de
                  software (frontend y backend) hasta despliegue, migración y estabilización de
                  infraestructura para ambientes de producción.
                </p>
              )}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* STACK */}
      <section id="stack" className="section">
        <RevealSection>
          <p className="section-eyebrow">Stack tecnológico</p>
          <h2 className="section-title">Capacidades para desarrollo y producción</h2>
        </RevealSection>

        <RevealSection>
          <div className="stack-grid">
            {stack.map(cat => (
              <div className="stack-card" key={cat.area}>
                <p className="stack-area">{cat.area}</p>
                <p className="stack-title">{cat.title}</p>
                <ul className="chip-list">
                  {cat.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* PROJECTS */}
      <section id="proyectos" className="section">
        <RevealSection>
          <p className="section-eyebrow">Proyectos destacados</p>
          <h2 className="section-title">Experiencia aplicada en software e infraestructura</h2>
        </RevealSection>

        <RevealSection>
          <div className="project-grid">
            {projects.map(project => (
              <div className="project-card" key={project.name}>
                <p className="project-num">{project.num}</p>
                <p className="project-subtitle">{project.subtitle}</p>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* CONTACT */}
      <div id="contacto" className="contact-section">
        <RevealSection className="contact-inner">
          <div className="contact-grid">
            <div className="contact-cta">
              <p className="section-eyebrow">Contacto</p>
              <h2>Disponible para<br /><span>oportunidades</span></h2>
              <p>
                Abierto a prácticas profesionales, proyectos freelance y
                posiciones de desarrollo. Respondo en menos de 24 horas.
              </p>
              <a href="mailto:oscarmancipedev@gmail.com" className="btn btn-primary">
                Enviar mensaje
              </a>
            </div>

            <div className="contact-links">
              <a href="mailto:oscarmancipedev@gmail.com" className="contact-link">
                <div className="contact-link-icon">✉</div>
                <div>
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">oscarmancipedev@gmail.com</span>
                </div>
              </a>
              <a href="tel:+573215542105" className="contact-link">
                <div className="contact-link-icon">✆</div>
                <div>
                  <span className="contact-link-label">Teléfono</span>
                  <span className="contact-link-value">+57 321 554 2105</span>
                </div>
              </a>
              <a
                href="https://github.com/Osdam"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <div className="contact-link-icon">⌥</div>
                <div>
                  <span className="contact-link-label">GitHub</span>
                  <span className="contact-link-value">github.com/Osdam</span>
                </div>
              </a>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer">
          <p>Oscar Daniel Mancipe Molina</p>
          <p>
            <span className="footer-dot" aria-hidden="true" />
            Portafolio · 2026
          </p>
        </div>
      </footer>
    </>
  )
}