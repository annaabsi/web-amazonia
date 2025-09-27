// Función para obtener los datos de riesgo según el número de delitos
export function obtenerDatosRiesgo(numeroDelitos) {
  // Convertir a número (por si viene como string)
  const numDelitos = parseInt(numeroDelitos) || 0;
  
  let categoria, riskLabel, riskColor, progressWidth;
  
  // Determinar la categoría basada en el número de delitos
  if (numDelitos === 0) {
    categoria = "Sin investigaciones";
    riskLabel = "0 delitos";
    riskColor = '#00B050'; // Verde puro
    progressWidth = '0%';
  } else if (numDelitos >= 1 && numDelitos <= 5) {
    categoria = "Menos de 5 investigaciones";
    riskLabel = "1 a 5 delitos";
    riskColor = '#92D050'; // Verde claro
    progressWidth = '20%';
  } else if (numDelitos >= 6 && numDelitos <= 10) {
    categoria = "Menos de 10 investigaciones";
    riskLabel = "6 a 10 delitos";
    riskColor = '#FFFF00'; // Amarillo
    progressWidth = '40%';
  } else if (numDelitos >= 11 && numDelitos <= 20) {
    categoria = "Menos de 20 investigaciones";
    riskLabel = "11 a 20 delitos";
    riskColor = '#FFC000'; // Naranja
    progressWidth = '60%';
  } else if (numDelitos >= 21) {
    categoria = "Más de 20 investigaciones";
    riskLabel = "21 a más delitos";
    riskColor = '#C00000'; // Rojo intenso
    progressWidth = '100%';
  } else {
    // Caso por defecto para valores inválidos
    categoria = "Datos no disponibles";
    riskLabel = "N/A";
    riskColor = '#CCCCCC';
    progressWidth = '10%';
  }
  
  return {
    riskLevel: categoria,
    riskLabel: riskLabel,
    riskColor: riskColor,
    progressWidth: progressWidth,
    numeroDelitos: numDelitos
  };
}

// Función para convertir un nombre a formato URL (minúsculas con guiones)
export function formatNameForURL(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}