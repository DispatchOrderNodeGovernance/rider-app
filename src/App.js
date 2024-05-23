import './App.css';
import LocationTracker from './components/LocationTracker';
import { useState } from 'react';
import RequestRide from './components/RequestRide';

function App() {
  const [riderStatus, setRiderStatus] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleLocationUpdate = (position) => {
    setRiderStatus(position);
  };

  const dropoffLocation = {
    latitude: riderStatus.latitude,
    longitude: riderStatus.longitude + 0.001, // Adjusting longitude for 100 meters to the east
  };

  return (
    <div className="App">
      <header className="App-header">
        <LocationTracker onLocationUpdate={handleLocationUpdate} />
        Current Position: Latitude {riderStatus.latitude}, Longitude {riderStatus.longitude}<br />
        <RequestRide pickupLocation={riderStatus} dropoffLocation={dropoffLocation} />
      </header>
    </div>
  );
}

export default App;
