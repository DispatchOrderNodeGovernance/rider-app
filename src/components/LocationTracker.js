import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [position, setPosition] = useState(null);
  const [previousPosition, setPreviousPosition] = useState(null);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = (pos) => {
      const crd = pos.coords;
      const newPosition = { latitude: crd.latitude, longitude: crd.longitude };
      
      if (previousPosition) {
        const distance = calculateDistance(previousPosition, newPosition);
        if (distance > 100) {
          console.log(`Moved ${distance} meters. Sending location to server...`);
          alert(`Moved ${distance} meters. Sending location to server...`);
          sendLocationToServer(newPosition);
          setPreviousPosition(newPosition);
        }
      } else {
        setPreviousPosition(newPosition);
        sendLocationToServer(newPosition);
      }

      setPosition(newPosition);
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const id = navigator.geolocation.watchPosition(success, error, options);

    return () => navigator.geolocation.clearWatch(id);

  }, [previousPosition]);

  const calculateDistance = (pos1, pos2) => {
    const R = 6371e3; // metres
    const φ1 = pos1.latitude * Math.PI/180;
    const φ2 = pos2.latitude * Math.PI/180;
    const Δφ = (pos2.latitude - pos1.latitude) * Math.PI/180;
    const Δλ = (pos2.longitude - pos1.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // in metres
    return distance;
  };

  const sendLocationToServer = (location) => {
    fetch('https://your-server-endpoint.com/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Location sent successfully:', data);
    })
    .catch((error) => {
      console.error('Error sending location:', error);
    });
  };

  return (
    <div>
      <h2>Current Position</h2>
      {position ? (
        <ul>
          <li>Latitude: {position.latitude}</li>
          <li>Longitude: {position.longitude}</li>
        </ul>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationTracker;