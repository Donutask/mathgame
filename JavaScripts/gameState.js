"use strict";
const startScreen = document.getElementById("start_screen");
const startButton = document.getElementById("start_button");
const gameScreen = document.getElementById("question");
const gameOverModal = document.getElementById("game_over_dialog");
const gameOverHeading = document.getElementById("game_over_heading");
const gameOverCorrectQuestions = document.getElementById("correct_stat");
const gameOverIncorrectQuestions = document.getElementById("incorrect_stat");
const gameOverStreak = document.getElementById("streak_stat");
const replayButton = document.getElementById("game_over_button");
const settingsButton = document.getElementById("settings_button");
const endGameButton = document.getElementById("end_button");
function Begin() {
    totalCorrect = 0;
    totalIncorrect = 0;
    highestStreak = 0;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    GetQuestion();
    StartTimer();
    input.value = "";
    input.focus();
    if (startTime > 0) {
        endGameButton.classList.remove("hidden");
        settingsButton.classList.add("hidden");
    }
    else {
        endGameButton.classList.add("hidden");
        settingsButton.classList.remove("hidden");
    }
}
function GameOver() {
    gameOverModal.showModal();
    gameOverCorrectQuestions.textContent = totalCorrect.toString();
    gameOverIncorrectQuestions.textContent = totalIncorrect.toString();
    gameOverStreak.textContent = highestStreak.toString();
    if (timeRemaining <= 0 && startTime > 0) {
        gameOverHeading.textContent = "Time's Up";
    }
    else {
        gameOverHeading.textContent = "Game Over!";
    }
    replayButton.blur();
}
function EndGame() {
    GameOver();
    timeRemaining = 0;
    clearInterval(timerInterval);
}
function ShowBeginScreen() {
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    gameOverModal.close();
    feedback.textContent = "";
    explanation.textContent = "";
    timerText.textContent = "";
    startButton.focus();
    endGameButton.classList.add("hidden");
    settingsButton.classList.remove("hidden");
}
