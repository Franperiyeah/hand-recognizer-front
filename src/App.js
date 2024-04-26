import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HandDetection from './components/HandDetection';
import SimpleWebcam from './components/SimpleWebcam';
import MainMenu from './components/MainMenu';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/hand-detection" element={<HandDetection />} />
          <Route path="/simple-webcam" element={<SimpleWebcam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
