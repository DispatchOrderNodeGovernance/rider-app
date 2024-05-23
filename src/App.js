import './App.css';
import Locator from './components/Locator';
import { useRef } from 'react';
import RequestRide from './components/RequestRide';

function App() {
  const riderStatus = useRef({ latitude: 0, longitude: 0 });
  const dropoffLocation = useRef({ latitude: 0, longitude: 0 });

  const handleLocationUpdate = (position) => {
    console.log(position);
    riderStatus.current = position;
    dropoffLocation.current = { latitude: position.latitude, longitude: position.longitude + 0.001 };
  };
  // Adjusting longitude for 100 meters to the east

  return (
    <div className="App">
      <header className="App-header">
        <Locator onLocationUpdate={handleLocationUpdate} />
        Current Position: Latitude {riderStatus.current.latitude}, Longitude {riderStatus.current.longitude}<br />
        <RequestRide pickupLocation={riderStatus.current} dropoffLocation={dropoffLocation.current} />
      </header>
    </div>
  );
}

export default App;
