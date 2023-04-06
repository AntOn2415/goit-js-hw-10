function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

const backgroundColorChange = {
  intervalId: null,
  start() {
    btnStartEl.setAttribute('disabled', true);
    btnStopEl.removeAttribute('disabled', true);
    this.intervalId = setInterval(() => {
      const color = getRandomHexColor();
      bodyEl.style.backgroundColor = color;
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    btnStopEl.setAttribute('disabled', true);
    btnStartEl.removeAttribute('disabled', true);
  },
};

btnStartEl.addEventListener('click', () => {
  backgroundColorChange.start();
});
btnStopEl.addEventListener('click', () => {
  backgroundColorChange.stop();
});
