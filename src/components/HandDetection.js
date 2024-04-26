import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as handTrack from 'handtrackjs';

const HandDetection = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [gestureName, setGestureName] = useState('');

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        video.width = 640;
        video.height = 480;
        canvas.width = 640;
        canvas.height = 480;

        const modelParams = {
            flipHorizontal: true,
            maxNumBoxes: 20,
            iouThreshold: 0.5,
            scoreThreshold: 0.75,
        };

        handTrack.load(modelParams).then(model => {
            handTrack.startVideo(video).then(status => {
                if (status) {
                    setInterval(() => {
                        model.detect(video).then(predictions => {
                            context.clearRect(0, 0, canvas.width, canvas.height);
                            model.renderPredictions(predictions, canvas, context, video);
                        });
                    }, 100);
                }
            });
        });

        return () => {
            handTrack.stopVideo(video);
        };
    }, []);

    const captureImage = useCallback(() => {
        const canvas = canvasRef.current;
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `${gestureName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${timestamp}.jpeg`;
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('file', blob, filename);
            fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => console.log("Server response:", data))
            .catch(error => console.error('Error sending image:', error));
        }, 'image/jpeg');
    }, [gestureName]);

    return (
        <div>
            <video ref={videoRef} style={{ display: 'none' }} autoPlay muted></video>
            <canvas ref={canvasRef} style={{ width: '640px', height: '480px' }}></canvas>
            <input
                type="text"
                value={gestureName}
                onChange={e => setGestureName(e.target.value)}
                placeholder="Enter gesture name"
            />
            <button onClick={captureImage}>Capture and Send Image</button>
        </div>
    );
};

export default HandDetection;
