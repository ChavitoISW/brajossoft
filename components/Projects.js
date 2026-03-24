function Projects() {
  const projects = [
    {
      title: 'RentAll - Sistema de Alquiler',
      description: 'Plataforma completa de gestión de rentas con Next.js y SQLite. Incluye gestión de usuarios, artículos, categorías y control de inventario en tiempo real',
      icon: '/RentAll_logo.png',
      gradient: 'linear-gradient(135deg, #0066b3 0%, #3399cc 100%)',
      tags: ['Next.js', 'SQLite', 'TypeScript', 'API REST'],
      downloadUrl: '/docs/Ficha Tecnica.pdf'
    },
    
   
  ]

  return (
    <section className="projects" id="proyectos">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-subtitle">Algunos de nuestros trabajos más recientes</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-placeholder" style={{ background: project.icon.startsWith('/') ? 'transparent' : project.gradient }}>
                {project.icon.startsWith('/') ? (
                  <img src={project.icon} alt={project.title} className="project-logo" />
                ) : (
                  <span className="project-icon">{project.icon}</span>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                {project.downloadUrl && (
                  <a 
                    href={project.downloadUrl} 
                    download 
                    className="project-download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    Descargar Ficha Técnica
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
