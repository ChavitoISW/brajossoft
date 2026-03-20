function Contact() {
  return (
    <section className="contact" id="contacto">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contacto</h2>
          <p className="section-subtitle">¿Tienes un proyecto en mente? Hablemos</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-details">
                <h3 className="contact-title">Email</h3>
                <p className="contact-text">contacto@brajossoft.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-details">
                <h3 className="contact-title">Teléfono</h3>
                <p className="contact-text">+506 62787954</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="contact-details">
                <h3 className="contact-title">Ubicación</h3>
                <p className="contact-text">Alajuela, Costa Rica</p>
              </div>
            </div>
          </div>

          <div className="contact-illustration">
            <svg viewBox="0 0 500 400" className="contact-svg">
              {/* Background circles */}
              <circle cx="250" cy="200" r="150" fill="#f5f9fc" opacity="0.5"/>
              <circle cx="350" cy="100" r="80" fill="#0066b3" opacity="0.1"/>
              <circle cx="150" cy="300" r="60" fill="#ff9933" opacity="0.1"/>
              
              {/* Person */}
              <circle cx="250" cy="150" r="40" fill="#0066b3"/>
              <path d="M250 190 Q220 220 220 280 L220 330 M250 190 Q280 220 280 280 L280 330" 
                    stroke="#0066b3" strokeWidth="12" strokeLinecap="round" fill="none"/>
              <path d="M220 250 L180 280 M280 250 L320 280" 
                    stroke="#0066b3" strokeWidth="12" strokeLinecap="round" fill="none"/>
              
              {/* Message bubbles */}
              <g className="message-bubble">
                <rect x="100" y="80" width="100" height="60" rx="10" fill="#ff9933" opacity="0.8"/>
                <circle cx="130" cy="110" r="4" fill="white"/>
                <circle cx="150" cy="110" r="4" fill="white"/>
                <circle cx="170" cy="110" r="4" fill="white"/>
              </g>
              
              <g className="message-bubble-2">
                <rect x="300" y="240" width="120" height="60" rx="10" fill="#3399cc" opacity="0.8"/>
                <line x1="320" y1="260" x2="390" y2="260" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="320" y1="275" x2="380" y2="275" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="320" y1="290" x2="370" y2="290" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </g>
              
              {/* Email icon */}
              <g className="email-icon">
                <rect x="340" y="140" width="80" height="60" rx="5" fill="white" stroke="#0066b3" strokeWidth="3"/>
                <path d="M340 140 L380 170 L420 140" stroke="#0066b3" strokeWidth="3" fill="none"/>
              </g>
              
              {/* Phone icon */}
              <g className="phone-icon">
                <rect x="80" y="200" width="40" height="70" rx="8" fill="white" stroke="#ff9933" strokeWidth="3"/>
                <circle cx="100" cy="255" r="5" fill="#ff9933"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
