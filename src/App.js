import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import LocationTracker from './components/LocationTracker';
function App() {
  const [data, setData] = useState({
    "currentLocation": {
      "latitude": 0,
      "longitude": 0
    },
  });
  useEffect(() => {
    let payload = {
      "currentLocation": {
        "latitude": 10.776889,
        "longitude": 106.700806
      },
    };
    setData(payload);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <LocationTracker />
      </header>
    </div>
  );
}

export default App;
