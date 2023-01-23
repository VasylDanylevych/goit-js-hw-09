import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const daysEl = document.querySelector('span[data-days]');
const hoursEL = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

let timerId = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    selectedDate: null,
    onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
        startBtn.disabled = true;
        window.alert("Please choose a date in the future")
        } else {
            options.selectedDate = selectedDates[0];
            startBtn.disabled = false;
        }
    },
};

flatpickr(input, options);

startBtn.addEventListener("click", () =>{
    timerId = setInterval(timer, 1000);
});

function timer() {
    const currentDate = Date.now();
    const delta = options.selectedDate - currentDate;
    const components = convertMs(delta);
    const formattedDay = addLeadingZero(components.days);
    const formattedHour = addLeadingZero(components.hours);
    const formattedMinute = addLeadingZero(components.minutes);
    const formattedSecond = addLeadingZero(components.seconds);
    daysEl.textContent = formattedDay;
    hoursEL.textContent = formattedHour;
    minutesEl.textContent = formattedMinute;
    secondsEl.textContent = formattedSecond;
    if (delta <= 0) {
        clearInterval(timerId);
    };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
