import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [lastTracked, setLastTracked] = useState(null);
  const [error, setError] = useState(null);
  const [previousPosition, setPreviousPosition] = useState(null);
  const [movedMeters, setMovedMeters] = useState(0);

  useEffect(() => {
    const handleSuccess = (pos) => {
      const coords = pos.coords;
      const currentPosition = { lat: coords.latitude, lng: coords.longitude };
      const currentTime = new Date().toLocaleTimeString();

      // Check if the user has moved 100 meters
      if (previousPosition) {
        const distance = calculateDistance(
          previousPosition.lat,
          previousPosition.lng,
          currentPosition.lat,
          currentPosition.lng
        );
        setMovedMeters(distance);
        if (distance >= 10) {
          alert('You have moved 10 meters');
        }
      }

      setPreviousPosition(currentPosition);
      setPosition(currentPosition);
      setLastTracked(currentTime);
    };

    const handleError = (err) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    const watchIntervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, 2000);

    return () => { clearInterval(watchIntervalId); }
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  return (
    <div>
      <h1>Location Tracker</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
          <p>Last Tracked: {lastTracked}</p>
          <p>Moved: {movedMeters} meters</p>
        </>
      )}
    </div>
  );
};

export default LocationTracker;