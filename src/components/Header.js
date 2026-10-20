
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

const handleSubmit = event => {
  event.preventDefault();

  const query = search.trim();

  const regiones = [
    'Amazonas',
    'Loreto',
    'San Martín',
    'Ucayali',
    'Madre de Dios'
  ];

  const region = regiones.find(
    nombre =>
      nombre.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase() ===
      query.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
  );

  if (region) {
    navigate(`/buscador?departamento=${encodeURIComponent(region)}`);
  } else if (query) {
    navigate(`/buscador?search=${encodeURIComponent(query)}`);
  } else {
    navigate('/buscador');
  }
};

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span>Busca</span>
          <br />
          <span>Amazonía</span>
        </h1>

        <p className="header-subtitle">
          Rastrea autoridades, territorios y conexiones
          que pueden revelar cómo se disputa el poder
          detrás de los intereses en la Amazonía Peruana.
        </p>

        <form className="ba-search" onSubmit={handleSubmit}>
          <svg
            className="ba-search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="10.8"
              cy="10.8"
              r="6.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M15.5 15.5 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <input
            type="search"
            className="ba-search-input"
            placeholder="Busca un alcalde, región o provincia"
            aria-label="Busca un alcalde, región o provincia"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <button className="ba-search-button" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
