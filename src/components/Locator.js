import React, { useState, useEffect } from 'react';

const LocationTracker = ({ onLocationUpdate }) => {
    //const [lastTracked, setLastTracked] = useState(null);
    const [error, setError] = useState(null);
    // const initialPosition = useRef(null);

    useEffect(() => {
        const handleSuccess = (pos) => {
            const { latitude, longitude } = pos.coords;

            const locationData = {
                latitude,
                longitude
            };
            setError(null);
            onLocationUpdate(locationData);
            // initialPosition.current = { latitude, longitude };
        };

        const handleError = (err) => {
            const errorMessage = `ERROR(${err.code}): ${err.message}`;
            console.warn(errorMessage);
            setError(errorMessage);
        };

        const checkPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            } else {
                const errorMessage = 'Geolocation is not supported by this browser.';
                alert(errorMessage);
                setError(errorMessage);
            }
        };

        const intervalId = setInterval(checkPosition, 2000);
        checkPosition();

        return () => clearInterval(intervalId);
    }, [onLocationUpdate]);

    return (
        <div>
            <h1>Location Tracker</h1>
            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}
        </div>
    );
};

export default LocationTracker;
// <LocationTracker onLocationUpdate={handleLocationUpdate} />