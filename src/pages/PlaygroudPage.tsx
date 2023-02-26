import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames"; // 조건부로 css 클래스 넣어주는 라이브러리
import "./PlaygroundPage.scss"; // scss 임포트
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../utils/Utilities";

function PlaygroudPage() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [mediaPipe, setMediaPipe] = useState([] as any);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [sendMsg, setSendMsg] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);

  const webSocketUrl = `ws://0.0.0.0:8000/ws/sockettest/`;
  const ws = useRef<any>(null);

  // 웹소켓 연결 및 해제
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
        // automatically try to reconnect on connection loss
      };
    }
  }, []);

  // 웹소켓 연결 후, 30개씩 손좌표값 보내기
  useEffect(() => {
    if (ws.current.readyState === WebSocket.OPEN && click) {
      if (mediaPipe.length < 19) return;
      console.log("send");
      ws.current.send(
        JSON.stringify({
          message: mediaPipe,
        })
      );
      setSendMsg(true);
    }
  }, [click, mediaPipe, socketConnected]);

  // 손좌표값 보낸 후 응답값 반환
  useEffect(() => {
    if (sendMsg) {
      ws.current.onmessage = function (e: { data: string }) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = JSON.parse(e.data);
        console.log(data);
        // console.log("send 30 data");
      };
    }
  }, [sendMsg]);

  // 0.1초마다 손움직임 감지
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded");
    // Loop and detect hands
    setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      detect(net);
    }, 100);
  };

  // 미디어파이프를 이용하여 손 좌표값 뽑아내기
  const detect = async (net: handpose.HandPose) => {
    let hand: any[] = [];
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

      // Make Detections
      hand = await net.estimateHands(video);
      // console.log(hand.length === 0);
      if (hand.length !== 0) {
        setMediaPipe((oldArray: any) => [...oldArray, hand]);
      }
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  // landmark 30개씩 모으기
  if (mediaPipe.length === 20) {
    // console.log(mediaPipe);
    setMediaPipe([]);
  }

  // 버튼 클릭 후에 손좌표값 전송 시작
  const onClick = () => {
    console.log("클릭");
    // setInterval(onClick, 3000);
    setClick((prev) => !prev);
    // setSocketConnected(false);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runHandpose();
  };

  return (
    <div>
      <h1>낙서장 페이지</h1>
      <button className={classNames("Button", "blue")} onClick={onClick}>
        손좌표값 보내기
      </button>
      <button className={classNames("Button", "gray")}>button</button>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}

export default PlaygroudPage;
