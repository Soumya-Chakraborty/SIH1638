import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../styles/Alerts.module.css';

const MapComponent = ({ alerts }) => {
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {alerts.map((alert, index) => (
          <Marker
            key={index}
            position={getCoordinates(alert.region)}
            icon={customIcon}
          >
            <Popup>
              <strong>{alert.crop}</strong><br />
              Disease: {alert.disease}<br />
              Date: {alert.date}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const getCoordinates = (region) => {
  const coordinates = {
    Punjab: [31.1471, 75.3412],
    Haryana: [29.0588, 76.0856],
    Karnataka: [15.3173, 75.7139],
    "Andhra Pradesh": [15.9129, 79.7400],
    Maharashtra: [19.6633, 75.3],
    "West Bengal": [22.9868, 87.8550],
    "Madhya Pradesh": [23.4734, 77.9450],
    "Tamil Nadu": [11.1271, 78.6569],
    "Uttar Pradesh": [26.8467, 80.9462],
    Gujarat: [22.2587, 71.1924],
    Odisha: [20.9517, 85.0985],
    Bihar: [25.0961, 85.3131],
    "Karnataka": [15.3173, 75.7139] // Added multiple entries for Karnataka
  };
  return coordinates[region] || [20.5937, 78.9629]; // Default to central India if region not found
};

export default MapComponent;
