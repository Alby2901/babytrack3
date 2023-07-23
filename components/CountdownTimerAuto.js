import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from "../store/auth-context";

const CountdownTimerAuto = () => {

  const authCtx = useContext(AuthContext);
  
  const initialMinutes = Number(authCtx.sessionTimer);
  
  // console.log("Type of authCtx.sessionTimer =>> ", typeof authCtx.sessionTimer);
  // console.log("Countdown =>> ", initialMinutes);
  // console.log("Type of  initialMinutes =>> ", typeof initialMinutes);

  
  const [timeRemaining, setTimeRemaining] = useState(Number(initialMinutes * 60));
  const [isRunning, setIsRunning] = useState(true);

  // console.log("Countdown typeof TR1 =>> ", typeof timeRemaining);
  // console.log("Countdown TR1 =>> ", timeRemaining);

  useEffect(() => {
    let interval;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  const handleStartTimer = () => {
    setIsRunning(true);
    setTimeRemaining(initialMinutes * 60);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // console.log("Countdown TR 2 =>> ", timeRemaining);

  return (
    <View >
      <Text style={timeRemaining <= 60 ? styles.timerText1 : styles.timerText2}>{formatTime(timeRemaining)}</Text>
      {/* <Text style={styles.timerText}>pippo</Text> */}
      {/* {!isRunning ? (
        <Button title="Start Timer" onPress={handleStartTimer} />
      ) : (
        <Button title="Stop Timer" onPress={handleStopTimer} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText1: {
    fontSize: 10,
    fontWeight: "bold",
    color: "red",
  },
  timerText2: {
    fontSize: 10,
    fontWeight: "bold",
    color: "grey",
  },
});

export default CountdownTimerAuto;
