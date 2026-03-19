import { useState } from 'react'

function Header({ activeSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLinkClick = (e, target) => {
    e.preventDefault()
    const element = document.querySelector(target)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#inicio" className="logo">
              <img src="/logo.png" alt="BraJos Soft" className="logo-image" />
            </a>
            <button 
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#inicio" className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, '#inicio')}>Inicio</a></li>
              <li><a href="#servicios" className={`nav-link ${activeSection === 'servicios' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, '#servicios')}>Servicios</a></li>
              <li><a href="#nosotros" className={`nav-link ${activeSection === 'nosotros' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, '#nosotros')}>Nosotros</a></li>
              <li><a href="#proyectos" className={`nav-link ${activeSection === 'proyectos' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, '#proyectos')}>Proyectos</a></li>
              <li><a href="#contacto" className={`nav-link ${activeSection === 'contacto' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, '#contacto')}>Contacto</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
