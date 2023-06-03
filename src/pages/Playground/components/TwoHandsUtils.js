import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

const setHandDetector = async () => {
  const hands = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "tfjs",
    modelType: "full",
    maxHands: 2,
  };

  return await handPoseDetection.createDetector(hands, detectorConfig);
};

const drawhand = (left, right, ctx) => {
  // hand keypoints끼리 연결 시각화
  const drawPath = (points, closePath) => {
    const region = new Path2D();
    region.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point.x, point.y);
      // points[0]과 연결된 points[1:]의 path 그림
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (closePath) {
      region.closePath();
    }
    ctx.stroke(region);
  };
  // hand keupoint을 시각화
  const drawPoint = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 3 * Math.PI);
    ctx.fill();
  };
  const drawLeftHand = (data, handedness) => {
    if (data !== undefined) {
      ctx.fillStyle = handedness === "Left" ? "Red" : "Blue";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;

      for (let i = 0; i < data.length; i++) {
        const x = data[i].x;
        const y = data[i].y;
        drawPoint(x, y, 6);
      }

      const fingers = Object.keys(fingerJoints);
      for (let i = 0; i < fingers.length; i++) {
        const finger = fingers[i];
        const points = fingerJoints[finger].map((idx) => data[idx]);
        drawPath(points, false);
      }
    }
  };
  drawLeftHand(left, "Left");
  drawLeftHand(right, "Right");
};

export { setHandDetector, drawhand };
