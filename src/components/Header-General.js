import React, { useState, useEffect } from 'react';
import './Header-General.css';

const HeaderGeneral = ({ isScrolledProp = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isScrolledProp !== null) {
      setIsScrolled(isScrolledProp);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolledProp]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`custom-header ${isScrolled ? 'scrolled' : ''}`}>
      <a className="neve-skip-link show-on-focus" href="#content">
        Skip to content
      </a>
      
      <div className="menu-left">
        <button className="menu-toggle" aria-label="Abrir menú" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
        <nav className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="https://almargen-media.com/quienes-somos/">¿Quiénes somos?</a></li>
            <li><a href="https://almargen-media.com/contacto/">Contacto</a></li>
            <li><a href="https://almargen-media.com/suscripcion/">Suscripción</a></li>
            <li><a href="https://almargen-media.com/seguridad/">Seguridad</a></li>
            <li><a href="https://almargen-media.com/delitos-ambientales/">Delitos ambientales</a></li>
            <li><a href="https://almargen-media.com/sin-evidencia/">Sin Evidencia</a></li>
            <li><a href="https://almargen-media.com/especiales/">Especiales</a></li>
            <li><a href="https://almargen-media.com/opinion/">Opinión</a></li>
          </ul>
        </nav>
      </div>
      
      <div className="logo-center">
        <a href="https://almargen-media.com/">
          <img 
            src={isScrolled 
              ? "https://almargen-media.com/wp-content/uploads/2025/05/LOGO_RGB_1-1024x454.webp" 
              : "https://almargen-media.com/wp-content/uploads/2025/04/LOGO_RGB_2-1024x454.webp"} 
            alt="Logo Al Margen" 
          />
        </a>
      </div>
      
      <div className="social-right">
        <a href="https://www.instagram.com/almargen_periodismo/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/@almargen_periodismo" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="https://x.com/almargen_pe" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-x-twitter"></i>
        </a>
        <a href="https://www.facebook.com/people/Al-Margen-Periodismo/61566487709727/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube"></i>
        </a>
      </div>
    </header>
  );
};

export default HeaderGeneral;