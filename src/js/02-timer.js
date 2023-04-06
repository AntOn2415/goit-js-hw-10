import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// import "notiflix/dist/notiflix-3.2.6.min.css"

const timerEl = document.querySelector('.timer');
const btnStartEl = document.querySelector('button[data-start]');
const daysSpanEl = timerEl.querySelector('span[data-days]');
const hoursSpanEl = timerEl.querySelector('span[data-hours]');
const minutesSpanEl = timerEl.querySelector('span[data-minutes]');
const secondsSpanEl = timerEl.querySelector('span[data-seconds]');

btnStartEl.setAttribute('disabled', true);

const styles = `
<style>
  .timer {
    display: flex;
    gap: 10px;
  }
  .field {
    display: flex;
    flex-direction: column;
  } 
  .value {
    display: flex;
    justify-content: center;
    font-size: 42px;
  }
  .label {
    display: flex;
    justify-content: center;
  }
</style>`;

timerEl.insertAdjacentHTML('beforebegin', styles);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDateInMilliseconds = selectedDates[0].getTime();
    const currentDate = options.defaultDate.getTime();
    const remainingTime = countsRemainingTime(
      selectedDateInMilliseconds,
      currentDate
    );
    if (remainingTime < 0) {
      btnStartEl.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStartEl.removeAttribute('disabled');
      timer.remainingTime = remainingTime;
    }
  },
};

flatpickr('#datetime-picker', options, {});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function countsRemainingTime(selectedTime, currentTime) {
  return selectedTime - currentTime;
}

class Timer {
  constructor({ onTick, remainingTime }) {
    this.interval = null;
    this.isActive = false;
    this.onTick = onTick;
    this.remainingTime = remainingTime;
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.interval = setInterval(() => {
      const deltaTime = this.remainingTime;
      const time = convertMs(deltaTime);
      this.onTick(time);
      this.remainingTime -= 1000;
      if (this.remainingTime < 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.isActive = false;
    this.remainingTime = 0;
  }
}

btnStartEl.addEventListener('click', () => {
  timer.start();
});

const timer = new Timer({
  onTick: upDateTimer,
  remainingTime: 0,
});

function upDateTimer({ days, hours, minutes, seconds }) {
  daysSpanEl.textContent = `${days}`;
  hoursSpanEl.textContent = `${hours}`;
  minutesSpanEl.textContent = `${minutes}`;
  secondsSpanEl.textContent = `${seconds}`;
}
