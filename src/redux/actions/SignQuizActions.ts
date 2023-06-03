interface signWordProps {
  id: number;
  data: string;
}

export const correctQuestion = () => ({
  type: "INCREASE_SCORE",
});

export const getNextQuestion = (data: signWordProps) => ({
  type: "UPDATE_TARGET_ANSWER",
  data,
});

export const gameOver = () => ({
  type: "SET_INITIAL_STATE",
});

export const moveNextStage = () => ({
  type: "UPDATE_STAGE_STATE",
});

export const timeOut = () => ({
  type: "GAME_OVER",
});

export const selectCategory = (id: number) => ({
  type: "SET_CATEGORY",
  id,
});

export const usingTwoHandsMode = () => ({
  type: "SET_TWOHANDS_MODEL",
});
