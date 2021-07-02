import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
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
  if (stopTime) {
    const diff = calculateTimeDifference(stopTime, startTime);
    return calculatePeriodDifference(diff, currentPeriod);
  }

  if (startTime) {
    const clockTime = new Date().getTime();
    const diff = calculateTimeDifference(clockTime, startTime);
    return calculatePeriodDifference(diff, currentPeriod);
  }

  return [currentPeriod.mins, currentPeriod.secs];
};

const calcNewStartStopTimes = (startTime, stopTime) => {
  const clockTime = new Date().getTime();
  const sub = stopTime ? stopTime - startTime : 0;
  const newStartTime = clockTime - sub;
  const newStopTime = null;
  return [newStartTime, newStopTime];
};

const updateFirebaseTime = (newValues) => {
  firebase.firestore().collection('timer').doc('time').update(newValues);
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
      const {
        counter = 0,
        startTime = 0,
        stopTime = 0,
        periodTime,
      } = doc.data();

      const isRunning = !!startTime && !stopTime;
      const pomoClockTime = calcPomoClockTime(startTime, stopTime, periodTime);

      setState({
        ...state,
        counter,
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

    updateFirebaseTime({
      startTime: null,
      stopTime: null,
      periodTime: nextPeriod,
      counter: newCounter === 8 ? 0 : newCounter,
    });
  };

  const handleStartClick = () => {
    const [newStartTime, newStopTime] = calcNewStartStopTimes(
      state.sharedStartTime,
      state.stopTimeFromDp,
    );
    updateFirebaseTime({
      startTime: newStartTime,
      stopTime: newStopTime,
    });
  };

  const handleStopClick = () => {
    updateFirebaseTime({
      stopTime: new Date().getTime(),
    });
  };

  const handleResetClick = () => {
    updateFirebaseTime({
      startTime: null,
      stopTime: null,
    });
  };

  return (
    <Card>
      <Card.Body className="text-center">
        {state.isLoading
          ? <h1>Loading ...</h1>
          : (
            <>
              <Timer
                startTime={state.pomoClockTime}
                isRunning={state.isRunning}
                onTimeOver={handleTimeOver}
              />
              <div className="d-flex justify-content-around">
                <Button
                  variant="dark"
                  size="lg"
                  type="button"
                  onClick={handleStartClick}
                >
                  Start &#128525;
                </Button>
                <Button
                  variant="info"
                  size="lg"
                  type="button"
                  onClick={handleStopClick}
                >
                  Stop &#128564;
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  type="button"
                  onClick={handleResetClick}
                  disabled={state.isRunning}
                >
                  Reset
                </Button>
              </div>
            </>
          )}
      </Card.Body>
    </Card>
  );
};

export default TimerArea;
