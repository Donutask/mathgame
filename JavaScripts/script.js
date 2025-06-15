"use strict";
const num1Text = document.getElementById("number_one");
const num2Text = document.getElementById("number_two");
const operatorText = document.getElementById("operator");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
let currentQuestion;
let streak = 0;
let totalQuestions;
let totalCorrect;
let totalIncorrect;
let highestStreak;
let shuffleBag;
let previousAnswer;
let includedQuestionTypes;
function RandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function RoundTo(num, dp) {
    let power = Math.pow(10, dp);
    return Math.round((num + Number.EPSILON) * power) / power;
}
function GetDifficulty() {
    return (2 * streak) + totalQuestions;
}
function MakeShuffleBag() {
    shuffleBag = [];
    for (let i = 0; i < generators.length; i++) {
        if (includedQuestionTypes[i] == true)
            for (let n = 0; n < generatorWeight[i]; n++) {
                shuffleBag.push(generators[i]);
            }
    }
}
function GetQuestion() {
    const index = RandomInteger(0, shuffleBag.length - 1);
    const questionGenerator = shuffleBag[index];
    shuffleBag.splice(index, 1);
    if (shuffleBag.length <= 0) {
        MakeShuffleBag();
    }
    if (questionGenerator != null) {
        currentQuestion = questionGenerator(GetDifficulty());
        if (currentQuestion.answer == previousAnswer) {
            GetQuestion();
            return;
        }
        previousAnswer = currentQuestion.answer;
        num1Text.innerHTML = currentQuestion.number1.toString();
        num2Text.innerHTML = currentQuestion.number2.toString();
        operatorText.textContent = currentQuestion.operator;
        totalQuestions++;
    }
    else {
        num1Text.innerHTML = "No Question!";
        num2Text.innerHTML = "";
        operatorText.textContent = "";
    }
}
function Grade(value) {
    const num = parseFloat(value);
    feedback.textContent = "";
    if (timeRemaining != undefined && timeRemaining <= 0 && startTime > 0) {
        return;
    }
    if (currentQuestion == null) {
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
    AddQuestionGenerator(Addition, 3);
    AddQuestionGenerator(Subtraction, 3);
    AddQuestionGenerator(Multiplication, 2);
    AddQuestionGenerator(Division, 2);
    AddQuestionGenerator(Percentage, 1);
    LoadOptions();
    if (startTime <= 0) {
        Begin();
    }
    else {
        ShowBeginScreen();
    }
});
