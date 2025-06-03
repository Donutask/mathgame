const timerText = document.getElementById("timer") as HTMLParagraphElement;

let timerStarted: boolean = false;
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
    timeRemaining = 61;
    TickTimer();
    timerInterval = setInterval(TickTimer, 1000);
    timerStarted = true;
};