import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import './ProfileBoard.css';

const profilesPerPage = 5;

const dropdownOptions = {
  departamento: ['Loreto', 'Ucayali', 'Amazonas', 'San Martín'],
  provincia: ['Maynas', 'Coronel Portillo', 'Alto Amazonas', 'Requena'],
  distrito: ['Iquitos', 'Punchana', 'Callería', 'Yarinacocha', 'Belén']
};

const ProfileBoard = ({ profiles = [] }) => {
  const [filters, setFilters] = useState({
    departamento: '',
    provincia: '',
    distrito: ''
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const profileData = profiles;

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionSelect = (dropdownName, value) => {
    setFilters(prev => ({ ...prev, [dropdownName]: value }));
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    // Aquí puedes filtrar los perfiles según los filtros seleccionados
    // Por ahora solo muestra en consola
    console.log('Searching with filters:', filters);
  };

  const handleViewProfile = (profileId) => {
    console.log('Viewing profile:', profileId);
  };

  // Paginación
  const totalPages = Math.ceil(profileData.length / profilesPerPage);
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profileData.slice(indexOfFirstProfile, indexOfLastProfile);

  // Calcular el rango de páginas a mostrar
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 3);
  if (endPage - startPage < 3) {
    startPage = Math.max(1, endPage - 3);
  }
  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // Iconos SVG
  const PaperIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><g clipPath="url(#clip0_paper)"><path d="M11.875 0H2.29167C1.025 0 0 1.025 0 2.29167V15.2083C0 16.475 1.025 17.5 2.29167 17.5H9.075C8.34167 16.5 7.91667 15.2833 7.91667 13.9583C7.91667 10.625 10.625 7.91667 13.9583 7.91667C14.025 7.91667 14.1 7.91667 14.1667 7.925V2.29167C14.1667 1.025 13.1417 0 11.875 0ZM3.33333 3.33333H6.66667C7.125 3.33333 7.5 3.70833 7.5 4.16667C7.5 4.625 7.125 5 6.66667 5H3.33333C2.875 5 2.5 4.625 2.5 4.16667C2.5 3.70833 2.875 3.33333 3.33333 3.33333ZM7.5 11.6667H3.33333C2.875 11.6667 2.5 11.2917 2.5 10.8333C2.5 10.375 2.875 10 3.33333 10H7.5C7.95833 10 8.33333 10.375 8.33333 10.8333C8.33333 11.2917 7.95833 11.6667 7.5 11.6667ZM10.8333 8.33333H3.33333C2.875 8.33333 2.5 7.95833 2.5 7.5C2.5 7.04167 2.875 6.66667 3.33333 6.66667H10.8333C11.2917 6.66667 11.6667 7.04167 11.6667 7.5C11.6667 7.95833 11.2917 8.33333 10.8333 8.33333Z" fill="white"/><path d="M13.9583 18.3334C11.5458 18.3334 9.58331 16.3709 9.58331 13.9584C9.58331 11.5459 11.5458 9.58337 13.9583 9.58337C16.3708 9.58337 18.3333 11.5459 18.3333 13.9584C18.3333 16.3709 16.3708 18.3334 13.9583 18.3334ZM13.9583 11.25C12.465 11.25 11.25 12.465 11.25 13.9584C11.25 15.4517 12.465 16.6667 13.9583 16.6667C15.4516 16.6667 16.6666 15.4517 16.6666 13.9584C16.6666 12.465 15.4516 11.25 13.9583 11.25Z" fill="white"/><path d="M19.1667 20C18.9534 20 18.74 19.9183 18.5775 19.7558L15.8692 17.0475C15.5434 16.7216 15.5434 16.195 15.8692 15.8691C16.195 15.5433 16.7217 15.5433 17.0475 15.8691L19.7559 18.5775C20.0817 18.9033 20.0817 19.43 19.7559 19.7558C19.5934 19.9183 19.38 20 19.1667 20Z" fill="white"/></g><defs><clipPath id="clip0_paper"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
  );
  const DropdownArrow = () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.49997 8.63518C5.30283 8.63518 5.10571 8.5599 4.95541 8.40967L0.225655 3.67987C-0.0752185 3.379 -0.0752185 2.89118 0.225655 2.59043C0.526408 2.28968 1.01413 2.28968 1.31502 2.59043L5.49997 6.77562L9.68494 2.59058C9.98581 2.28983 10.4735 2.28983 10.7742 2.59058C11.0752 2.89133 11.0752 3.37915 10.7742 3.68002L6.04453 8.40982C5.89416 8.56007 5.69704 8.63518 5.49997 8.63518Z" fill="#70706F"/></svg>
  );
  const LeftArrow = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.00984 6.99996C3.00984 6.74905 3.10564 6.49818 3.29685 6.30688L9.31659 0.287198C9.69952 -0.0957327 10.3204 -0.0957327 10.7032 0.287198C11.0859 0.669973 11.0859 1.29071 10.7032 1.67367L5.37655 6.99996L10.703 12.3263C11.0857 12.7092 11.0857 13.3299 10.703 13.7126C10.3202 14.0957 9.69933 14.0957 9.3164 13.7126L3.29666 7.69304C3.10543 7.50165 3.00984 7.25078 3.00984 6.99996Z" fill="black"/></svg>
  );
  const RightArrow = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.9902 7.00004C10.9902 7.25095 10.8944 7.50182 10.7032 7.69312L4.68341 13.7128C4.30048 14.0957 3.67962 14.0957 3.29685 13.7128C2.91407 13.33 2.91407 12.7093 3.29685 12.3263L8.62345 7.00004L3.29703 1.67371C2.91426 1.29078 2.91426 0.670114 3.29703 0.287369C3.67981 -0.0957479 4.30066 -0.0957479 4.6836 0.287369L10.7033 6.30696C10.8946 6.49835 10.9902 6.74922 10.9902 7.00004Z" fill="black"/></svg>
  );

  console.log('currentProfiles:', currentProfiles);

  return (
    <div className="profile-board">
      <div className="profile-board-container">
        {/* Filtros */}
        <div className="search-section">
          {['departamento', 'provincia', 'distrito'].map((dropdown) => (
            <div className="filter-dropdown" key={dropdown}>
              <div
                className="dropdown-container"
                onClick={() => handleDropdownToggle(dropdown)}
              >
                <span className="dropdown-text">
                  {filters[dropdown] || dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
                </span>
                <DropdownArrow />
              </div>
              {openDropdown === dropdown && (
                <div className="dropdown-menu">
                  {dropdownOptions[dropdown].map(option => (
                    <div
                      key={option}
                      className="dropdown-option"
                      onClick={() => handleOptionSelect(dropdown, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="search-button" onClick={handleSearch}>
            <span>Buscar</span>
          </button>
        </div>

        {/* Tarjetas de perfil */}
        <div className="profiles-section">
          {currentProfiles.map((profile) => (
            <ProfileCard
              key={profile.dni || profile.id}
              profile={profile}
              onViewProfile={handleViewProfile}
              PaperIcon={PaperIcon}
            />
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination-section">
          <button
            className="pagination-arrow"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <LeftArrow />
          </button>
          <div className="pagination-numbers">
            {visiblePages.map((pageNum) => (
              <div
                key={pageNum}
                className={`page-number ${pageNum === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum === currentPage ? (
                  <div className="page-circle">
                    <span>{pageNum < 10 ? `0${pageNum}` : pageNum}</span>
                  </div>
                ) : (
                  <span>{pageNum < 10 ? `0${pageNum}` : pageNum}</span>
                )}
              </div>
            ))}
          </div>
          <button
            className="pagination-arrow"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBoard;