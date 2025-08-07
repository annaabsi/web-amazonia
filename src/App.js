import React, { useEffect, useState } from 'react';
import ProfileBoard from './components/ProfileBoard';

// Función para calcular el riesgo según los datos del perfil
function calcularRiesgo(profile) {
  // Aquí debes definir tu lógica real según los datos del perfil.
  // Ejemplo usando un campo ficticio profile.riesgo (ajusta según tus datos reales):

  // Puedes cambiar esta lógica por la que necesites
  if (profile.riesgo === 'alto') {
    return {
      riskLevel: 'Riesgo alto',
      riskColor: '#E93838', // rojo
      progressWidth: '100%'
    };
  }
  if (profile.riesgo === 'medio') {
    return {
      riskLevel: 'Riesgo medio',
      riskColor: '#FFA600', // naranja
      progressWidth: '75%'
    };
  }
  if (profile.riesgo === 'bajo') {
    return {
      riskLevel: 'Riesgo bajo',
      riskColor: '#FFD61E', // amarillo
      progressWidth: '50%'
    };
  }
  // Sin riesgo
  return {
    riskLevel: 'Sin riesgo',
    riskColor: '#82B310', // verde
    progressWidth: '20%'
  };
}

function App() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/web-amazonia/perfiles.json')
      .then(response => response.json())
      .then(data => {
        const transformed = data.map(profile => {
          const riesgo = calcularRiesgo(profile);
          return {
            dni: profile.dni,
            name: profile["nombres y apellidos del alcalde"],
            position: profile.cargo,
            party: profile["partido político postulado"],
            ...riesgo,
            avatar: profile.avatar
          };
        });
        setProfiles(transformed);
      });
  }, []);

  return (
    <div className="app">
      <ProfileBoard profiles={profiles} />
    </div>
  );
}

export default App;