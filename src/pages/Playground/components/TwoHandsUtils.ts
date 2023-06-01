import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

interface fingerJointsProps {
  thumb: number[];
  indexFinger: number[];
  middleFinger: number[];
  ringFinger: number[];
  pinky: number[];
}

interface styleProps {
  color: string;
  size: number;
}

// Points for fingers
const fingerJoints: fingerJointsProps | any = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style: styleProps | any = {
  0: { color: "yellow", size: 15 },
  1: { color: "gold", size: 6 },
  2: { color: "green", size: 10 },
  3: { color: "gold", size: 6 },
  4: { color: "gold", size: 6 },
  5: { color: "purple", size: 10 },
  6: { color: "gold", size: 6 },
  7: { color: "gold", size: 6 },
  8: { color: "gold", size: 6 },
  9: { color: "blue", size: 10 },
  10: { color: "gold", size: 6 },
  11: { color: "gold", size: 6 },
  12: { color: "gold", size: 6 },
  13: { color: "red", size: 10 },
  14: { color: "gold", size: 6 },
  15: { color: "gold", size: 6 },
  16: { color: "gold", size: 6 },
  17: { color: "orange", size: 10 },
  18: { color: "gold", size: 6 },
  19: { color: "gold", size: 6 },
  20: { color: "gold", size: 6 },
};

const setHandDetector = async () => {
  const hands = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig: handPoseDetection.MediaPipeHandsTfjsModelConfig = {
    runtime: "tfjs",
    modelType: "full",
    maxHands: 2,
  };

  return await handPoseDetection.createDetector(hands, detectorConfig);
};

const drawhand = (predictions: any, ctx: any) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction: any) => {
      const { keypoints, handedness } = prediction;

      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        const finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          ctx.beginPath();
          // ctx.moveTo(
          //   keypoints[firstJointIndex][0],
          //   keypoints[firstJointIndex][1]
          // );
          // ctx.lineTo(
          //   keypoints[secondJointIndex][0],
          //   keypoints[secondJointIndex][1]
          // );
          ctx.strokeStyle = "black";
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      }

      for (let i = 0; i < keypoints.length; i++) {
        const finger = keypoints[i];
        // Get x point
        const x = keypoints[i].x;
        // Get y point
        const y = keypoints[i].y;
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i].size, 0, 3 * Math.PI);
        // Set line color
        ctx.fillStyle = handedness === "Left" ? "blue" : "red";
        ctx.fill();
      }
    });
  }
};

export { setHandDetector, drawhand };
