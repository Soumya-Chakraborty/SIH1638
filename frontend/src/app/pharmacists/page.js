"use client";
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Pharmacists.module.css';

export default function Pharmacists() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState('');
  const [pharmacists, setPharmacists] = useState([]);

  useEffect(() => {
    // Dynamically load the Google Maps script
    const loadScript = (url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap(); // Initialize map after script is loaded
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=&libraries=places`);
    } else {
      initMap();
    }

    const initMap = () => {
      if (window.google && window.google.maps) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const mapOptions = {
              center: userLocation,
              zoom: 15,
            };

            const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);
            setMap(newMap);

            // Fetch nearby pharmacists or other locations
            fetchNearbyPharmacists(userLocation, newMap);
          },
          () => alert('Could not get your location')
        );
      }
    };
  }, []);

  const fetchNearbyPharmacists = async (location, mapInstance) => {
    const response = await fetch('http://localhost:5000/nearby-pharmacies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location),
    });

    const data = await response.json();
    setPharmacists(data.results);

    // Add markers for each pharmacist on the map
    data.results.forEach((pharmacist) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: pharmacist.geometry.location.lat,
          lng: pharmacist.geometry.location.lng,
        },
        map: mapInstance,
        icon: '/herbal-capsule-pill-leaf-medicine-logo-icon-illustration-template-capsule-pharmacy-medical-logo-template-vector.jpg', // Custom icon for pharmacists
        title: pharmacist.name,
      });

      marker.addListener('click', () => {
        // Show pharmacist details in sidebar when marker is clicked
        setLocation(pharmacist.name);
      });
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find a Pharmacist...</h2>
      <div id="map" className={styles.mapContainer}></div>

      <div className={styles.sidebar}>
        <h3>Selected Pharmacist: {location}</h3>
        {pharmacists.length > 0 && (
          <div className={styles.pharmacistList}>
            {pharmacists.map((pharmacist, index) => (
              <div key={index} className={styles.pharmacistItem}>
                <h4>{pharmacist.name}</h4>
                <p>{pharmacist.vicinity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
