import React, { useEffect, useRef, useState } from "react";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "utils/FingerLandmarks";
import { useSelector, useDispatch } from "react-redux";

import {
  correctQuestion,
  moveNextStage,
  usingTwoHandsMode,
} from "redux/actions/SignQuizActions";

import styles from "../handDetection.module.scss";
import { SIGN_WORD } from "utils/constants";

interface propsType {
  open: boolean;
  targetWord: string;
  isInit: boolean;
}

function OneHand({ open, targetWord, isInit }: propsType) {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [mediaPipe, setMediaPipe] = useState([] as any);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [sendMsg, setSendMsg] = useState<boolean>(false);
  const webSocketUrl = `ws://0.0.0.0:8000/ws/signlanguage/`;
  const ws = useRef<any>(null);
  const categoryId = useSelector(
    (state: { SignQuiz: { categoryId: number } }) => state.SignQuiz.categoryId
  );

  const dispatch = useDispatch();

  const handleSucess = () => {
    if (!isInit) {
      dispatch(correctQuestion());
    }

    if (categoryId >= 3) {
      dispatch(usingTwoHandsMode());
    }
    dispatch(moveNextStage());
  };

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
    if (open && ws.current.readyState === WebSocket.OPEN) {
      if (mediaPipe.length < 19) return;
      console.log(mediaPipe.length);
      console.log("send");
      console.log(SIGN_WORD.INIT_VALUE);

      ws.current.send(
        JSON.stringify({
          message: mediaPipe,
          categoryId: isInit ? 1 : categoryId,
          word: isInit ? SIGN_WORD.INIT_VALUE : targetWord,
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
        if (data.message === true) {
          console.log("정답입니다!");
          handleSucess();
        }
      };
    }
  }, [targetWord, isInit, sendMsg]);

  // 0.1초마다 손움직임 감지
  const runHandpose = async () => {
    const net = await handpose.load();

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

  // landmark 20개씩 모으기
  if (mediaPipe.length > 19) {
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
export default OneHand;
