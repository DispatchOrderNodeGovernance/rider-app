import React, { useState, useEffect, useRef } from 'react';

// Haversine formula to calculate the distance between two coordinates
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
};

const LocationTracker = () => {
    const [position, setPosition] = useState(null);
    const [lastTracked, setLastTracked] = useState(null);
    const [error, setError] = useState(null);
    const initialPosition = useRef(null);
    const [distance, setDistance] = useState(0);
    const serviceUrl = useRef('https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/locations');
    const inputUrl = useRef('');

    const sendLocationToServer = async (location) => {
        try {
            const response = await fetch(serviceUrl.current, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(location)
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Location sent successfully:', data);
        } catch (error) {
            console.error('Error sending location to server:', error);
            setError(`Error sending location: ${error.message}`);
        }
    };
    useEffect(() => {
        const handleSuccess = (pos) => {
            setLastTracked(new Date().toLocaleString());
            const { latitude, longitude } = pos.coords;

            if (!initialPosition.current) {
                initialPosition.current = { latitude, longitude };
                setPosition({ latitude, longitude });
                return;
            }

            const distance = getDistanceFromLatLonInMeters(
                initialPosition.current.latitude,
                initialPosition.current.longitude,
                latitude,
                longitude
            );
            setDistance(distance);

            if (distance >= 100) {
                alert('Moved 100 meters. Sending location to server...');
                sendLocationToServer({ latitude, longitude });
                initialPosition.current = { latitude, longitude };
            }
        };

        const handleError = (err) => {
            const errorMessage = `ERROR(${err.code}): ${err.message}`;
            console.warn(errorMessage);
            setError(errorMessage);
        };

        const checkPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
            } else {
                const errorMessage = 'Geolocation is not supported by this browser.';
                alert(errorMessage);
                setError(errorMessage);
            }
        };

        const intervalId = setInterval(checkPosition, 2000);
        checkPosition();

        return () => clearInterval(intervalId);
    }, []);

    const handleUrlChange = (e) => {
        inputUrl.current = e.target.value;
    };

    const handleSetUrl = () => {
        serviceUrl.current = inputUrl.current;
    };

    const handleSetDefaultUrl = () => {
        serviceUrl.current = 'https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/locations';
    };

    return (
        <div>
            <h1>Location Tracker</h1>
            {position ? (
                <p>
                    Current Position: Latitude {position.latitude}, Longitude {position.longitude}<br />
                    Last tracked: {lastTracked} <br />
                    Distance from initial position: {distance} meters
                </p>
            ) : (
                <p>Acquiring position...</p>
            )}
            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}
            <div>
                <input 
                    type="text" 
                    defaultValue={inputUrl.current} 
                    onChange={handleUrlChange} 
                    placeholder="Enter service URL" 
                />
                <button onClick={handleSetUrl}>Set URL</button>
                <button onClick={handleSetDefaultUrl}>Set Default URL</button>
            </div>
        </div>
    );
};

export default LocationTracker;
