export const playAudio = async (src: string) => {
  const audio = new Audio(src);
  let isPlaying = false;

  try {
    await audio.play();
    isPlaying = true;
  } catch (error) {
    console.error("오디오 에러:", error);
  }

  return {
    pause: () => {
      if (isPlaying) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = "";
      }
    },
  };
};
