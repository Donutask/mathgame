"use strict";
const timerText = document.getElementById("timer");
let startTime = 60;
let timeRemaining;
let timerInterval;
function TickTimer() {
    timeRemaining--;
    timerText.innerHTML = `${timeRemaining}s`;
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        GameOver();
    }
}
function StartTimer() {
    if (startTime <= 0) {
        return;
    }
    timeRemaining = startTime + 1;
    TickTimer();
    timerInterval = setInterval(TickTimer, 1000);
}
;
