import React from 'react';
import './Footer-General.css';

const FooterGeneral = () => {
  return (
    <footer className="footer-general">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">
            <a href="https://almargen-media.com/">
              <img 
                width="1024" 
                height="454" 
                src="https://almargen-media.com/wp-content/uploads/2025/04/LOGO_RGB_2-1024x454.webp" 
                alt="Almargen Media" 
                className="footer-logo-img"
              />
            </a>
          </div>
          <div className="footer-description">
            <p>Un medio de comunicación que investiga la criminalidad a escala urbana, rural y transfronteriza en Perú y América Latina.</p>
          </div>
          <div className="footer-links">
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a href="https://almargen-media.com/quienes-somos/" target="_blank" rel="noopener noreferrer">
                  <span className="footer-link-text">Sobre nosotros</span>
                </a>
              </li>
              <li className="footer-link-item">
                <span className="footer-link-text">contacto@almargen-media.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-column">
          <div className="footer-social">
            <div className="social-icons-wrapper" role="list">
              <span className="social-icon-item" role="listitem">
                <a className="social-icon-link" href="https://www.instagram.com/almargen_periodismo/" target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">Instagram</span>
                  <i className="fab fa-instagram"></i>
                </a>
              </span>
              <span className="social-icon-item" role="listitem">
                <a className="social-icon-link" href="https://www.tiktok.com/@almargen_periodismo" target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">Tiktok</span>
                  <i className="fab fa-tiktok"></i>
                </a>
              </span>
              <span className="social-icon-item" role="listitem">
                <a className="social-icon-link" href="https://x.com/almargen_pe" target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">X-twitter</span>
                  <i className="fab fa-x-twitter"></i>
                </a>
              </span>
              <span className="social-icon-item" role="listitem">
                <a className="social-icon-link" href="https://www.facebook.com/people/Al-Margen-Periodismo/61566487709727/" target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">Facebook</span>
                  <i className="fab fa-facebook"></i>
                </a>
              </span>
              <span className="social-icon-item" role="listitem">
                <a className="social-icon-link" href="#" target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">Youtube</span>
                  <i className="fab fa-youtube"></i>
                </a>
              </span>
            </div>
          </div>
          <div className="footer-partners">
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a href="https://amazonunderworld.org/es.html" target="_blank" rel="noopener noreferrer">
                  <span className="footer-link-text">En alianza con Amazon Underworld</span>
                </a>
              </li>
              <li className="footer-link-item">
                <a href="https://sembramedia.org/gni-startups-lab-peru-y-uruguay/" target="_blank" rel="noopener noreferrer">
                  <span className="footer-link-text">Con el apoyo de Sembramedia.</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGeneral;