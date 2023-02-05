/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useRef, useState } from "react";
import classNames from "classnames";
import "./CameraDisplay.scss";

const CameraDisplay: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleStream = async () => {
    if (stream != null) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(newStream);
        if (videoRef.current != null) {
          videoRef.current.srcObject = newStream;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div>
        <button onClick={handleStream}>
          {stream == null
            ? "영상 시작(퀴즈 진행 중 보여줄 때 가정 - 임시버튼)"
            : "영상 종료(퀴즈 진행 중 보여주지 않을 때 가정 - 임시버튼)"}
        </button>
      </div>
      <video
        className={classNames(stream != null ? "" : "hidden")}
        ref={videoRef}
        autoPlay
      />
    </div>
  );
};

export default CameraDisplay;
