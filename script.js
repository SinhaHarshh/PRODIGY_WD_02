let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapResetBtn = document.getElementById('lapReset');
const lapsList = document.getElementById('laps');

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    String(hours).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0')
  );
}

function startStop() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    startStopBtn.textContent = 'Stop';
    lapResetBtn.textContent = 'Lap';
    timerInterval = setInterval(updateTime, 1000);
    
  } else {
    startStopBtn.textContent = 'Start';
    lapResetBtn.textContent = 'Reset';
    clearInterval(timerInterval);
    startTime = null;
  }
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = (currentTime - startTime) / 1000;
  display.textContent = formatTime(elapsedTime);
}

function lapReset() {
  
  if (!startTime) {
    startTime = null;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
  } else {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}

startStopBtn.addEventListener('click', startStop);
lapResetBtn.addEventListener('click', lapReset);