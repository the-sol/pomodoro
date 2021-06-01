/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ Time }) => {
  const { hours, minutes, seconds } = Time;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
  const [start, setStart] = useState(false);
  const [num, setNum] = useState(minutes);

  const StartHandler = () => {
    setStart(true);
  };
  const StopHandler = () => {
    setStart(false);
  };

  const reset = () => {
    setStart(false);
    if (num === 25) {
      setTime([hours, 5, seconds]);
      setNum(5);
    } else {
      setTime([hours, 25, seconds]);
      setNum(25);
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
    if (start) {
      setTimeout(() => tick(), 1000);
    }
  });

  return (
    <div>
      <p>
        {`${hrs.toString().padStart(2, '0')}:${mins
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
        {' '}
      </p>
      <button type="button" onClick={StartHandler}> Start </button>
      <button type="button" onClick={StopHandler}>Stop</button>
    </div>
  );
};

Timer.propTypes = {
  Time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
};

export default Timer;
