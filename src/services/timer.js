export const PERIODS = {
  work: { id: 'work', mins: 25, secs: 0 },
  shortBrk: { id: 'short-brk', mins: 5, secs: 0 },
  longBrk: { id: 'long-brk', mins: 15, secs: 0 },
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

  return PERIODS.work;
};
const createNotification = (text, icon) => new Notification('Pomodoro', {
  body: text,
  icon,
});
const showNotification = (nextPeriod) => {
  let text = null;
  const icon = 'https://source.unsplash.com/1600x900/?nature,water;';
  if (nextPeriod.id === 'long-brk') {
    text = `Great job! Take a long break. You have ${PERIODS.longBrk.mins} minutes.`;
  } else if (nextPeriod.id === 'work') {
    text = `Time to get back to work! Your next break starts in ${PERIODS.work.mins} minutes.`;
  } else if (nextPeriod.id === 'short-brk') {
    text = `Nice work! Take a short break. You have ${PERIODS.shortBrk.mins} minutes.`;
  }
  createNotification(text, icon);
};
export const displayNotification = (nextPeriod) => {
  if (Notification.permission === 'granted') {
    showNotification(nextPeriod);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        showNotification(nextPeriod);
      }
    });
  }
};
