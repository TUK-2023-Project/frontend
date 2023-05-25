import React, { useEffect, useRef, useState } from "react";
import { setHandDetector, drawhand } from "./TwoHandsUtils";
import Webcam from "react-webcam";
import styles from "../../Game/components/WebSocketDisplay/WebSocketDisplay.module.scss";

interface HandTypeProps {
  left: TwoHandProps[];
  right: TwoHandProps[];
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
    console.log(net);

    setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      detect(net);
    }, 100);
  };

  // 미디어파이프를 이용하여 손 좌표값 뽑아내기
  const detect = async (net: any) => {
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
      // 주석처리한 부분이 아까 보여준 결과값대로 니옴
      // 키포인트 개수
      const numKeypoints = 21;
      // Make Detections
      // const hand = await net.estimateHands(video);

      /* chatGPT가 제안한 해결법 */
      const modifiedDetector = {
        ...net,
        estimateHands: async (video: any) => {
          const result = await net.estimateHands(video);
          let leftHand, rightHand;
          console.log("left", leftHand);
          console.log("right", rightHand);

          // hands 배열의 길이에 따라 처리를 진행
          switch (result.length) {
            case 0:
              leftHand = new Array(21).fill(0); // 왼손 배열 생성
              rightHand = new Array(21).fill(0); // 오른손 배열 생성
              break;
            case 1:
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              leftHand = result[0].landmarks || new Array(21).fill(0); // 왼손 배열 생성
              rightHand = new Array(21).fill(0); // 오른손 배열 생성
              break;
            case 2:
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              leftHand = result[0]?.landmarks || new Array(21).fill(0); // 왼손 배열 생성
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              rightHand = result[0]?.landmarks || new Array(21).fill(0); // 오른손 배열 생성
              return result;
            default:
              return result;
          }
          return [leftHand, rightHand];
        },
      };

      // if (hand.length !== 0) {
      //   for (let i = 0; i < hand.length; i++) {
      //     console.log(hand[i]);
      //     if (hand[i].handedness === "Left") {
      //       setLeftHand((oldArray: any) => [
      //         ...oldArray,
      //         {
      //           x: hand[i].keypoints3D[i].x,
      //           y: hand[i].keypoints3D[i].y,
      //           z: hand[i].keypoints3D[i].z,
      //         },
      //       ]);
      //       setRightHand((oldArray: any) => [
      //         ...oldArray,
      //         {
      //           x: 0,
      //           y: 0,
      //           z: 0,
      //         },
      //       ]);
      //     } else if (hand[i].handedness === "Right") {
      //       setRightHand((oldArray: any) => [
      //         ...oldArray,
      //         {
      //           x: hand[i].keypoints3D[i].x,
      //           y: hand[i].keypoints3D[i].y,
      //           z: hand[i].keypoints3D[i].z,
      //         },
      //       ]);
      //     }
      //   }
      // }
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      // drawhand(hand, ctx);
    }
  };

  if (leftHand.length > 19 || rightHand.length > 19) {
    setLeftHand([]);
    setRightHand([]);
    setMediaPipe((oldArray: any) => [
      ...oldArray,
      {
        left: leftHand,
        right: rightHand,
      },
    ]);
  }
  // landmark 20개씩 모으기
  if (mediaPipe.length > 2) {
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
