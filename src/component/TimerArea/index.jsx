/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Timer from '../Timer';
import firebase from '../firebase';
import timeOverSound from './time-over-soundfx.wav';
import {
  determineNextPeriod,
  calcNewStartStopTimes,
  calcPomoClockTime,
  checkPermissionAndShowNotification,
} from '../../services/timer';

const timeOverSoundAudio = new Audio(timeOverSound);

const updateFirebaseTime = (newValues) => {
  firebase.firestore().collection('timer').doc('time').update(newValues);
};

const TimerArea = ({ shouldAutoStart }) => {
  const [state, setState] = useState({
    periodCounter: 0,
    currentPeriod: null,
    startTime: null,
    stopTime: null,
    timeToShow: null,
    isRunning: false,
    isLoading: true,
  });

  useEffect(() => {
    const subFunc = (doc) => {
      const {
        periodCounter = 0,
        startTime = 0,
        stopTime = 0,
        periodTime,
      } = doc.data();

      const isRunning = !!startTime && !stopTime;
      const timeToShow = calcPomoClockTime(startTime, stopTime, periodTime);

      setState({
        ...state,
        periodCounter,
        currentPeriod: periodTime,
        startTime,
        stopTime,
        isRunning,
        isLoading: false,
        timeToShow,
      });
    };

    firebase.firestore()
      .collection('timer')
      .doc('time')
      .onSnapshot(subFunc);
  }, []);

  const handleTimeOver = () => {
    timeOverSoundAudio.play();
    const newCounter = state.periodCounter + 1;
    const nextPeriod = determineNextPeriod(state.currentPeriod, newCounter);
    const startTime = shouldAutoStart ? new Date().getTime() : null;

    checkPermissionAndShowNotification(nextPeriod);

    updateFirebaseTime({
      startTime,
      stopTime: null,
      periodTime: nextPeriod,
      periodCounter: newCounter === 8 ? 0 : newCounter,
    });
  };

  const handleStartClick = () => {
    const [newStartTime, newStopTime] = calcNewStartStopTimes(
      state.startTime,
      state.stopTime,
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
                startTime={state.timeToShow}
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
                  disabled={!state.isRunning}
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

TimerArea.propTypes = {
  shouldAutoStart: PropTypes.bool.isRequired,
};

export default TimerArea;
