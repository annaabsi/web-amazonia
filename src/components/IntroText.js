import React from 'react';
import './IntroText.css';
import lupaIcon from './icons/lupa.png'; // Asegúrate de tener la imagen en la carpeta components

const IntroText = () => {
  return (
    <section className="intro-text">
      <div className="intro-container">
        <div className="regiones-section">
          <span className="regiones-title">
            <img src={lupaIcon} alt="Lupa" className="lupa-icon" />
            Regiones bajo análisis
          </span>
          <p className="regiones-lista">Amazonas - Madre de Dios - Loreto - San Martin - Ucayali</p>
        </div>
        <hr></hr>
        <div className="descubre-section">
          <p className="descubre-text">
            Descubre si tu alcalde o gobernador tiene investigaciones vinculadas a <span className="green-text">delitos ambientales o economías ilícitas
            que devastan la amazonía</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroText;