import { useState, useEffect, useRef } from 'react'

function About() {
  const [stats, setStats] = useState({ years: 0, projects: 0, satisfaction: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        animateStats()
        setHasAnimated(true)
      }
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' })

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateStats = () => {
    const duration = 2000
    const steps = 60
    const increment = duration / steps
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setStats({
        years: Math.round(5 * progress),
        projects: Math.round(50 * progress),
        satisfaction: Math.round(100 * progress)
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <section className="about" id="nosotros">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Sobre Nosotros</h2>
            <p className="about-description">
              En <strong>BraJos Soft</strong>, nos especializamos en crear soluciones tecnológicas innovadoras 
              que transforman la manera en que las empresas operan. Nuestro enfoque está centrado en entender 
              las necesidades únicas de cada cliente para desarrollar software que realmente haga la diferencia.
            </p>
            <p className="about-description">
              Con años de experiencia en desarrollo de software y diseño web, nuestro equipo está comprometido 
              en entregar productos de alta calidad que superan las expectativas. Utilizamos las últimas 
              tecnologías y mejores prácticas para garantizar soluciones robustas, escalables y eficientes.
            </p>
            <div className="about-stats" ref={statsRef}>
              <div className="stat-item">
                <div className="stat-number">{stats.years}+</div>
                <div className="stat-label">Años de experiencia</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.projects}+</div>
                <div className="stat-label">Proyectos completados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.satisfaction}%</div>
                <div className="stat-label">Clientes satisfechos</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-illustration">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                </div>
                <div className="window-content">
                  <div className="code-line">
                    <span className="code-keyword">function</span>{' '}
                    <span className="code-function">createSolution</span>
                    <span>() {'{'}</span>
                  </div>
                  <div className="code-line code-indent">
                    <span className="code-keyword">return</span>{' '}
                    <span className="code-string">'innovation'</span>
                    <span>;</span>
                  </div>
                  <div className="code-line">
                    <span>{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
