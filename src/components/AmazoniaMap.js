
import React, { useEffect, useMemo, useState } from 'react';

const REGIONS = {
  AMAZONAS: {
    name: 'Amazonas',
    coords: [-77.9, -4.8],
    representatives: '03',
    politicalGroups: 'todos integrantes de Fuerza Popular.',
    findings: [
      '14 investigaciones fiscales.',
      '04 demandas civiles.',
      '01 registro de concesión minera.',
    ],
    cardPosition: { left: '7%', top: '37%' },
  },
  LORETO: {
    name: 'Loreto',
    coords: [-73.9, -4.5],
    representatives: '05',
    politicalGroups: '04 integrantes de Fuerza Popular y 01 de Juntos por el Perú.',
    findings: [
      '09 investigaciones fiscales.',
      '02 demandas civiles.',
    ],
    cardPosition: { left: '36%', top: '35%' },
  },
  'SAN MARTIN': {
    name: 'San Martín',
    coords: [-76.6, -7.3],
    representatives: '05',
    politicalGroups: '03 integrantes de Fuerza Popular y 02 de Juntos por el Perú.',
    findings: ['10 investigaciones fiscales.'],
    cardPosition: { left: '7%', top: '51%' },
  },
  UCAYALI: {
    name: 'Ucayali',
    coords: [-73.2, -9.5],
    representatives: '04',
    politicalGroups: '03 integrantes de Fuerza Popular y 01 de Juntos por el Perú.',
    findings: [
      '05 investigaciones fiscales.',
      '01 demanda civil.',
      '02 sentencias judiciales.',
    ],
    cardPosition: { left: '34%', top: '60%' },
  },
  'MADRE DE DIOS': {
    name: 'Madre de Dios',
    coords: [-70.4, -11.8],
    representatives: '03',
    politicalGroups: 'todos integrantes de Juntos por el Perú.',
    findings: [
      '03 investigaciones fiscales.',
      '01 demanda civil.',
    ],
    cardPosition: { left: '38%', top: '69%' },
  },
};

const REGION_IDS = Object.keys(REGIONS);
const WIDTH = 360;
const HEIGHT = 430;
const PADDING = 12;

function collectCoordinates(value, result = []) {
  if (
    Array.isArray(value) &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number'
  ) {
    result.push(value);
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach(item => collectCoordinates(item, result));
  }

  return result;
}

function geometryToPath(geometry, project) {
  const polygons =
    geometry.type === 'Polygon'
      ? [geometry.coordinates]
      : geometry.type === 'MultiPolygon'
        ? geometry.coordinates
        : [];

  return polygons
    .map(polygon =>
      polygon
        .map(ring =>
          ring
            .map((point, index) => {
              const [x, y] = project(point);
              return `${index === 0 ? 'M' : 'L'}${x},${y}`;
            })
            .join(' ') + ' Z'
        )
        .join(' ')
    )
    .join(' ');
}

export default function AmazoniaMap() {
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(false);
  const [activeRegion, setActiveRegion] = useState(null);

  useEffect(() => {
    let active = true;

    fetch('/busca-amazonia/peru_departamental.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el GeoJSON');
        }
        return response.json();
      })
      .then(data => {
        if (active) setGeoData(data);
      })
      .catch(err => {
        console.error('Error cargando el mapa:', err);
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const features = useMemo(
    () =>
      geoData?.features?.filter(feature =>
        REGION_IDS.includes(feature.properties.id)
      ) ?? [],
    [geoData]
  );

  const bounds = useMemo(() => {
    const points = features.flatMap(feature =>
      collectCoordinates(feature.geometry.coordinates, [])
    );

    if (!points.length) return null;

    return {
      minLon: Math.min(...points.map(point => point[0])),
      maxLon: Math.max(...points.map(point => point[0])),
      minLat: Math.min(...points.map(point => point[1])),
      maxLat: Math.max(...points.map(point => point[1])),
    };
  }, [features]);

  const project = useMemo(() => {
    if (!bounds) return null;

    const { minLon, maxLon, minLat, maxLat } = bounds;

    const scale = Math.min(
      (WIDTH - PADDING * 2) / (maxLon - minLon),
      (HEIGHT - PADDING * 2) / (maxLat - minLat)
    );

    const offsetX =
      (WIDTH - (maxLon - minLon) * scale) / 2;

    const offsetY =
      (HEIGHT - (maxLat - minLat) * scale) / 2;

    return ([lon, lat]) => [
      offsetX + (lon - minLon) * scale,
      offsetY + (maxLat - lat) * scale,
    ];
  }, [bounds]);

  if (error) {
    return <p>No se pudo cargar el mapa de la Amazonía.</p>;
  }

  if (!geoData || !project) {
    return <div className="ba-map-loading">Cargando mapa...</div>;
  }

  const handlePointerLeave = event => {
    if (event.pointerType === 'mouse') {
      setActiveRegion(null);
    }
  };

  const selected = activeRegion ? REGIONS[activeRegion] : null;

  return (
    <div
      className="ba-map-interactive"
      onPointerLeave={handlePointerLeave}
    >
      <svg
        className="ba-map"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label="Mapa interactivo de las cinco regiones de la Amazonía peruana"
      >
        {features.map(feature => {
          const id = feature.properties.id;
          const region = REGIONS[id];
          const isActive = activeRegion === id;

          return (
            <path
              key={id}
              className={`ba-map-region${isActive ? ' is-active' : ''}`}
              d={geometryToPath(feature.geometry, project)}
              fill={isActive ? '#77364C' : '#6C8962'}
              stroke="#DCE5D6"
              strokeWidth={isActive ? '1.2' : '0.8'}
              strokeLinejoin="round"
              fillRule="evenodd"
              tabIndex={0}
              role="button"
              aria-label={`Ver información de ${region.name}`}
              aria-pressed={isActive}
              onPointerEnter={event => {
                if (event.pointerType === 'mouse') {
                  setActiveRegion(id);
                }
              }}
              onFocus={() => setActiveRegion(id)}
              onBlur={() => setActiveRegion(null)}
              onClick={() => setActiveRegion(id)}
            />
          );
        })}

        {REGION_IDS.map(id => {
          const region = REGIONS[id];
          const [x, y] = project(region.coords);

          return (
            <g key={id} className="ba-map-label-group">
              <circle
                cx={x}
                cy={y}
                r="3"
                fill="#E66B91"
                stroke="#F4E7E2"
                strokeWidth="1"
              />
              <text
                x={x}
                y={y - 9}
                textAnchor="middle"
                className="ba-map-label"
              >
                {region.name}
              </text>
            </g>
          );
        })}
      </svg>

      {selected && (
        <aside
          className="ba-region-card"
          style={selected.cardPosition}
          aria-live="polite"
        >
          <h3>{selected.name}</h3>

          <p>
            Tiene un total de {selected.representatives} representantes
            en el poder legislativo, {selected.politicalGroups}
          </p>

          <h4>Hallazgos 2026 - I</h4>

          <ul>
            {selected.findings.map(finding => (
              <li key={finding}>{finding}</li>
            ))}
          </ul>

          <button
            type="button"
            className="ba-region-card-close"
            aria-label="Cerrar información"
            onClick={() => setActiveRegion(null)}
          >
            ×
          </button>
        </aside>
      )}
    </div>
  );
}
