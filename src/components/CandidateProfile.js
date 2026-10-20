import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import HeaderGeneral from './Header-General';
import FooterGeneral from './Footer-General';
import Footer from './Footer';
import { obtenerDatosRiesgo, formatNameForURL } from '../utils/riskUtils';
import './CandidateProfile.css';

const SectionIcons = {
  reinfo: '⛏️',
  ingemmet: '📄',
  conflicto_intereses: '🏢',
  declaracion_jurada: '📊',
  ministerio_publico: '⚖️'
};

function SectionContent({ activeSection, candidate, sectionData }) {
  if (!activeSection) {
    return (
      <div className="section-content">
        <div className="no-data-message">
          Seleccione una categoría para ver la información
        </div>
      </div>
    );
  }

  const { data, columns } =
    sectionData.find(section => section.key === activeSection) || {};

  if (!data || data.length === 0) {
    return (
      <div className="section-content">
        <div className="no-data-message">Sin información</div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{item[col.key] || '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeclaracionJuradaContent({ candidate }) {
  const hasData =
    candidate['ingresos 2022'] !== '-' ||
    candidate['bienes y otros 2022'] !== '-' ||
    candidate['ingresos 2023'] !== '-' ||
    candidate['bienes y otros 2023'] !== '-' ||
    candidate['ingresos 2024'] !== '-' ||
    candidate['bienes y otros 2024'] !== '-';

  if (!hasData) {
    return (
      <div className="section-content">
        <div className="no-data-message">Sin información</div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Año</th>
              <th>Ingresos</th>
              <th>Bienes y otros</th>
            </tr>
          </thead>
          <tbody>
            {candidate['ingresos 2022'] !== '-' && (
              <tr>
                <td>2022</td>
                <td>{candidate['ingresos 2022']}</td>
                <td>{candidate['bienes y otros 2022']}</td>
              </tr>
            )}
            {candidate['ingresos 2023'] !== '-' && (
              <tr>
                <td>2023</td>
                <td>{candidate['ingresos 2023']}</td>
                <td>{candidate['bienes y otros 2023']}</td>
              </tr>
            )}
            {candidate['ingresos 2024'] !== '-' && (
              <tr>
                <td>2024</td>
                <td>{candidate['ingresos 2024']}</td>
                <td>{candidate['bienes y otros 2024']}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CandidateProfile() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileActiveSection, setMobileActiveSection] = useState(null);

  useEffect(() => {
    fetch('/busca-amazonia/perfiles.json')
      .then(response => response.json())
      .then(data => {
        const foundCandidate = data.find(profile => {
          const profileName =
            profile['nombres y apellidos del alcalde'];

          return formatNameForURL(profileName) === name;
        });

        setCandidate(foundCandidate);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando los datos del candidato:', error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <div className="candidate-loading">Cargando perfil...</div>;
  }

  if (!candidate) {
    return (
      <div className="candidate-not-found">
        <h2>Candidato no encontrado</h2>
        <button
          type="button"
          className="back-results"
          onClick={() => navigate(-1)}
        >
          <span className="back-results-arrow">←</span>
          Volver a resultados
        </button>
      </div>
    );
  }

  const riskData = obtenerDatosRiesgo(candidate['número de delitos']);

  const avatarSrc = candidate.dni
    ? `/busca-amazonia/imagenes-bn/${candidate.dni}.jpg`
    : candidate.avatar || '/busca-amazonia/imagenes-bn/default.jpg';

  const sectionData = [
    {
      key: 'ministerio_publico',
      title: 'Investigaciones fiscales',
      data: candidate.ministerio_publico,
      columns: [
        { key: 'año-ingreso', header: 'Año ingreso' },
        { key: 'delito generico', header: 'Delito genérico investigado' },
        { key: 'específico', header: 'Delito específico investigado' },
        { key: 'último estado', header: 'Último estado' },
        { key: 'n°caso', header: 'N° caso' }
      ]
    },
    {
      key: 'reinfo',
      title: 'REINFO',
      data: candidate.reinfo,
      columns: [
        { key: 'nombre del derecho minero', header: 'Nombre del derecho minero' },
        {
          key: 'nombre de minero en vías de formalización',
          header: 'Nombre de minero en vías de formalización'
        },
        { key: 'relación', header: 'Relación' },
        { key: 'estado', header: 'Estado' }
      ]
    },
    {
      key: 'ingemmet',
      title: 'INGEMMET',
      data: candidate.ingemmet,
      columns: [
        { key: 'nombre del derecho', header: 'Concesión' },
        { key: 'departamento', header: 'Departamento' },
        { key: 'concesionado', header: 'Concesionado' },
        { key: 'tipo de relación', header: 'Relacionado a' },
        { key: 'situación', header: 'Situación' }
      ]
    },
    {
      key: 'conflicto_intereses',
      title: 'Empresas vinculadas',
      data: candidate.conflicto_intereses,
      columns: [
        { key: 'organizacion', header: 'Nombre' },
        {
          key: 'naturaleza de la participacion',
          header: 'Naturaleza de la participación'
        },
        { key: 'presentado el', header: 'Año de presentación' }
      ]
    }
  ];

  const handleSectionClick = sectionKey => {
    setActiveSection(current =>
      current === sectionKey ? null : sectionKey
    );
  };

  const handleMobileSectionClick = sectionKey => {
    setMobileActiveSection(current =>
      current === sectionKey ? null : sectionKey
    );
  };

  return (
    <>
      <HeaderGeneral isScrolledProp={true} />

      <div className="candidate-profile-page">
        <div className="profile-header">
          <button
            type="button"
            className="back-results"
            onClick={() => navigate(-1)}
          >
            <span className="back-results-arrow">←</span>
            Volver a resultados
          </button>

          <Link to="/" className="back-button" aria-label="Volver al inicio">
            <img src="/busca-amazonia/House.png" alt="Inicio" />
          </Link>
        </div>

        <div className="candidate-profile-card bg-1">
          <div className="candidate-main-info">
            <div className="candidate-avatar-large">
              <img
                src={avatarSrc}
                alt={candidate['nombres y apellidos del alcalde']}
              />
            </div>

            <div className="candidate-basic-info">
              <h1>{candidate['nombres y apellidos del alcalde']}</h1>
              <p className="candidate-position">{candidate.cargo}</p>

              <div className="candidate-location-party">
                <span className="location">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>

                  {candidate.distrito &&
                  candidate.provincia &&
                  candidate.departamento
                    ? `${candidate.distrito} - ${candidate.provincia} - ${candidate.departamento}`
                    : candidate.distrito ||
                      candidate.provincia ||
                      candidate.departamento ||
                      'Ubicación no disponible'}
                </span>

                <span className="party">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>

                  {candidate['partido político postulado'] ||
                    'Partido Esperanza Amazónica'}
                </span>
              </div>

              <div className="profile-risk-container">
                <div className="risk-info">
                  <div
                    className="risk-indicator"
                    style={{ backgroundColor: riskData.riskColor }}
                  />
                  <span className="risk-text">{riskData.riskLevel}</span>
                </div>

                <div className="profile-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        backgroundColor: riskData.riskColor,
                        width: riskData.progressWidth
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="candidate-profile-card">
          <div className="candidate-details-section">
            <div className="desktop-sections">
              <div className="section-buttons">
                <button
                  className={`section-button ${
                    activeSection === 'declaracion_jurada' ? 'active' : ''
                  }`}
                  onClick={() => handleSectionClick('declaracion_jurada')}
                >
                  Declaración de ingresos
                </button>

                {sectionData.map(section => (
                  <button
                    key={section.key}
                    className={`section-button ${
                      activeSection === section.key ? 'active' : ''
                    }`}
                    onClick={() => handleSectionClick(section.key)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>

              <div className="desktop-content-container">
                {activeSection === 'declaracion_jurada' ? (
                  <DeclaracionJuradaContent candidate={candidate} />
                ) : (
                  <SectionContent
                    activeSection={activeSection}
                    candidate={candidate}
                    sectionData={sectionData}
                  />
                )}
              </div>
            </div>

            <div className="mobile-sections">
              <div className="mobile-section">
                <button
                  className={`mobile-section-button ${
                    mobileActiveSection === 'declaracion_jurada' ? 'active' : ''
                  }`}
                  onClick={() =>
                    handleMobileSectionClick('declaracion_jurada')
                  }
                >
                  <span className="mobile-section-icon">
                    {SectionIcons.declaracion_jurada}
                  </span>
                  Declaración de ingresos
                  <span className="mobile-toggle-icon">
                    {mobileActiveSection === 'declaracion_jurada' ? '▲' : '▼'}
                  </span>
                </button>

                {mobileActiveSection === 'declaracion_jurada' && (
                  <div className="mobile-content-container">
                    <DeclaracionJuradaContent candidate={candidate} />
                  </div>
                )}
              </div>

              {sectionData.map(section => (
                <div key={section.key} className="mobile-section">
                  <button
                    className={`mobile-section-button ${
                      mobileActiveSection === section.key ? 'active' : ''
                    }`}
                    onClick={() => handleMobileSectionClick(section.key)}
                  >
                    <span className="mobile-section-icon">
                      {SectionIcons[section.key]}
                    </span>
                    {section.title}
                    <span className="mobile-toggle-icon">
                      {mobileActiveSection === section.key ? '▲' : '▼'}
                    </span>
                  </button>

                  {mobileActiveSection === section.key && (
                    <div className="mobile-content-container">
                      <SectionContent
                        activeSection={section.key}
                        candidate={candidate}
                        sectionData={sectionData}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fuentes">
          <p><b>Fuentes y fechas de consulta:</b></p>
          <ul>
            <li>
              La base de datos de Ingemmet fue descargada y consultada el día
              22 de abril de 2025
            </li>
            <li>
              La base de datos de Reinfo fue descargada y consultada el 1 de
              marzo de 2025
            </li>
            <li>
              Las declaraciones juradas de ingresos fueron consultadas el 31
              de marzo de 2025
            </li>
            <li>
              Las declaraciones juradas de intereses fueron consultadas el 31
              de marzo de 2025
            </li>
            <li>
              Las investigaciones fiscales por el Ministerio Público fueron
              consultadas entre diciembre de 2024 y marzo de 2025
            </li>
            <li>Los datos generales fueron generados en diciembre de 2024</li>
          </ul>
        </div>
      </div>

      <Footer />
      <FooterGeneral />
    </>
  );
}

export default CandidateProfile;