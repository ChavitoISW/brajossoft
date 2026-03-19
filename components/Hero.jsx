function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Transformamos tus ideas en <span className="highlight">soluciones digitales</span>
          </h1>
          <p className="hero-subtitle">
            Desarrollamos sistemas informáticos a la medida y diseñamos páginas web profesionales que impulsan tu negocio
          </p>
          <div className="hero-buttons">
            <a href="#contacto" className="btn btn-primary">Comenzar proyecto</a>
            <a href="#servicios" className="btn btn-secondary">Ver servicios</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">
            <div className="illustration-element element-1"></div>
            <div className="illustration-element element-2"></div>
            <div className="illustration-element element-3"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
