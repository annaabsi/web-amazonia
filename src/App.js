import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileBoard from './components/ProfileBoard';
import CandidateProfile from './components/CandidateProfile';
import Header from './components/Header';
import HeaderGeneral from './components/Header-General';
import FooterGeneral from './components/Footer-General';
import IntroText from './components/IntroText';
import Footer from './components/Footer';
import { obtenerDatosRiesgo, formatNameForURL } from './utils/riskUtils';
import './App.css';

function AppContent( { isHomePage } ) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/web-amazonia/perfiles.json')
      .then(response => response.json())
      .then(data => {
        // En la transformación de datos dentro del useEffect:
        const transformed = data.map(profile => {
          // Ahora pasamos solo el número de delitos, no la categoría
          const riesgo = obtenerDatosRiesgo(profile["número de delitos"]);
          return {
            dni: profile.dni,
            name: profile["nombres y apellidos del alcalde"],
            position: profile.cargo,
            party: profile["partido político postulado"],
            ...riesgo,
            crimeCount: profile["número de delitos"],
            avatar: profile.avatar,
            departamento: profile.departamento,
            provincia: profile.provincia,
            distrito: profile.distrito,
            urlName: formatNameForURL(profile["nombres y apellidos del alcalde"])
          };
        });
        setProfiles(transformed);
      })
      .catch(error => {
        console.error('Error cargando los datos:', error);
      });
  }, []);

  return (
    <div>
      <HeaderGeneral />
      {isHomePage && (
        <div>
          {/* Aquí van los elementos extra para la página principal */}
          <Header />
          <IntroText />
        </div>
      )}
      <ProfileBoard profiles={profiles} />
      {isHomePage && (
        <div>
          <a href='https://almargen-media.com/metodologia-y-transparencia-como-elaboramos-buscaamazonia/'>
            <div className='nota-home'>
              <img src="https://almargen-media.com/wp-content/uploads/2025/09/Metodologia-y-transparencia-%C2%BFcomo-elaboramos-BuscaAmazonia.webp" alt="Como elaboramos busca amazonia" className='logo-amazonia' />
              <div>
                <p>Metodología y transparencia: ¿cómo elaboramos BuscaAmazonía?</p>
                <span>ver más</span>
              </div>
            </div>
          </a>
        </div>
      )}
      {!isHomePage && (
        <div className="buscador-texto">
          <p>Conoce más en: <a href='https://almargen-media.com/web-amazonia/'>https://almargen-media.com/web-amazonia/</a></p>
        </div>
      )}
      <Footer />
      <FooterGeneral />
    </div>
  );
}

function App() {
  return (
    <Router basename="/web-amazonia">
      <div className="app">
        <Routes>
          <Route path="/" element={<AppContent isHomePage={true} />} />
          <Route path="/buscador" element={<AppContent isHomePage={false} />} />
          <Route path="/buscador/:name" element={<CandidateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;