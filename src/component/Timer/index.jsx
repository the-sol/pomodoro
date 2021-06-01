import React, { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const reset = () => {
      timeOverSoundAudio.play();
      setIsRunning(false);
      const nextPeriod = determineNextPeriod(currentPeriod);
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

  return (
    <>
      <p>
        {`${mins.toString().padStart(2, '0')}:
        ${secs.toString().padStart(2, '0')}`}
        {' '}
      </p>
      <button type="button" onClick={handleStartClick}>Start</button>
      <button type="button" onClick={handleStopClick}>Stop</button>
    </>
  );
};

export default Timer;
