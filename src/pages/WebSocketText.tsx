import React, { useEffect } from "react";

function WebSocketText() {
  const client = new WebSocket("ws://0.0.0.0:8000/ws/sockettest/");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = function (e) {
      console.log("connect");
    };

    client.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  }, []);

  const onClick = () => {
    console.log("클릭");
    // setInterval(onClick, 3000);
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
    </>
  );
}

export default WebSocketText;
