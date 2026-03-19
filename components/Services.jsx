function Services() {
  const services = [
    {
      title: 'Sistemas a Medida',
      description: 'Desarrollamos sistemas informáticos personalizados que se adaptan perfectamente a los procesos de tu empresa',
      features: [
        'Análisis de requerimientos',
        'Desarrollo personalizado',
        'Integración con sistemas existentes',
        'Soporte y mantenimiento'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      title: 'Diseño Web',
      description: 'Creamos páginas web modernas, responsivas y optimizadas que destacan tu marca en el mundo digital',
      features: [
        'Diseño responsivo',
        'Optimización SEO',
        'Alta velocidad de carga',
        'Experiencia de usuario'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      )
    },
    {
      title: 'Consultoría',
      description: 'Asesoramos en la digitalización de tu negocio con estrategias tecnológicas efectivas y sostenibles',
      features: [
        'Auditoría tecnológica',
        'Estrategia digital',
        'Optimización de procesos',
        'Capacitación de personal'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    }
  ]

  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">Soluciones tecnológicas adaptadas a tus necesidades</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
