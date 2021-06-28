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
  const [periodText, setPeriodText] = useState(INITIAL_PERIOD.id);
  const tickTimeoutId = useRef(0);
  const counter = useRef(0);
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
      setPeriodText(nextPeriod.id);
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
      <h1>
        {`${mins.toString().padStart(2, '0')}:
        ${secs.toString().padStart(2, '0')}`}
        {' '}
      </h1>
      <div className="d-flex justify-content-around">
        <Button variant="dark" size="lg" type="button" onClick={handleStartClick}>Start &#128525;</Button>
        <h3>{periodText}</h3>
        <Button variant="info" size="lg" type="button" onClick={handleStopClick}>Stop &#128564;</Button>
      </div>
    </>
  );
};

export default Timer;
