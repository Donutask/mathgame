"use strict";
const num1Text = document.getElementById("number_one");
const num2Text = document.getElementById("number_two");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
const explanation = document.getElementById("explanation");
let minNum = 1;
let maxNum = 12;
let num1;
let num2;
let streak;
function GenerateNumbers() {
    num1 = RandomInteger(minNum, maxNum);
    num2 = RandomInteger(minNum, maxNum);
    num1Text.innerHTML = num1.toString();
    num2Text.innerHTML = num2.toString();
}
function RandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
input.onkeydown = function (ev) {
    if (ev.key == "Enter") {
        Grade(input.value);
    }
};
function Grade(value) {
    const num = parseInt(value);
    feedback.textContent = "";
    explanation.textContent = "";
    if (isNaN(num)) {
        explanation.innerHTML = "Please enter a Number";
    }
    else {
        if (num1 * num2 == num) {
            streak++;
            if (streak > 1) {
                feedback.textContent = "Correct";
                explanation.textContent = `${streak} in a row!`;
                maxNum = Math.floor(12 + (streak / 3));
            }
            else {
                feedback.textContent = "Correct";
            }
        }
        else {
            feedback.textContent = `Incorrect`;
            explanation.innerHTML = `${num1}×${num2}=<b id="wanted-answer">${num1 * num2}</b>`;
            ResetStreak();
        }
        input.value = "";
        GenerateNumbers();
    }
}
function ResetStreak() {
    minNum = 1;
    maxNum = 12;
    streak = 0;
}
GenerateNumbers();
ResetStreak();
input.focus();
