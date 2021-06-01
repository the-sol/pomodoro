/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ initialTime }) => {
  const { hours, minutes, seconds } = initialTime;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPeriodMins, setCurrentPeriodMins] = useState(minutes);

  const handleStartClick = () => {
    setIsRunning(true);
  };
  const StopHandler = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    if (currentPeriodMins === 25) {
      setTime([hours, 5, seconds]);
      setCurrentPeriodMins(5);
    } else {
      setTime([hours, 25, seconds]);
      setCurrentPeriodMins(25);
    }
  };
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      reset();
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  useEffect(() => {
    if (isRunning) {
      setTimeout(() => tick(), 1000);
    }
  });

  return (
    <>
      <p>
        {`${hrs.toString().padStart(2, '0')}:${mins
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
        {' '}
      </p>
      <button type="button" onClick={handleStartClick}> Start </button>
      <button type="button" onClick={StopHandler}>Stop</button>
    </>
  );
};

Timer.propTypes = {
  initialTime: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
};

export default Timer;
