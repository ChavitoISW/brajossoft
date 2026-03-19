'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import '../styles/globals.css'

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const highlightNavigation = () => {
      const scrollY = window.pageYOffset
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 100
        const sectionId = section.getAttribute('id')
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', highlightNavigation)
    return () => window.removeEventListener('scroll', highlightNavigation)
  }, [])

  return (
    <>
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
