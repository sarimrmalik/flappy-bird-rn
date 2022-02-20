import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2; // Bottom left point of the bird div
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const dropRate = 3; // Number of pixels the bird falls per interval
  const obstacleVelocity = 5; // Number of pixels the obstalce moves left per interval
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const obstacleGap = 200;
  const birdHeight = 60;
  const jumpInterval = 50; // Number of pixels by which bird jumps up
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + obstacleWidth / 2
  );
  const [heightDecrement, setHeightDecrement] = useState(0); // Increment by which obstacle height is varied
  const [heightDecrementTwo, setHeightDecrementTwo] = useState(0); // Increment by which obstacle height is varied
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Interval IDs, accessible globally
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  // Make the bird fall
  useEffect(() => {
    // As long as bird bottom is above the bottom of the screen
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - dropRate);
      }, 30);
      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  // Start first obstacles (top and bottom)
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - obstacleVelocity);
      }, 30);
      return () => clearInterval(obstaclesTimerId);
    } else {
      setObstaclesLeft(screenWidth);
      setHeightDecrement(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeft]);

  // Start second obstacles (top and bottom)
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(
          (obstaclesLeftTwo) => obstaclesLeftTwo - obstacleVelocity
        );
      }, 30);
      return () => clearInterval(obstaclesTimerIdTwo);
    } else {
      setObstaclesLeftTwo(screenWidth);
      setHeightDecrementTwo(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeftTwo]);

  // Check for collisions
  useEffect(() => {
    let  

    if (
      ((birdBottom < heightDecrement + obstacleHeight + birdHeight / 2 ||
        birdBottom >
          heightDecrement + obstacleHeight + obstacleGap - birdHeight / 2) &&
        obstaclesLeft > screenWidth / 2 - birdHeight / 2 &&
        obstaclesLeft < screenWidth / 2 + birdHeight / 2) ||
      ((birdBottom < heightDecrementTwo + obstacleHeight + birdHeight / 2 ||
        birdBottom >
          heightDecrementTwo + obstacleHeight + obstacleGap - birdHeight / 2) &&
        obstaclesLeftTwo > screenWidth / 2 - birdHeight / 2 &&
        obstaclesLeftTwo < screenWidth / 2 + birdHeight / 2)
    ) {
      gameOver();
    }
  });
  // Game over
  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setIsGameOver(true);
  };

  // Make bird jump
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + jumpInterval);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
          birdHeight={birdHeight}
        />
        {/* First set of obstacles */}
        <Obstacles
          color={"green"}
          obstaclesLeft={obstaclesLeft}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          gap={obstacleGap}
          randomBottom={heightDecrement}
        />
        {/* Second set of obstacles */}
        <Obstacles
          color={"yellow"}
          obstaclesLeft={obstaclesLeftTwo}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          gap={obstacleGap}
          randomBottom={heightDecrementTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
