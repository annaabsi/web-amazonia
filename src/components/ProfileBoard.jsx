import React, { useState } from 'react';
import './ProfileBoard.css';

const ProfileBoard = ({ profiles = [] }) => {
  const [filters, setFilters] = useState({
    departamento: '',
    provincia: '',
    distrito: ''
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 5;

  // Dropdown options
  const dropdownOptions = {
    departamento: ['Loreto', 'Ucayali', 'Amazonas', 'San Martín'],
    provincia: ['Maynas', 'Coronel Portillo', 'Alto Amazonas', 'Requena'],
    distrito: ['Iquitos', 'Punchana', 'Callería', 'Yarinacocha', 'Belén']
  };

  // Sample data that matches the design if no profiles provided
  const defaultProfiles = [
    {
      id: 1,
      name: "Adler Güimac Chavez",
      position: "Alcalde Distrital",
      party: "Partido Esperanza Amazónica",
      riskLevel: "Sin delitos cometidos",
      riskColor: "#82B310",
      progressWidth: "25%",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=84&h=84&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Agapito Coronel Cabrera",
      position: "Alcalde Distrital",
      party: "Movimiento Popular del Oriente",
      riskLevel: "Riesgo medio",
      riskColor: "#FFA600",
      progressWidth: "75%",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=84&h=84&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Albert Einsten Novoa Guevara",
      position: "Alcalde Distrital",
      party: "Alianza Regional Amazónica",
      riskLevel: "Riesgo bajo",
      riskColor: "#FFD61E",
      progressWidth: "50%",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=84&h=84&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Alberto Zuta Alvarado",
      position: "Alcalde Distrital",
      party: "Integración por la Amazonía",
      riskLevel: "Riesgo alto",
      riskColor: "#E93838",
      progressWidth: "100%",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=84&h=84&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Amilcar Diaz Mendoza",
      position: "Alcalde Provincial",
      party: "Movimiento Patria Amazónica",
      riskLevel: "Riesgo medio",
      riskColor: "#FFA600",
      progressWidth: "75%",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=84&h=84&fit=crop&crop=face"
    }
  ];

  const profileData = profiles.length > 0 ? profiles : defaultProfiles;

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionSelect = (dropdownName, value) => {
    setFilters(prev => ({ ...prev, [dropdownName]: value }));
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log('Searching with filters:', filters);
  };

  const handleViewProfile = (profileId) => {
    console.log('Viewing profile:', profileId);
  };

  const PaperIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_paper)">
        <path d="M11.875 0H2.29167C1.025 0 0 1.025 0 2.29167V15.2083C0 16.475 1.025 17.5 2.29167 17.5H9.075C8.34167 16.5 7.91667 15.2833 7.91667 13.9583C7.91667 10.625 10.625 7.91667 13.9583 7.91667C14.025 7.91667 14.1 7.91667 14.1667 7.925V2.29167C14.1667 1.025 13.1417 0 11.875 0ZM3.33333 3.33333H6.66667C7.125 3.33333 7.5 3.70833 7.5 4.16667C7.5 4.625 7.125 5 6.66667 5H3.33333C2.875 5 2.5 4.625 2.5 4.16667C2.5 3.70833 2.875 3.33333 3.33333 3.33333ZM7.5 11.6667H3.33333C2.875 11.6667 2.5 11.2917 2.5 10.8333C2.5 10.375 2.875 10 3.33333 10H7.5C7.95833 10 8.33333 10.375 8.33333 10.8333C8.33333 11.2917 7.95833 11.6667 7.5 11.6667ZM10.8333 8.33333H3.33333C2.875 8.33333 2.5 7.95833 2.5 7.5C2.5 7.04167 2.875 6.66667 3.33333 6.66667H10.8333C11.2917 6.66667 11.6667 7.04167 11.6667 7.5C11.6667 7.95833 11.2917 8.33333 10.8333 8.33333Z" fill="white"/>
        <path d="M13.9583 18.3334C11.5458 18.3334 9.58331 16.3709 9.58331 13.9584C9.58331 11.5459 11.5458 9.58337 13.9583 9.58337C16.3708 9.58337 18.3333 11.5459 18.3333 13.9584C18.3333 16.3709 16.3708 18.3334 13.9583 18.3334ZM13.9583 11.25C12.465 11.25 11.25 12.465 11.25 13.9584C11.25 15.4517 12.465 16.6667 13.9583 16.6667C15.4516 16.6667 16.6666 15.4517 16.6666 13.9584C16.6666 12.465 15.4516 11.25 13.9583 11.25Z" fill="white"/>
        <path d="M19.1667 20C18.9534 20 18.74 19.9183 18.5775 19.7558L15.8692 17.0475C15.5434 16.7216 15.5434 16.195 15.8692 15.8691C16.195 15.5433 16.7217 15.5433 17.0475 15.8691L19.7559 18.5775C20.0817 18.9033 20.0817 19.43 19.7559 19.7558C19.5934 19.9183 19.38 20 19.1667 20Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_paper">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );

  const DropdownArrow = () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.49997 8.63518C5.30283 8.63518 5.10571 8.5599 4.95541 8.40967L0.225655 3.67987C-0.0752185 3.379 -0.0752185 2.89118 0.225655 2.59043C0.526408 2.28968 1.01413 2.28968 1.31502 2.59043L5.49997 6.77562L9.68494 2.59058C9.98581 2.28983 10.4735 2.28983 10.7742 2.59058C11.0752 2.89133 11.0752 3.37915 10.7742 3.68002L6.04453 8.40982C5.89416 8.56007 5.69704 8.63518 5.49997 8.63518Z" fill="#70706F"/>
    </svg>
  );

  const LeftArrow = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.00984 6.99996C3.00984 6.74905 3.10564 6.49818 3.29685 6.30688L9.31659 0.287198C9.69952 -0.0957327 10.3204 -0.0957327 10.7032 0.287198C11.0859 0.669973 11.0859 1.29071 10.7032 1.67367L5.37655 6.99996L10.703 12.3263C11.0857 12.7092 11.0857 13.3299 10.703 13.7126C10.3202 14.0957 9.69933 14.0957 9.3164 13.7126L3.29666 7.69304C3.10543 7.50165 3.00984 7.25078 3.00984 6.99996Z" fill="black"/>
    </svg>
  );

  const RightArrow = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9902 7.00004C10.9902 7.25095 10.8944 7.50182 10.7032 7.69312L4.68341 13.7128C4.30048 14.0957 3.67962 14.0957 3.29685 13.7128C2.91407 13.33 2.91407 12.7093 3.29685 12.3263L8.62345 7.00004L3.29703 1.67371C2.91426 1.29078 2.91426 0.670114 3.29703 0.287369C3.67981 -0.0957479 4.30066 -0.0957479 4.6836 0.287369L10.7033 6.30696C10.8946 6.49835 10.9902 6.74922 10.9902 7.00004Z" fill="black"/>
    </svg>
  );

  // Calculate displayed profiles for current page
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profileData.slice(indexOfFirstProfile, indexOfLastProfile);

  return (
    <div className="profile-board">
      <div className="profile-board-container">
        {/* Search Filters */}
        <div className="search-section">
          <div className="filter-dropdown">
            <div
              className="dropdown-container"
              onClick={() => handleDropdownToggle('departamento')}
            >
              <span className="dropdown-text">
                {filters.departamento || 'Departamento'}
              </span>
              <DropdownArrow />
            </div>
            {openDropdown === 'departamento' && (
              <div className="dropdown-menu">
                {dropdownOptions.departamento.map(option => (
                  <div
                    key={option}
                    className="dropdown-option"
                    onClick={() => handleOptionSelect('departamento', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <div
              className="dropdown-container"
              onClick={() => handleDropdownToggle('provincia')}
            >
              <span className="dropdown-text">
                {filters.provincia || 'Provincia'}
              </span>
              <DropdownArrow />
            </div>
            {openDropdown === 'provincia' && (
              <div className="dropdown-menu">
                {dropdownOptions.provincia.map(option => (
                  <div
                    key={option}
                    className="dropdown-option"
                    onClick={() => handleOptionSelect('provincia', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <div
              className="dropdown-container"
              onClick={() => handleDropdownToggle('distrito')}
            >
              <span className="dropdown-text">
                {filters.distrito || 'Distrito'}
              </span>
              <DropdownArrow />
            </div>
            {openDropdown === 'distrito' && (
              <div className="dropdown-menu">
                {dropdownOptions.distrito.map(option => (
                  <div
                    key={option}
                    className="dropdown-option"
                    onClick={() => handleOptionSelect('distrito', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="search-button" onClick={handleSearch}>
            <span>Buscar</span>
          </button>
        </div>

        {/* Profile Cards */}
        <div className="profiles-section">
          {currentProfiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <div className="profile-avatar">
                <img src={profile.avatar} alt={profile.name} />
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
                onClick={() => handleViewProfile(profile.id)}
              >
                <span>Ver perfil</span>
                <PaperIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-section">
          <button className="pagination-arrow">
            <LeftArrow />
          </button>

          <div className="pagination-numbers">
            {[1, 2, 3, 4].map((pageNum) => (
              <div
                key={pageNum}
                className={`page-number ${pageNum === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum === 1 && pageNum === currentPage && (
                  <div className="page-circle">
                    <span>0{pageNum}</span>
                  </div>
                )}
                {(pageNum !== 1 || pageNum !== currentPage) && (
                  <span>0{pageNum}</span>
                )}
              </div>
            ))}
          </div>

          <button className="pagination-arrow">
            <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBoard;
