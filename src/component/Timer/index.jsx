/* eslint-disable space-before-blocks */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {
  decrementOneSec,
  determineNextPeriod,
  INITIAL_PERIOD,
  PERIODS,
} from '../../services/timer';
import timeOverSound from './time-over-soundfx.wav';

const timeOverSoundAudio = new Audio(timeOverSound);

const Timer = () => {
  const [[mins, secs], setTime] = useState([INITIAL_PERIOD.mins, INITIAL_PERIOD.secs]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(INITIAL_PERIOD);
  const tickTimeoutId = useRef(0);
  const counter = useRef(0);
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const reset = () => {
      timeOverSoundAudio.play();
      const showNotification = () => {
        let text = null;
        const img = 'https://source.unsplash.com/1600x900/?nature,water;';
        if (counter.current === 6) {
          text = `Great job! Take a long break. You have ${PERIODS.longBrk.secs} minutes.`;
          (() => new Notification('Pomodoro', {
            body: text,
            icon: img
          }))();
        } else if (currentPeriod.id === 'short-brk' || currentPeriod.id === 'long-brk') {
          text = `Time to get back to work! Your next break starts in ${PERIODS.work.secs} minutes.`;
          (() => new Notification('Pomodoro', {
            body: text,
            icon: img
          }))();
        } else if (currentPeriod.id === 'work') {
          text = `Nice work! Take a short break. You have ${PERIODS.shortBrk.secs} minutes.`;
          (() => new Notification('Pomodoro', {
            body: text,
            icon: img
          }))();
        }
      };
      if (Notification.permission === 'granted') {
        showNotification();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            showNotification();
          }
        });
      }
      setIsRunning(false);
      counter.current += 1;
      const nextPeriod = determineNextPeriod(currentPeriod, counter.current);
      if (counter.current === 7) {
        counter.current = 0;// the counter need to be -1 instead of 0 becuase there is a bug
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
