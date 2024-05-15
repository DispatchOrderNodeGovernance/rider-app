import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let payload = {
      "currentLocation": {
        "latitude": 10.776889,
        "longitude": 106.700806
      },
      "vehicleType": "Car",
      "numPassengers": 2,
      "services": {
        "rideMatching": {
          "endpoints": [
            "https://api1.grab.com/ride-matching",
            "https://api2.grab.com/ride-matching"
          ],
          "timeoutAfter": 30
        },
        "location": {
          "endpoints": [
            "https://api1.grab.com/location",
            "https://api2.grab.com/location"
          ],
          "timeoutAfter": 30
        },
        "tripManagement": {
          "endpoints": [
            "https://api1.grab.com/trip-management",
            "https://api2.grab.com/trip-management"
          ],
          "timeoutAfter": 30
        },
        "notification": {
          "endpoints": [
            "https://api1.grab.com/notification",
            "https://api2.grab.com/notification"
          ],
          "timeoutAfter": 30
        }
      }
    };
    setData(payload);
    fetch('https://api.grab.com/v1/ride', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {data && <div>{JSON.stringify(data)}</div>}
      </header>
    </div>
  );
}

export default App;
