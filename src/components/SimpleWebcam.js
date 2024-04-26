import React, { useEffect, useRef } from 'react';

function SimpleWebcam() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: '640px', height: '480px' }}></video>
    </div>
  );
}

export default SimpleWebcam;
