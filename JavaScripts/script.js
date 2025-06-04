"use strict";
const num1Text = document.getElementById("number_one");
const num2Text = document.getElementById("number_two");
const operatorText = document.getElementById("operator");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
let currentQuestion;
let streak = 0;
let totalCorrect;
let totalIncorrect;
let highestStreak;
function RandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function GetQuestion() {
    const questionGenerator = generators[RandomInteger(0, 3)];
    if (questionGenerator != null) {
        currentQuestion = questionGenerator(streak);
        num1Text.innerHTML = currentQuestion.number1.toString();
        num2Text.innerHTML = currentQuestion.number2.toString();
        operatorText.textContent = currentQuestion.operator;
    }
    else {
        num1Text.innerHTML = "uh";
        num2Text.innerHTML = "oh";
        operatorText.textContent = "?";
    }
}
function Grade(value) {
    const num = parseInt(value);
    feedback.textContent = "";
    if (timeRemaining != undefined && timeRemaining <= 0 && startTime > 0) {
        return;
    }
    if (isNaN(num)) {
        feedback.innerHTML = "Please enter a Number";
    }
    else {
        if (num == currentQuestion.answer) {
            streak++;
            totalCorrect++;
            if (streak > highestStreak) {
                highestStreak = streak;
            }
            if (streak > 1) {
                feedback.textContent = `${streak} in a row${streak > 9 ? "!" : ""}`;
            }
            else {
                feedback.textContent = "Correct";
            }
        }
        else {
            streak = 0;
            totalIncorrect++;
            feedback.innerHTML = `${currentQuestion.number1}${currentQuestion.operator}${currentQuestion.number2}=<b id="wanted-answer">${currentQuestion.answer}</b>`;
        }
        input.value = "";
        GetQuestion();
    }
}
input.addEventListener("change", function () {
    Grade(input.value);
});
document.addEventListener("DOMContentLoaded", function () {
    LoadOptions();
    if (startTime <= 0) {
        Begin();
    }
    else {
        ShowBeginScreen();
    }
});
