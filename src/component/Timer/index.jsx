import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import firebase from '../firebase';
import {
  decrementOneSec,
  determineNextPeriod,
  calculateTimeDifference,
  calculatePeriodDifference,
  deferenceBetweenStartAndStopTime,
  timeWhenTimerStop,
} from '../../services/timer';
import timeOverSound from './time-over-soundfx.wav';

const timeOverSoundAudio = new Audio(timeOverSound);

const Timer = () => {
  const [[mins, secs], setTime] = useState([0, 0]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const sharedStartTime = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const stopTimeFromDp = useRef(null);
  const tickTimeoutId = useRef(0);
  const counter = useRef(0);
  useEffect(() => {
    const subFunc = (doc) => {
      sharedStartTime.current = doc.data().startTime;
      stopTimeFromDp.current = doc.data().stopTime;
      const dbPeriodTime = doc.data().periodTime;
      const receivedIsRunning = doc.data().boolean;
      setIsRunning(receivedIsRunning);
      setCurrentPeriod(dbPeriodTime);
      if (dbPeriodTime && !stopTimeFromDp.current) {
        setTime([dbPeriodTime.mins, dbPeriodTime.secs]);
      }
      if (sharedStartTime.current && !stopTimeFromDp.current) {
        setIsRunning(true);
      }
    };
    firebase.firestore()
      .collection('timer')
      .doc('time')
      .onSnapshot(subFunc);
  }, []);
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const reset = () => {
      timeOverSoundAudio.play();
      setIsRunning(false);
      counter.current += 1;
      const nextPeriod = determineNextPeriod(currentPeriod, counter.current);
      if (counter.current === 8) {
        counter.current = 0;
      }
      setCurrentPeriod(nextPeriod);
      setTime([nextPeriod.mins, nextPeriod.secs]);
      sharedStartTime.current = null;
    };
    const tick = () => decrementOneSec(mins, secs, setTime, reset);
    tickTimeoutId.current = setTimeout(tick, 1000);
  });
  useEffect(() => {
    if (sharedStartTime.current && isRunning) {
      const clockTime = new Date().getTime();
      const DeferenceBetweenStartTime = calculateTimeDifference(
        clockTime,
        sharedStartTime.current,
      );
      const timeToShow = calculatePeriodDifference(
        DeferenceBetweenStartTime,
        currentPeriod,
      );
      setTime([timeToShow.mins, timeToShow.secs]);
    }
    if (stopTimeFromDp.current && !isRunning) {
      const deference = deferenceBetweenStartAndStopTime(
        sharedStartTime.current,
        stopTimeFromDp.current,
      );
      const timeToShow = timeWhenTimerStop(
        deference,
        currentPeriod,
      );
      setTime([timeToShow.mins, timeToShow.secs]);
    }
  }, [sharedStartTime.current]);
  const handleStartClick = () => {
    setIsRunning(true);
    const clockTime = new Date().getTime();
    firebase.firestore().collection('timer').doc('time').update({
      startTime: clockTime,
      boolean: true,
    });
  };

  const handleStopClick = () => {
    setIsRunning(false);
    clearTimeout(tickTimeoutId.current);
    const stopTimeForDp = new Date().getTime();
    firebase.firestore().collection('timer').doc('time').update({
      stopTime: stopTimeForDp,
      boolean: false,
    });
  };
  if (!sharedStartTime.current && !currentPeriod) {
    return <h1>Loading ...</h1>;
  }
  if (!sharedStartTime.current && currentPeriod) {
    return (
      <>
        <h1>
          {`${mins.toString().padStart(2, '0')}:
              ${secs.toString().padStart(2, '0')}`}
          {' '}
        </h1>
        <div className="d-flex justify-content-around">
          <Button variant="dark" size="lg" type="button" onClick={handleStartClick}>Start &#128525;</Button>
          <Button variant="info" size="lg" type="button" onClick={handleStopClick}>Stop &#128564;</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>
        {`${mins.toString().padStart(2, '0')}:
        ${secs.toString().padStart(2, '0')}`}
        {' '}
      </h1>
      <div className="d-flex justify-content-around">
        <Button variant="dark" size="lg" type="button" onClick={handleStartClick}>Start &#128525;</Button>
        <Button variant="info" size="lg" type="button" onClick={handleStopClick}>Stop &#128564;</Button>
      </div>
    </>
  );
};

export default Timer;
