const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector("body");

let timerId = null;
// const intervalId = setInterval()

startBtn.addEventListener("click", () => {
    startBtn.disabled = true; 
    stopBtn.disabled = false;
    timerId = setInterval(bgColor, 1000)
});

stopBtn.addEventListener("click", () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
  });

function bgColor() {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = color;
}

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }