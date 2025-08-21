import React from 'react';
import { useNavigate } from 'react-router-dom';

// Función para convertir un nombre a formato URL (minúsculas con guiones)
function formatNameForURL(name) {
  return name
    .toLowerCase()
    .normalize("NFD") // Separar acentos
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/[^a-z0-9-]/g, ''); // Eliminar caracteres no alfanuméricos
}

function ProfileCard({ profile, PaperIcon }) {
  const navigate = useNavigate();
  
  // Construir la ruta del avatar usando el dni
  const avatarSrc = profile.dni
    ? `/web-amazonia/imagenes-bn/${profile.dni}.jpg`
    : profile.avatar || '/web-amazonia/imagenes-bn/default.jpg';

  const handleViewProfile = () => {
    const urlName = formatNameForURL(profile.name);
    navigate(`/${urlName}`);
  };

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img src={avatarSrc} alt={profile.name} />
      </div>
      <div className="profile-details">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-position">{profile.position}</p>
        <p className="profile-party">{profile.party}</p>
        <div className="profile-risk-container">
          <div className="risk-info">
            <div
              className="risk-indicator"
              style={{ backgroundColor: profile.riskColor }}
            ></div>
            <span className="risk-text">{profile.riskLevel}</span>
          </div>
          <div className="profile-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  backgroundColor: profile.riskColor,
                  width: profile.progressWidth
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="view-profile-button"
        onClick={handleViewProfile}
      >
        <span>Ver perfil</span>
        {PaperIcon && <PaperIcon />}
      </button>
    </div>
  );
}

export default ProfileCard;
