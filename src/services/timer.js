export const PERIODS = {
  work: { id: 'work', mins: 0, secs: 10 },
  shortBrk: { id: 'short-brk', mins: 0, secs: 2 },
  longBrk: { id: 'long-brk', mins: 0, secs: 3 },
};

export const INITIAL_PERIOD = PERIODS.work;

/**
 * A function that decreases the time by 1 second and calls
 * either the timeDecrementedCallback if the time is not over,
 * or calls timeOverCallback if the time is over.
 * @param {number} mins number of minutes
 * @param {number} secs number of seconds
 * @param {function} timeDecrementedCallback function to call when time is
 *   decremented but not over yet
 * @param {function} timeOverCallback function to call when time is over
 */
export const decrementOneSec = (mins, secs, timeDecrementedCallback, timeOverCallback) => {
  if (mins === 0 && secs === 0) {
    timeOverCallback();
  } else if (secs === 0) {
    timeDecrementedCallback([mins - 1, 59]);
  } else {
    timeDecrementedCallback([mins, secs - 1]);
  }
};

/**
 * A function that determines the next period for the timer
 * @param {object} currentPeriod the current period object
 * @param {number} counter the number of periods that have end so far
 * @return {object} next period
 */
export const determineNextPeriod = (currentPeriod, counter) => {
  // eslint-disable-next-line no-console
  console.log(currentPeriod);
  if (counter === 7) {
    return PERIODS.longBrk;
  }

  if (currentPeriod.id === 'work') {
    return PERIODS.shortBrk;
  }
  // eslint-disable-next-line no-console
  return PERIODS.work;
};

/**
 * A function that takes two times and returns the difference between (time2 - time1)
 * @param {object} time1 the time that subtracts
 * @param {object} time2 the time to subtract from
 */
export const calculateTimeDifference = (time1, time2) => Math.abs(time2 - time1);

export const calculatePeriodDifference = (time1, time2) => {
  const deferenceBetweenPeriod = (time2.mins * 60 * 1000) - time1;
  const minutes = ((deferenceBetweenPeriod / 1000) / 60);
  const seconds = ((deferenceBetweenPeriod / 1000)) % 60;
  const timeToShow = {
    mins: Math.trunc(minutes),
    secs: seconds.toFixed(0),
  };
  return timeToShow;
};

export const deferenceBetweenStartAndStopTime = (time1, time2) => Math.abs(time2 - time1);

export const timeWhenTimerStop = (time1, time2) => {
  const deference = (time2.mins * 60 * 1000) - time1;
  const minutes = ((deference / 1000) / 60);
  const seconds = ((deference / 1000)) % 60;
  const timeToShow = {
    mins: Math.trunc(minutes),
    secs: seconds.toFixed(0),
  };
  return timeToShow;
};
