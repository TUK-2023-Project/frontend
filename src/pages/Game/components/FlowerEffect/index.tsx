import React from "react";
import Particles from "react-particles";
import { type Engine } from "tsparticles-engine";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

const FlowerEfftect = () => {
  async function customInit(engine: Engine) {
    await loadConfettiPreset(engine);
  }

  return (
    <Particles
      options={{
        preset: "confetti",
        particles: {
          life: {
            duration: {
              value: 50,
            },
          },
          color: {
            value: ["FF69B4", "00FF00", "FFFF00"],
          },
          number: {
            value: 350,
          },
          move: {
            speed: 100,
          },
        },
      }}
      init={customInit}
    />
  );
};

export default FlowerEfftect;
