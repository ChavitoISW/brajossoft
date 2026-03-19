function Projects() {
  const projects = [
    {
      title: 'RentAll - Sistema de Alquiler',
      description: 'Plataforma completa de gestión de rentas con Next.js y SQLite. Incluye gestión de usuarios, artículos, categorías y control de inventario en tiempo real',
      icon: '🔑',
      gradient: 'linear-gradient(135deg, #0066b3 0%, #3399cc 100%)',
      tags: ['Next.js', 'SQLite', 'TypeScript', 'API REST']
    },
    {
      title: 'Sistema de Gestión Empresarial',
      description: 'Sistema ERP personalizado para optimizar procesos administrativos y operativos de empresas medianas',
      icon: '🏢',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      tags: ['ERP', 'Base de Datos', 'Cloud']
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
              <div className="project-placeholder" style={{ background: project.gradient }}>
                <span className="project-icon">{project.icon}</span>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
