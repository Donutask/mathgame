const startScreen = document.getElementById("start_screen") as HTMLDivElement;
const startButton = document.getElementById("start_button") as HTMLButtonElement;

const gameScreen = document.getElementById("question") as HTMLDivElement;

const gameOverModal = document.getElementById("game_over_dialog") as HTMLDialogElement;
const gameOverCorrectQuestions = document.getElementById("correct_stat") as HTMLElement;
const gameOverIncorrectQuestions = document.getElementById("incorrect_stat") as HTMLElement;
const gameOverStreak = document.getElementById("streak_stat") as HTMLElement;
const replayButton = document.getElementById("game_over_button") as HTMLButtonElement;


function Begin() {
    totalCorrect = 0;
    totalIncorrect = 0;
    highestStreak = 0;

    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    GetQuestion();
    StartTimer();

    input.value="";
    input.focus();
}

function GameOver() {
    gameOverModal.showModal();

    gameOverCorrectQuestions.textContent = totalCorrect.toString();
    gameOverIncorrectQuestions.textContent = totalIncorrect.toString();
    gameOverStreak.textContent = highestStreak.toString();

    replayButton.blur();
}

function ShowBeginScreen() {
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    gameOverModal.close();

    feedback.textContent = "";
    explanation.textContent = "";
    timerText.textContent = "";

    startButton.focus();
}

ShowBeginScreen();