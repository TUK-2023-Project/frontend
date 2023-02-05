/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useRef } from "react";

const CameraDisplay: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current != null) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={handleClick}>영상 시작</button>
    </div>
  );
};

export default CameraDisplay;
