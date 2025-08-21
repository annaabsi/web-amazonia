import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

// Función para obtener los datos de riesgo según la categoría del perfil (igual que en App.js)
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

function CandidateProfile() {
  const { name } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Link to="/" className="back-button">← Volver al listado</Link>
      </div>
    );
  }

  const riskData = obtenerDatosRiesgo(candidate.categoría);
  const avatarSrc = candidate.dni
    ? `/web-amazonia/imagenes-bn/${candidate.dni}.jpg`
    : candidate.avatar || '/web-amazonia/imagenes-bn/default.jpg';

  return (
    <div className="candidate-profile-page">
      <div className="profile-header">
        <Link to="/" className="back-button">← Volver al listado</Link>
      </div>
      
      <div className="candidate-profile-card">
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
        
        <div className="candidate-details-section">
          <h2>Concesiones mineras por formalizar</h2>
          
          <div className="mining-table-container">
            <table className="mining-table">
              <thead>
                <tr>
                  <th>Año</th>
                  <th>Delito genérico</th>
                  <th>Específico</th>
                  <th>Último estado</th>
                </tr>
              </thead>
              <tbody>
                {/* Estos datos deberían venir del JSON, por ahora muestro datos de ejemplo */}
                <tr>
                  <td>2009</td>
                  <td>No tipificados</td>
                  <td>No tipificado</td>
                  <td>Con archivo (califica)</td>
                </tr>
                <tr>
                  <td>2009</td>
                  <td>No tipificados</td>
                  <td>No tipificado</td>
                  <td>Con archivo definitivo (Inv. preven.)</td>
                </tr>
                <tr>
                  <td>2009</td>
                  <td>No tipificados</td>
                  <td>No tipificado</td>
                  <td>Con archivo (preliminar)</td>
                </tr>
                <tr>
                  <td>2009</td>
                  <td>No tipificados</td>
                  <td>No tipificado</td>
                  <td>Audiencia de apelación</td>
                </tr>
                <tr>
                  <td>2009</td>
                  <td>No tipificados</td>
                  <td>No tipificado</td>
                  <td>Con archivo (califica)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="legal-summary">
            <p>No registra antecedentes ni vínculos con actividades ilegales.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;