import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateProfile from './components/CandidateProfile';
import ProfileBoard from './components/ProfileBoard';
import Header from './components/Header';
import HeaderGeneral from './components/Header-General';
import FooterGeneral from './components/Footer-General';
import Footer from './components/Footer';
import AmazoniaMap from './components/AmazoniaMap';
import { obtenerDatosRiesgo, formatNameForURL } from './utils/riskUtils';
import './App.css';

function AppContent({ isHomePage }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/busca-amazonia/perfiles.json')
      .then(response => response.json())
      .then(data => {
        const transformed = data.map(profile => {
          const riesgo = obtenerDatosRiesgo(
            profile['número de delitos']
          );

          return {
            dni: profile.dni,
            name: profile['nombres y apellidos del alcalde'],
            position: profile.cargo,
            party: profile['partido político postulado'],
            ...riesgo,
            crimeCount: profile['número de delitos'],
            avatar: profile.avatar,
            departamento: profile.departamento,
            provincia: profile.provincia,
            distrito: profile.distrito,
            urlName: formatNameForURL(
              profile['nombres y apellidos del alcalde']
            )
          };
        });

        setProfiles(transformed);
      })
      .catch(error => {
        console.error('Error cargando los datos:', error);
      });
  }, []);

  return (
    <div className="app">
      <HeaderGeneral />

      {isHomePage ? (
        <>
          <Header />

          <main className="ba-home-content">
            <section className="ba-intro-section">
              <div className="ba-copy">
                <div className="ba-eyebrow">
                  <span>Cinco regiones bajo análisis</span>
                </div>

                <h2>
                  ¿Quiénes ostentan el poder en la{' '}
                  <span>Amazonía?</span>
                </h2>

                <p>
                  Hay senadores investigados por lavado de activos
                  y alcaldes procesados por narcotráfico.{' '}
                  <strong>Busca Amazonía</strong> rastrea al poder
                  político y sus conexiones con las actividades
                  que amenazan el futuro de la selva amazónica peruana.
                </p>

                <a className="ba-outline-button" href="#mapa">
                  Ver mapa interactivo <span>→</span>
                </a>
              </div>

              <div className="ba-map-container" id="mapa">
                <AmazoniaMap />
              </div>
            </section>

            <section className="ba-tool-section">
              <div className="ba-copy">
                <div className="ba-eyebrow">
                  <span>Podemos encontrar</span>
                </div>

                <h2>
                  <span>Una herramienta</span> para seguir las conexiones
                </h2>

                <p>
                  En <strong>Amazonas, San Martín, Loreto, Ucayali
                  y Madre de Dios</strong>, políticos y sus círculos
                  cercanos deciden sobre territorios y recursos
                  críticos, mientras sus intereses permanecen fuera
                  de la mirada pública. Busca Amazonía es una
                  herramienta para rastrear al poder político y sus
                  conexiones con las actividades que amenazan el
                  futuro de la Amazonía.
                </p>
              </div>

              <div className="ba-categories">
                <article className="ba-category">
                  <div className="ba-category-icon">♙</div>
                  <h3>Autoridades</h3>
                  <p>
                    Gobernadores, alcaldes, congresistas y otras
                    autoridades electas.
                  </p>
                </article>

                <article className="ba-category">
                  <div className="ba-category-icon">⌘</div>
                  <h3>Vínculos</h3>
                  <p>
                    Redes de personas, empresas y organizaciones
                    relacionadas.
                  </p>
                </article>

                <article className="ba-category">
                  <div className="ba-category-icon">♧</div>
                  <h3>Actividades</h3>
                  <p>
                    Minería, hidrocarburos, forestal, entre otras
                    actividades clave.
                  </p>
                </article>

                <article className="ba-category">
                  <div className="ba-category-icon">⌖</div>
                  <h3>Territorios</h3>
                  <p>
                    Descubre dónde operan y en qué regiones
                    se concentran.
                  </p>
                </article>
              </div>
            </section>
          </main>
        </>
      ) : (
        <ProfileBoard profiles={profiles} />
      )}

      <Footer />
      <FooterGeneral />
    </div>
  );
}

function App() {
  return (
    <Router basename="/busca-amazonia">
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<AppContent isHomePage={true} />}
          />
          <Route
            path="/buscador"
            element={<AppContent isHomePage={false} />}
          />
          <Route
            path="/buscador/:name"
            element={<CandidateProfile />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;