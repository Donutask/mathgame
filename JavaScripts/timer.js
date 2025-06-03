"use strict";
const timerText = document.getElementById("timer");
let timerStarted = false;
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
    timeRemaining = 61;
    TickTimer();
    timerInterval = setInterval(TickTimer, 1000);
    timerStarted = true;
}
;
