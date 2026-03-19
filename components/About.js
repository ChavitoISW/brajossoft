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
    }, { threshold: 0.5 })

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateStats = () => {
    const duration = 2000
    const steps = 60
    const increment = duration / steps

    let yearsCount = 0
    let projectsCount = 0
    let satisfactionCount = 0

    const interval = setInterval(() => {
      yearsCount += 5 / steps
      projectsCount += 50 / steps
      satisfactionCount += 100 / steps

      setStats({
        years: Math.min(Math.round(yearsCount), 5),
        projects: Math.min(Math.round(projectsCount), 50),
        satisfaction: Math.min(Math.round(satisfactionCount), 100)
      })

      if (yearsCount >= 5) {
        clearInterval(interval)
      }
    }, increment)
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
                <div className="stat-number">5+</div>
                <div className="stat-label">Años de experiencia</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Proyectos completados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
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
                    <span className="code-string">&quot;innovation&quot;</span>
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
