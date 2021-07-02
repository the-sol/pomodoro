import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  decrementOneSec,
} from '../../services/timer';

const Timer = ({
  startTime,
  isRunning,
  onTimeOver,
}) => {
  const [[mins, secs], setTime] = useState(startTime);
  const tickTimeoutId = useRef(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const tick = () => decrementOneSec(mins, secs, setTime, onTimeOver);
    tickTimeoutId.current = setTimeout(tick, 1000);
  });

  useEffect(() => setTime(startTime), [startTime]);

  if (!isRunning && tickTimeoutId.current) {
    clearTimeout(tickTimeoutId.current);
  }

  return (
    <h1>
      {`${mins.toString().padStart(2, '0')}:
      ${secs.toString().padStart(2, '0')}`}
      {' '}
    </h1>
  );
};

Timer.propTypes = {
  startTime: PropTypes.arrayOf(PropTypes.number).isRequired,
  isRunning: PropTypes.bool.isRequired,
  onTimeOver: PropTypes.func.isRequired,
};

export default Timer;
