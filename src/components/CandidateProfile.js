import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeaderGeneral from './Header-General';
import FooterGeneral from './Footer-General';
import Footer from './Footer';
import './CandidateProfile.css';

// Función para convertir un nombre a formato URL (minúsculas con guiones)
function formatNameForURL(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Función para obtener los datos de riesgo según la categoría del perfil
function obtenerDatosRiesgo(categoria) {
  const mapeoRiesgo = {
    "Ningún delito": {
      riskLevel: 'Ningún delito',
      riskColor: '#00B050',
      progressWidth: '0%'
    },
    "1 a 3 delitos": {
      riskLevel: '1 a 3 delitos',
      riskColor: '#92D050',
      progressWidth: '20%'
    },
    "4 a 5 delitos": {
      riskLevel: '4 a 5 delitos',
      riskColor: '#FFFF00',
      progressWidth: '40%'
    },
    "6 a 9 delitos": {
      riskLevel: '6 a 9 delitos',
      riskColor: '#FFC000',
      progressWidth: '60%'
    },
    "10 a 20 delitos": {
      riskLevel: '10 a 20 delitos',
      riskColor: '#FF5050',
      progressWidth: '80%'
    },
    "21 o más delitos": {
      riskLevel: '21 o más delitos',
      riskColor: '#C00000',
      progressWidth: '100%'
    }
  };
  
  return mapeoRiesgo[categoria] || {
    riskLevel: categoria || 'Datos no disponibles',
    riskColor: '#CCCCCC',
    progressWidth: '10%'
  };
}

// Iconos para cada sección (solo móvil)
const SectionIcons = {
  'reinfo': '⛏️',
  'ingemmet': '📄',
  'conflicto_intereses': '🏢',
  'declaracion_jurada': '📊',
  'ministerio_publico': '⚖️'
};

// Componente para mostrar el contenido de cada sección
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

  const { data, columns } = sectionData.find(section => section.key === activeSection) || {};
  
  if (!data || data.length === 0) {
    return (
      <div className="section-content">
        <div className="no-data-message">
          Sin información
        </div>
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

// Componente para mostrar la declaración jurada
function DeclaracionJuradaContent({ candidate }) {
  const hasData = candidate["ingresos 2022"] !== "-" || 
                  candidate["bienes y otros 2022"] !== "-" ||
                  candidate["ingresos 2023"] !== "-" || 
                  candidate["bienes y otros 2023"] !== "-" ||
                  candidate["ingresos 2024"] !== "-" || 
                  candidate["bienes y otros 2024"] !== "-";

  if (!hasData) {
    return (
      <div className="section-content">
        <div className="no-data-message">
          Sin información
        </div>
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
            {candidate["ingresos 2022"] !== "-" && (
              <tr>
                <td>2022</td>
                <td>{candidate["ingresos 2022"]}</td>
                <td>{candidate["bienes y otros 2022"]}</td>
              </tr>
            )}
            {candidate["ingresos 2023"] !== "-" && (
              <tr>
                <td>2023</td>
                <td>{candidate["ingresos 2023"]}</td>
                <td>{candidate["bienes y otros 2023"]}</td>
              </tr>
            )}
            {candidate["ingresos 2024"] !== "-" && (
              <tr>
                <td>2024</td>
                <td>{candidate["ingresos 2024"]}</td>
                <td>{candidate["bienes y otros 2024"]}</td>
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
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileActiveSection, setMobileActiveSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    // Cargar todos los datos y buscar por nombre formateado
    fetch('/web-amazonia/perfiles.json')
      .then(response => response.json())
      .then(data => {
        // Buscar el candidato cuyo nombre formateado coincida con el parámetro de la URL
        const foundCandidate = data.find(profile => {
          const profileName = profile["nombres y apellidos del alcalde"];
          const formattedName = formatNameForURL(profileName);
          return formattedName === name;
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
        <Link to="/" className="back-button"></Link>
      </div>
    );
  }

  const riskData = obtenerDatosRiesgo(candidate.categoría);
  const avatarSrc = candidate.dni
    ? `/web-amazonia/imagenes-bn/${candidate.dni}.jpg`
    : candidate.avatar || '/web-amazonia/imagenes-bn/default.jpg';

  // Definir las secciones de datos con sus respectivas columnas
  const sectionData = [
    {
      key: 'reinfo',
      title: 'Concesiones mineras por formalizar',
      data: candidate.reinfo,
      columns: [
        { key: 'nombre del derecho minero', header: 'Nombre del derecho minero' },
        { key: 'nombre de minero en vías de formalización', header: 'Nombre de minero en vías de formalización' },
        { key: 'relación', header: 'Relación' },
        { key: 'estado', header: 'Estado' }
      ]
    },
    {
      key: 'ingemmet',
      title: 'Título minero',
      data: candidate.ingemmet,
      columns: [
        { key: 'departamento', header: 'Departamento' },
        { key: 'distrito', header: 'Distrito' },
        { key: 'concesionado', header: 'Concesionado' },
        { key: 'tipo de relación', header: 'Relacionado a' },
        { key: 'situación', header: 'Situación' },
      ]
    },
    {
      key: 'conflicto_intereses',
      title: 'Empresas',
      data: candidate.conflicto_intereses,
      columns: [
        { key: 'organizacion', header: 'Nombre' },
        { key: 'naturaleza de la participacion', header: 'Naturaleza de la participación' },
        { key: 'presentado el', header: 'Año de presentación' }
      ]
    },
    {
      key: 'ministerio_publico',
      title: 'Investigaciones fiscales',
      data: candidate.ministerio_publico,
      columns: [
        { key: 'n°caso', header: 'N° caso' },
        { key: 'año-ingreso', header: 'Año ingreso' },
        { key: 'delito generico', header: 'Delito genérico' },
        { key: 'último estado', header: 'Último estado' }
      ]
    }
  ];

  const handleSectionClick = (sectionKey) => {
    if (activeSection === sectionKey) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionKey);
    }
  };

  const handleMobileSectionClick = (sectionKey) => {
    if (mobileActiveSection === sectionKey) {
      setMobileActiveSection(null);
    } else {
      setMobileActiveSection(sectionKey);
    }
  };

  return (
    <>
    <HeaderGeneral isScrolledProp={true} />
    <div className="candidate-profile-page">
      <div className="profile-header">
        <Link to="/" className="back-button">
          <img src="/web-amazonia/House.png" alt="Volver" />
        </Link>
      </div>
      
      <div className="candidate-profile-card bg-1">
        <div className="candidate-main-info">
          <div className="candidate-avatar-large">
            <img src={avatarSrc} alt={candidate["nombres y apellidos del alcalde"]} />
          </div>
          
          <div className="candidate-basic-info">
            <h1>{candidate["nombres y apellidos del alcalde"]}</h1>
            <p className="candidate-position">{candidate.cargo}</p>
            
            <div className="candidate-location-party">
              <span className="location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {candidate.distrito && candidate.provincia && candidate.departamento 
                    ? `${candidate.distrito} - ${candidate.provincia} - ${candidate.departamento}`
                    : candidate.distrito || candidate.provincia || candidate.departamento || 'Ubicación no disponible'
                }
              </span>
              <span className="party">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                {candidate["partido político postulado"] || 'Partido Esperanza Amazónica'}
              </span>
            </div>
            
            <div className="profile-risk-container">
              <div className="risk-info">
                <div
                  className="risk-indicator"
                  style={{ backgroundColor: riskData.riskColor }}
                ></div>
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
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='candidate-profile-card'>
                <div className="candidate-details-section">
          {/* Desktop view - buttons in a row with single content container below */}
          <div className="desktop-sections">
            <div className="section-buttons">
              {sectionData.map(section => (
                <button
                  key={section.key}
                  className={`section-button ${activeSection === section.key ? 'active' : ''}`}
                  onClick={() => handleSectionClick(section.key)}
                >
                  {section.title}
                </button>
              ))}
              <button
                className={`section-button ${activeSection === 'declaracion_jurada' ? 'active' : ''}`}
                onClick={() => handleSectionClick('declaracion_jurada')}
              >
                Última declaración
              </button>
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
          
          {/* Mobile view - buttons stacked with content below each */}
          <div className="mobile-sections">
            {sectionData.map(section => (
              <div key={section.key} className="mobile-section">
                <button
                  className={`mobile-section-button ${mobileActiveSection === section.key ? 'active' : ''}`}
                  onClick={() => handleMobileSectionClick(section.key)}
                >
                  <span className="mobile-section-icon">{SectionIcons[section.key]}</span>
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
            
            <div className="mobile-section">
              <button
                className={`mobile-section-button ${mobileActiveSection === 'declaracion_jurada' ? 'active' : ''}`}
                onClick={() => handleMobileSectionClick('declaracion_jurada')}
              >
                <span className="mobile-section-icon">{SectionIcons['declaracion_jurada']}</span>
                Última declaración
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
          </div>
          
          {/* <div className="legal-summary">
            <p>No registra antecedentes ni vínculos con actividades ilegales.</p>
          </div> */}
        </div>
      </div>
    </div>
    <Footer />
    <FooterGeneral />
    </>
  );
}

export default CandidateProfile;