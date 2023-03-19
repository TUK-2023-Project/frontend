import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "utils/FingerLandmarks";

import { useDispatch, useSelector } from "react-redux";
import { correctQuestion, moveNextStage } from "redux/actions/SignQuizActions";

import styles from "./WebsocketDisplay.module.scss";

interface propsType {
  click: boolean;
}

function WebSocketDisplay({ click }: propsType) {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [mediaPipe, setMediaPipe] = useState([] as any);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [sendMsg, setSendMsg] = useState<boolean>(false);

  const webSocketUrl = `ws://0.0.0.0:8000/ws/signlanguage/`;
  const ws = useRef<any>(null);

  const dispatch = useDispatch();
  const targetSignWord = useSelector(
    (state: { SignQuiz: { targetSignWord: { data: string } } }) =>
      state.SignQuiz.targetSignWord.data
  );

  const handleSucess = () => {
    console.log("정답을 맞추었을 때");
    dispatch(correctQuestion());
    dispatch(moveNextStage());
    // 1. 카메라 활성화 여부를 false로 두어 소켓데이터 읽는것을 멈추기
    // 2. 페이지를 이동시키거나 컴포넌트를 보여주기 (정답에 해당하는 설명페이지를 보여주어야한다.)
  };

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
        console.log(data.message);
        console.log(targetSignWord);
        if (data.message === targetSignWord) {
          console.log("정답");
          handleSucess();
        }
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runHandpose();
  }, [click]);

  return (
    <div className={styles["webcam-wrapper"]}>
      {click ? (
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
      ) : (
        ""
      )}
    </div>
  );
}
export default WebSocketDisplay;
