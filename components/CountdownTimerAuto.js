import React, { useState, useEffect, useContext } from 'react';
import { View, Text, AppState, Button, StyleSheet } from 'react-native';
import { AuthContext } from "../store/auth-context";

const CountdownTimerAuto = () => {

  const authCtx = useContext(AuthContext);

  const initialMinutes = authCtx.sessionTimer ? Number(authCtx.sessionTimer) : 7;

  // console.log("Type of authCtx.sessionTimer =>> ", typeof authCtx.sessionTimer);
  // console.log("Countdown =>> ", initialMinutes);
  // console.log("Type of  initialMinutes =>> ", typeof initialMinutes);


  const [timeRemaining, setTimeRemaining] = useState(Number(initialMinutes * 60));
  const [isRunning, setIsRunning] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  // console.log("Countdown typeof TR1 =>> ", typeof timeRemaining);
  // console.log("Countdown TR1 =>> ", timeRemaining);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

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

  const handleAppStateChange = (nextAppState) => {
    console.log("AppState changed to:", nextAppState); // Log per verificare lo stato
    console.log("AppState is:", AppState); // Log per verificare lo stato
    // if ((appState.currentState === "inactive" || appState.currentState === "background") && nextAppState === "active") {
    if (nextAppState === "active") {
      const now = new Date().getTime();
      const lastActiveTime = authCtx.lastActiveTime || now;
      const elapsedSeconds = Math.floor((now - lastActiveTime) / 1000);

      console.log("App returning to foreground");
      console.log("Current time:", now);
      console.log("Last active time:", lastActiveTime);
      console.log("Elapsed seconds:", elapsedSeconds);

      setTimeRemaining((prevTime) => {
        const newTime = Math.max(prevTime - elapsedSeconds, 0);
        console.log("Updated timeRemaining:", newTime);
        return newTime;
      });
    }

    if (nextAppState === "background") {
      console.log("App going to background, saving lastActiveTime:", new Date().getTime());
      authCtx.lastActiveTime = new Date().getTime();

    }

    setAppState(nextAppState);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // console.log("Countdown TR 2 =>> ", timeRemaining);

  return (
    <View >
      <Text style={timeRemaining <= 300 ? styles.timerText1 : styles.timerText2}>
        {formatTime(timeRemaining)}
      </Text>
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
    color: "lightgray",
  },
});

export default CountdownTimerAuto;
