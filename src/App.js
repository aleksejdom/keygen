import React, { useState, useEffect } from 'react';
import './App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';

import Cylinders from './components/cylinders/Cylinders';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobileDevice = () => {
      // Überprüfen, ob es sich bei dem Gerät um ein mobiles Gerät handelt
      const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobile);
    };

    checkMobileDevice();
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="mobile-warning">
          <h1>Warnung</h1>
          <p>Diese App funktioniert nur auf Desktop-Geräten. Bitte öffnen Sie die App auf einem Desktop-Gerät.</p>
        </div>
      ) : (
        <Cylinders />
      )}
    </>
  );
}

export default App;
