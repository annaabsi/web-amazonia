import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">BUSCA AMAZONÍA</h1>
        {/* <p className="header-subtitle">¿Quiénes protegen la Amazonia?</p> */}
        <p className="header-bajada">Al Margen presenta un buscador web que expone información pública sobre alcaldes y gobernadores de Amazonas, San Martín, Loreto, Ucayali y Madre de Dios. La herramienta permite a cualquier ciudadano rastrear si sus autoridades tienen vínculos con delitos ambientales, y dejar en evidencia cómo el poder político puede convertirse en cómplice de la devastación que amenaza el futuro de la Amazonía.</p>
      </div>
    </header>
  );
};

export default Header;