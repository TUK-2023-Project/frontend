import React from "react";
import Particles from "react-particles";
import { type Engine } from "tsparticles-engine";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
const FireworksEffect = () => {
  async function customInit(engine: Engine) {
    await loadFireworksPreset(engine);
  }

  const options = {
    preset: "fireworks",
    sounds: {
      enable: false,
    },
  };

  return <Particles options={options} init={customInit} />;
};

export default FireworksEffect;
