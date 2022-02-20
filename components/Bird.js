import React from "react";
import { View } from "react-native";

const Bird = ({ birdBottom, birdLeft, birdHeight }) => {
  const birdWidth = 50;

  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "blue",
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom,
      }}
    />
  );
};

export default Bird;
