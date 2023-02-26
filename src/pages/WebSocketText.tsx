import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./Utilities";

function WebSocketText() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [mediaPipe, setMediaPipe] = useState([] as any);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [sendMsg, setSendMsg] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);

  const webSocketUrl = `ws://0.0.0.0:8000/ws/sockettest/`;
  const ws = useRef<any>(null);
  // const client = new WebSocket("ws://0.0.0.0:8000/ws/sockettest/");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
    // client.onopen = () => {
    //   console.log("WebSocket Client Connected");
    //   client.send(
    //     JSON.stringify({
    //       message: "connect",
    //     })
    //   );
    //   setSocketConnected(true);
    // };

    // client.onclose = (event) => {
    //   console.log("disconnected");
    //   // automatically try to reconnect on connection loss
    //   if (event.wasClean) {
    //     alert(
    //       `[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`
    //     );
    //   } else {
    //     // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
    //     // event.code가 1006이 됩니다.
    //     alert("[close] 커넥션이 죽었습니다.");
    //   }
    // };
  }, []);

  useEffect(() => {
    if (ws.current.readyState === WebSocket.OPEN && click) {
      if (mediaPipe.length < 29) return;
      console.log("send");
      ws.current.send(
        JSON.stringify({
          message: mediaPipe,
        })
      );
      setSendMsg(true);
      // ws.current.onmessage = function (e: { data: string }) {
      //   const data = JSON.parse(e.data);
      //   console.log(data);
      //   console.log("send 30 data");
      //   ws.current.send(
      //     JSON.stringify({
      //       message: mediaPipe,
      //     })
      //   );
      //   setSendMsg(true);
      // };
    }
  }, [click, mediaPipe, socketConnected]);

  useEffect(() => {
    // if (sendMsg) {
    //   client.onmessage = function (e: { data: string; }) {
    //     const data = JSON.parse(e.data);
    //     console.log(data);
    //     console.log("send 30 data");
    //   };
    // }
    if (sendMsg) {
      ws.current.onmessage = function (e: { data: string }) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = JSON.parse(e.data);
        // console.log(data);
        // console.log("send 30 data");
      };
    }
  }, [sendMsg]);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded");
    // Loop and detect hands
    setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      detect(net);
    }, 100);
  };

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
  if (mediaPipe.length === 20) {
    console.log(mediaPipe);
    setMediaPipe([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises

  const onClick = () => {
    console.log("클릭");
    // setInterval(onClick, 3000);
    setClick((prev) => !prev);
    // setSocketConnected(false);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runHandpose();
  };

  return (
    <>
      <h1>WebSocket 연습</h1>
      {/* <div>socket connected : {`${socketConnected}`}</div> */}
      <button
        style={{
          width: "5rem",
          height: "3rem",
          fontSize: "1.5rem",
        }}
        onClick={onClick}
      >
        click
      </button>
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
    </>
  );
}

export default WebSocketText;
