import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Timer from '../Timer';
import firebase from '../firebase';
import timeOverSound from './time-over-soundfx.wav';
import {
  determineNextPeriod,
  calculateTimeDifference,
  calculatePeriodDifference,
} from '../../services/timer';

const timeOverSoundAudio = new Audio(timeOverSound);

const calcPomoClockTime = (startTime, stopTime, currentPeriod) => {
  if (startTime) {
    const clockTime = new Date().getTime();
    const diff = calculateTimeDifference(clockTime, startTime);
    return calculatePeriodDifference(diff, currentPeriod);
  }

  if (stopTime) {
    const diff = calculateTimeDifference(stopTime, startTime);
    return calculatePeriodDifference(diff, currentPeriod);
  }

  return [currentPeriod.mins, currentPeriod.secs];
};

const TimerArea = () => {
  const [state, setState] = useState({
    currentPeriod: null,
    sharedStartTime: null,
    stopTimeFromDp: null,
    pomoClockTime: null,
    isRunning: false,
    counter: 0,
    isLoading: true,
  });

  useEffect(() => {
    const subFunc = (doc) => {
      console.log(doc.data());
      const { startTime = 0, stopTime = 0, periodTime } = doc.data();
      const isRunning = startTime && !stopTime;
      const pomoClockTime = calcPomoClockTime(startTime, stopTime, periodTime);

      setState({
        ...state,
        currentPeriod: periodTime,
        sharedStartTime: startTime,
        stopTimeFromDp: stopTime,
        isRunning,
        isLoading: false,
        pomoClockTime,
      });
    };

    firebase.firestore()
      .collection('timer')
      .doc('time')
      .onSnapshot(subFunc);
  }, []);

  const handleTimeOver = () => {
    timeOverSoundAudio.play();
    const newCounter = state.counter + 1;
    const nextPeriod = determineNextPeriod(state.currentPeriod, newCounter);

    setState({
      ...state,
      isRunning: false,
      counter: newCounter === 8 ? 0 : newCounter,
      currentPeriod: nextPeriod,
      pomoClockTime: [nextPeriod.mins, nextPeriod.secs],
    });
  };

  return (
    <Card>
      <Card.Body className="text-center">
        {state.isLoading
          ? <h1>Loading ...</h1>
          : (
            <Timer
              startTime={state.pomoClockTime}
              isRunning={state.isRunning}
              onTimeOver={handleTimeOver}
            />
          )}
      </Card.Body>
    </Card>
  );
};

export default TimerArea;
