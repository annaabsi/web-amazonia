import React from 'react';

function ProfileCard({ profile, onViewProfile, PaperIcon }) {
  // Construir la ruta del avatar usando el dni
  const avatarSrc = profile.dni
    ? `/web-amazonia/imagenes-bn/${profile.dni}.jpg`
    : profile.avatar || '/web-amazonia/imagenes-bn/default.jpg';

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img src={avatarSrc} alt={profile.name} />
      </div>
      <div className="profile-details">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-position">{profile.position}</p>
        <p className="profile-party">{profile.party}</p>
        <div className="profile-risk">
          <div
            className="risk-indicator"
            style={{ backgroundColor: profile.riskColor }}
          ></div>
          <span className="risk-text">{profile.riskLevel}</span>
        </div>
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
      <button
        className="view-profile-button"
        onClick={() => onViewProfile(profile.dni || profile.id)}
      >
        <span>Ver perfil</span>
        {PaperIcon && <PaperIcon />}
      </button>
    </div>
  );
}

export default ProfileCard;
