import React, { useState } from 'react';

const RequestRide = ({ pickupLocation, dropoffLocation }) => {
  const [rideStatus, setRideStatus] = useState(null);
  const [error, setError] = useState(null);

  const requestRide = async () => {
    const url = '/request-ride'; // Replace with your actual endpoint
    //const token = 'YOUR_ACCESS_TOKEN'; // Replace with your actual token

    const requestBody = {
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      ride_type: 'standard',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRideStatus(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Request a Ride</h1>
      <button onClick={requestRide}>Request Ride</button>
      {rideStatus && (
        <div>
          <h2>Ride Status</h2>
          <p>Ride ID: {rideStatus.ride_id}</p>
          <p>Status: {rideStatus.status}</p>
          <p>Pickup Location: {rideStatus.pickup_location.latitude}, {rideStatus.pickup_location.longitude}</p>
          <p>Dropoff Location: {rideStatus.dropoff_location.latitude}, {rideStatus.dropoff_location.longitude}</p>
          <p>Estimated Arrival Time: {rideStatus.estimated_arrival_time}</p>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RequestRide;
