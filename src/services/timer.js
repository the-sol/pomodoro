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
 * A function that takes two times and returns the difference between them (time2 - time1)
 * @param {number} time1 the time that subtracts
 * @param {number} time2 the time to subtract from
 */
const calculateTimeDifference = (time1, time2) => Math.abs(time2 - time1);

/**
* A function that take two parameter {time2} is object have time as minute and seconds
the second parameter {time1} is the time that subtracts, this function convert the
the object to millisecond and calculate the deference between the two times return new
time as minutes and seconds in an array
* @param {number} time1 the time that subtracts
* @param {object} time2 the time to subtract from
*/
const calculatePeriodDifference = (time1, time2) => {
  const deferenceBetweenPeriod = (time2.mins * 60 * 1000 + time2.secs * 1000) - time1;
  const minutes = ((deferenceBetweenPeriod / 1000) / 60);
  const seconds = ((deferenceBetweenPeriod / 1000)) % 60;
  return [Math.trunc(minutes), Math.round(seconds)];
};

/**
 * A function that take time as two parameters
 * @param {number} startTime time in millisecond
 * @param {number} stopTime  time in millisecond
 * @returns {array} return two time in millisecond as an array
 */
export const calcNewStartStopTimes = (startTime, stopTime) => {
  const clockTime = new Date().getTime();
  const deferenceStartAndStopTime = stopTime ? stopTime - startTime : 0;
  const newStartTime = clockTime - deferenceStartAndStopTime;
  const newStopTime = null;
  return [newStartTime, newStopTime];
};
/**
 * A function that take three parameters to clculate the time that appear on the UI
 * @param {number} startTime time in milliseconds
 * @param {number} stopTime  time in milliseconds
 * @param {object} currentPeriod object has time as minutes and seconds
 * @returns {array} has the new times as minutes and seconds
 */
export const calcPomoClockTime = (startTime, stopTime, currentPeriod) => {
  if (stopTime) {
    const startAndStopTimeDeferenceMs = calculateTimeDifference(stopTime, startTime);
    return calculatePeriodDifference(startAndStopTimeDeferenceMs, currentPeriod);
  }

  if (startTime) {
    const clockTime = new Date().getTime();
    const otherUsersAndFirstUserStartTimeDeference = calculateTimeDifference(clockTime, startTime);
    return calculatePeriodDifference(otherUsersAndFirstUserStartTimeDeference, currentPeriod);
  }

  return [currentPeriod.mins, currentPeriod.secs];
};
