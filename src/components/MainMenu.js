import React from 'react';
import { Link } from 'react-router-dom';
import handImage from '../waving-hand-sign(1).svg'; // Asegúrate de importar correctamente la imagen

function MainMenu() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img src={handImage} alt="Waving Hand" style={{ maxWidth: '200px' }} />
      <div>
        <Link to="/hand-detection">
          <button style={{ margin: '20px', padding: '10px 20px' }}>Go to Hand Detection</button>
        </Link>
        <Link to="/simple-webcam">
          <button style={{ margin: '20px', padding: '10px 20px' }}>Go to Simple Webcam</button>
        </Link>
      </div>
    </div>
  );
}

export default MainMenu;
