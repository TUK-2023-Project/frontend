export const correctQuestion = () => ({
  type: "INCREASE_SCORE",
});

export const getNextQuestion = (data: string) => ({
  type: "UPDATE_TARGET_ANSWER",
});

export const gameOver = () => ({
  type: "SET_INITIAL_STATE",
});
