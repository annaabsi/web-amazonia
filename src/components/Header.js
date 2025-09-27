import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">BUSCA AMAZONÍA</h1>
        <p className="header-subtitle">¿Quiénes protegen la Amazonia?</p>
        <p className="header-bajada">Al Margen presenta un buscador web que permite rastrear los vínculos de gobernadores regionales y alcaldes provinciales y distritales para transparentar cómo el poder local —en regiones como Amazonas, San Martín, Loreto, Ucayali y Madre de Dios— se entrelaza con la destrucción de bosques y ríos. Porque detrás de cada concesión irregular o de cada omisión deliberada, lo que se juega no es solo la legalidad: es el futuro de la Amazonía.</p>
      </div>
    </header>
  );
};

export default Header;