import React, { useEffect, useRef, useState } from "react";
import { setHandDetector, drawhand } from "./TwoHandsUtils";
import Webcam from "react-webcam";
import styles from "../../Game/components/WebSocketDisplay/WebSocketDisplay.module.scss";

interface HandTypeProps {
  left: TwoHandProps[];
  right: TwoHandProps[];
}

interface HandResult {
  handedness: string;
  keypoints3D: TwoHandProps[];
}

interface TwoHandProps {
  x: number;
  y: number;
  z: number;
}

function TwoHands() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [leftHand, setLeftHand] = useState<TwoHandProps[]>([]);
  const [rightHand, setRightHand] = useState<TwoHandProps[]>([]);
  const [mediaPipe, setMediaPipe] = useState<HandTypeProps[]>([]);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [sendMsg, setSendMsg] = useState<boolean>(false);
  const webSocketUrl = `ws://0.0.0.0:8000/ws/signlanguage/`;
  const ws = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("WebSocket Client Connected");
        ws.current.send(
          JSON.stringify({
            message: "connect",
          })
        );
        setSocketConnected(true);
      };
      ws.current.onclose = (error: any) => {
        console.log("disconnected");
        console.log(error);
      };
    }
  }, []);

  // 웹소켓 연결 후, 20개씩 손좌표값 보내기
  useEffect(() => {
    if (ws.current.readyState === WebSocket.OPEN) {
      if (mediaPipe.length < 19) return;
      console.log(mediaPipe.length);
      console.log("send");

      ws.current.send(
        JSON.stringify({
          message: mediaPipe,
          categoryId: 1,
        })
      );
      setSendMsg(true);
    }
  }, [mediaPipe, socketConnected]);

  // 손좌표값 보낸 후 응답값 반환
  useEffect(() => {
    if (sendMsg) {
      ws.current.onmessage = function (e: { data: string }) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = JSON.parse(e.data);
        console.log(data.message);
      };
    }
  }, [sendMsg]);

  // 0.1초마다 손움직임 감지
  const runHandpose = async () => {
    const net = await setHandDetector();
    console.log("Handpose model Loaded twohand");

    setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      detect(net);
    }, 100);
  };

  // 미디어파이프를 이용하여 손 좌표값 뽑아내기
  const detect = async (net: any) => {
    const modifiedDetector = {
      ...net,
      estimateHands: async (video: any) => {
        const result = await net.estimateHands(video);
        let leftH: HandResult = {
          handedness: "",
          keypoints3D: Array(21).fill({ x: 0, y: 0, z: 0 }),
        };
        let rightH: HandResult = {
          handedness: "",
          keypoints3D: Array(21).fill({ x: 0, y: 0, z: 0 }),
        };
        // hands 배열의 길이에 따라 처리를 진행
        switch (result.length) {
          case 0:
            leftH = {
              handedness: "",
              keypoints3D: Array(21).fill({ x: 0, y: 0, z: 0 }),
            }; // 왼손 배열 생성
            rightH = {
              handedness: "",
              keypoints3D: Array(21).fill({ x: 0, y: 0, z: 0 }),
            }; // 오른손 배열 생성
            break;
          case 1:
            if (result[0].handedness === "Left") {
              leftH = result[0]; // 왼손 배열 생성
              rightH = {
                handedness: "Right",
                keypoints3D: Array(21).fill({ x: 0, y: 0, z: 0 }),
              }; // 오른손 배열 생성
            } else if (result[0].handedness === "Right") {
              leftH = {
                handedness: "Left",
                keypoints3D: Array(21).fill({ x: 0, y: 0, z: 0 }),
              }; // 왼손 배열 생성
              rightH = result[0]; // 오른손 배열 생성
            }

            break;
          case 2:
            if (result[0].handedness === "Left") {
              leftH = result[0]; // 왼손 배열 생성
              rightH = result[1]; // 오른손 배열 생성
            } else if (result[0].handedness === "Right") {
              rightH = result[0]; // 오른손 배열 생성
              leftH = result[1]; // 왼손 배열 생성
            }
            break;
          default:
            return result;
        }
        return [leftH, rightH];
      },
    };
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const [leftH, rightH] = await modifiedDetector.estimateHands(video);

      if (leftH !== undefined && rightH !== undefined) {
        if (leftH?.handedness !== "" && rightH?.handedness !== "") {
          const newLeftHand: TwoHandProps[] = [];
          const newRightHand: TwoHandProps[] = [];
          for (let i = 0; i < 21; i++) {
            newLeftHand.push({
              x: leftH.keypoints3D[i]?.x,
              y: leftH.keypoints3D[i]?.y,
              z: leftH.keypoints3D[i]?.z,
            });
            newRightHand.push({
              x: rightH.keypoints3D[i]?.x,
              y: rightH.keypoints3D[i]?.y,
              z: rightH.keypoints3D[i]?.z,
            });
          }
          setLeftHand(newLeftHand);
          setRightHand(newRightHand);
        }
      }
      // Draw mesh
      // const ctx = canvasRef.current.getContext("2d");
      // drawhand(hand, ctx);
    }
  };

  if (leftHand.length > 20 || rightHand.length > 20) {
    setMediaPipe((oldArray: any) => [
      ...oldArray,
      {
        left: leftHand,
        right: rightHand,
      },
    ]);
    setLeftHand([]);
    setRightHand([]);
  }

  // landmark 50개씩 모으기
  if (mediaPipe.length > 49) {
    console.log(mediaPipe);
    setMediaPipe([]);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runHandpose();
  }, []);

  return (
    <div className={styles["webcam-wrapper"]}>
      {
        <>
          <Webcam
            className={styles["webcam-wrapper__webcam"]}
            ref={webcamRef}
          />
          <canvas
            className={styles["webcam-wrapper__canvas"]}
            ref={canvasRef}
          />
        </>
      }
    </div>
  );
}
export default TwoHands;
