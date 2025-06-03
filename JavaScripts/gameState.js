"use strict";
const startScreen = document.getElementById("start_screen");
const startButton = document.getElementById("start_button");
const gameScreen = document.getElementById("question");
const gameOverModal = document.getElementById("game_over_dialog");
const gameOverCorrectQuestions = document.getElementById("correct_stat");
const gameOverIncorrectQuestions = document.getElementById("incorrect_stat");
const gameOverStreak = document.getElementById("streak_stat");
const replayButton = document.getElementById("game_over_button");
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
