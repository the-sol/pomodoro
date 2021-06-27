export const PERIODS = {
  work: { id: 'work', mins: 0, secs: 5 },
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
  if (counter === 6) {
    return PERIODS.longBrk;
  }

  if (currentPeriod.id === 'work') {
    return PERIODS.shortBrk;
  }

  return PERIODS.work;
};
