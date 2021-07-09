import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {
  decrementOneSec,
  determineNextPeriod,
  INITIAL_PERIOD,
  checkPermissionAndShowNotification,
} from '../../services/timer';
import timeOverSound from './time-over-soundfx.wav';

const timeOverSoundAudio = new Audio(timeOverSound);

const Timer = ({ shouldAutoStart }) => {
  const [[mins, secs], setTime] = useState([INITIAL_PERIOD.mins, INITIAL_PERIOD.secs]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(INITIAL_PERIOD);
  const tickTimeoutId = useRef(0);
  const [counter, setCounter] = useState(1);

  const endCurrentAndStartNextPeriod = () => {
    timeOverSoundAudio.play();
    setIsRunning(false);
    setCounter(counter + 1);
    const nextPeriod = determineNextPeriod(currentPeriod, counter);
    setCurrentPeriod(nextPeriod);
    checkPermissionAndShowNotification(nextPeriod);
    setTime([nextPeriod.mins, nextPeriod.secs]);
    if (shouldAutoStart) {
      setIsRunning(true);
    }
    if (counter === 7) {
      setCounter(0);
    }
  };
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const tick = () => decrementOneSec(mins, secs, setTime, endCurrentAndStartNextPeriod);
    tickTimeoutId.current = setTimeout(tick, 1000);
  });
  const stopTime = () => {
    setIsRunning(false);
    clearTimeout(tickTimeoutId.current);
  };

  const handleStartClick = () => {
    setIsRunning(true);
  };

  const handleStopClick = () => {
    stopTime();
  };

  const handleResetClick = () => {
    stopTime();
    setTime([currentPeriod.mins, currentPeriod.secs]);
  };

  const handleNextClick = () => {
    endCurrentAndStartNextPeriod();
    clearTimeout(tickTimeoutId.current);
  };
  return (
    <>
      <h1>
        <h3>{currentPeriod.id}</h3>
        {`${mins.toString().padStart(2, '0')}:
        ${secs.toString().padStart(2, '0')}`}
        {' '}
      </h1>
      <div className="d-flex justify-content-around">
        <Button variant="dark" size="lg" type="button" onClick={handleStartClick}>Start &#128525;</Button>
        <Button variant="info" size="lg" type="button" onClick={handleStopClick}>Stop &#128564;</Button>
        <Button variant="info" size="lg" type="button" onClick={handleResetClick}>Reset &#9194;</Button>
        <Button variant="dark" size="lg" type="button" onClick={handleNextClick}>Next &#9193;</Button>
      </div>
    </>
  );
};

Timer.propTypes = {
  shouldAutoStart: PropTypes.bool.isRequired,
};

export default Timer;
