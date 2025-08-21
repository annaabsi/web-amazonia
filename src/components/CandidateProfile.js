import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Función para convertir un nombre a formato URL (minúsculas con guiones)
function formatNameForURL(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
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
        <Link to="/">Volver al listado</Link>
      </div>
    );
  }

  // Obtener datos de riesgo según la categoría
  const getRiskData = (categoria) => {
    const riskMap = {
      "Ningún delito": { color: '#00B050', level: 'Ningún delito' },
      "1 a 3 delitos": { color: '#92D050', level: '1 a 3 delitos' },
      "4 a 5 delitos": { color: '#FFFF00', level: '4 a 5 delitos' },
      "6 a 9 delitos": { color: '#FFC000', level: '6 a 9 delitos' },
      "10 a 20 delitos": { color: '#FF5050', level: '10 a 20 delitos' },
      "21 o más delitos": { color: '#C00000', level: '21 o más delitos' }
    };
    
    return riskMap[categoria] || { color: '#CCCCCC', level: 'Datos no disponibles' };
  };

  const riskData = getRiskData(candidate.categoría);
  const avatarSrc = candidate.dni
    ? `/web-amazonia/imagenes-bn/${candidate.dni}.jpg`
    : candidate.avatar || '/web-amazonia/imagenes-bn/default.jpg';

  return (
    <div className="candidate-profile">
      <div className="profile-header">
        <Link to="/" className="back-button">← Volver al listado</Link>
        <h1>Perfil del Candidato</h1>
      </div>
      
      <div className="candidate-details">
        <div className="candidate-main">
          <div className="candidate-avatar">
            <img src={avatarSrc} alt={candidate["nombres y apellidos del alcalde"]} />
          </div>
          
          <div className="candidate-info">
            <h2>{candidate["nombres y apellidos del alcalde"]}</h2>
            <p><strong>Cargo:</strong> {candidate.cargo}</p>
            <p><strong>Partido Político:</strong> {candidate["partido político postulado"]}</p>
            <p><strong>DNI:</strong> {candidate.dni}</p>
            
            <div className="risk-display" style={{ borderLeftColor: riskData.color }}>
              <div className="risk-badge" style={{ backgroundColor: riskData.color }}>
                {riskData.level}
              </div>
              <p><strong>Número de delitos:</strong> {candidate["número de delitos"]}</p>
            </div>
          </div>
        </div>
        
        <div className="additional-details">
          <h3>Información Adicional</h3>
          <div className="detail-item">
            <strong>Categoría de riesgo:</strong> {candidate.categoría}
          </div>
          {/* Agrega más campos según sea necesario */}
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;