const timerText = document.getElementById("timer") as HTMLParagraphElement;

let startTime: number = 60;
let timeRemaining: number;
let timerInterval: number;

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
};