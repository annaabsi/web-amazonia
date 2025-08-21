import React, { useEffect, useState } from 'react';
import ProfileBoard from './components/ProfileBoard';

// Función para obtener los datos de riesgo según la categoría del perfil
function obtenerDatosRiesgo(categoria, numeroDelitos) {
  // Mapeo de categorías a los datos de riesgo según las nuevas reglas
  const mapeoRiesgo = {
    "Ningún delito": {
      riskLevel: 'Ningún delito',
      riskColor: '#00B050', // Verde puro
      progressWidth: '0%'
    },
    "1 a 3 delitos": {
      riskLevel: '1 a 3 delitos',
      riskColor: '#92D050', // Verde claro
      progressWidth: '20%'
    },
    "4 a 5 delitos": {
      riskLevel: '4 a 5 delitos',
      riskColor: '#FFFF00', // Amarillo
      progressWidth: '40%'
    },
    "6 a 9 delitos": {
      riskLevel: '6 a 9 delitos',
      riskColor: '#FFC000', // Naranja
      progressWidth: '60%'
    },
    "10 a 20 delitos": {
      riskLevel: '10 a 20 delitos',
      riskColor: '#FF5050', // Rojo claro
      progressWidth: '80%'
    },
    "21 o más delitos": {
      riskLevel: '21 o más delitos',
      riskColor: '#C00000', // Rojo intenso
      progressWidth: '100%'
    }
  };
  
  // Si la categoría no está en el mapeo, devolvemos un valor por defecto
  return mapeoRiesgo[categoria] || {
    riskLevel: categoria || 'Datos no disponibles',
    riskColor: '#CCCCCC',
    progressWidth: '10%',
    numeroDelitos: numeroDelitos || 'N/A'
  };
}

function App() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/web-amazonia/perfiles.json')
      .then(response => response.json())
      .then(data => {
        const transformed = data.map(profile => {
          const riesgo = obtenerDatosRiesgo(profile.categoría, profile["número de delitos"]);
          return {
            dni: profile.dni,
            name: profile["nombres y apellidos del alcalde"],
            position: profile.cargo,
            party: profile["partido político postulado"],
            ...riesgo,
            crimeCount: profile["número de delitos"],
            avatar: profile.avatar
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
      <ProfileBoard profiles={profiles} />
    </div>
  );
}

export default App;