export const setNewNickname = (payload: string) => {
  return {
    type: "SET_NICKNAME",
    payload,
  };
};
