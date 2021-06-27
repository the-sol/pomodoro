import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {
  decrementOneSec,
  determineNextPeriod,
  INITIAL_PERIOD,
} from '../../services/timer';
import timeOverSound from './time-over-soundfx.wav';

const timeOverSoundAudio = new Audio(timeOverSound);

const Timer = () => {
  const [[mins, secs], setTime] = useState([INITIAL_PERIOD.mins, INITIAL_PERIOD.secs]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(INITIAL_PERIOD);
  const tickTimeoutId = useRef(0);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const reset = () => {
      timeOverSoundAudio.play();
      setIsRunning(false);
      setCounter(counter + 1);
      const nextPeriod = determineNextPeriod(currentPeriod, counter);
      if (counter === 6) {
        setCounter(-1);
      }
      setCurrentPeriod(nextPeriod);
      setTime([nextPeriod.mins, nextPeriod.secs]);
    };
    const tick = () => decrementOneSec(mins, secs, setTime, reset);
    tickTimeoutId.current = setTimeout(tick, 1000);
  });

  const handleStartClick = () => {
    setIsRunning(true);
  };

  const handleStopClick = () => {
    setIsRunning(false);
    clearTimeout(tickTimeoutId.current);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    clearTimeout(tickTimeoutId.current);
    setTime([currentPeriod.mins, currentPeriod.secs]);
  };

  const handleNextClick = () => {
    const nextPeriod = determineNextPeriod(currentPeriod, counter);
    clearTimeout(tickTimeoutId.current);
    setTime([nextPeriod.mins, nextPeriod.secs]);
    setCurrentPeriod(nextPeriod);
    setIsRunning(false);
    setCounter(counter + 1);
    timeOverSoundAudio.play();
    if (counter === 6) {
      setCounter(-1);
    }
  };

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
        <Button variant="info" size="lg" type="button" onClick={handleResetClick}>Reset &#9194;</Button>
        <Button variant="dark" size="lg" type="button" onClick={handleNextClick}>Next &#9193;</Button>
      </div>
    </>
  );
};

export default Timer;
