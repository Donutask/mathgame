"use strict";
const num1Text = document.getElementById("number_one");
const num2Text = document.getElementById("number_two");
const operatorText = document.getElementById("operator");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
const explanation = document.getElementById("explanation");
let operation;
let num1;
let num2;
let answer;
let streak = 0;
function RandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function GetQuestion() {
    operation = RandomInteger(0, 3);
    const questionGenerator = generators.get(operation);
    if (questionGenerator != null) {
        const results = questionGenerator(streak);
        num1 = results.n1;
        num2 = results.n2;
        answer = results.a;
        num1Text.innerHTML = num1.toString();
        num2Text.innerHTML = num2.toString();
        operatorText.textContent = GetOperatorSymbol(operation);
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
    explanation.textContent = "";
    if (isNaN(num)) {
        explanation.innerHTML = "Please enter a Number";
    }
    else {
        if (num == answer) {
            streak++;
            if (streak > 1) {
                feedback.textContent = "Correct";
                explanation.textContent = `${streak} in a row!`;
            }
            else {
                feedback.textContent = "Correct";
            }
        }
        else {
            feedback.textContent = `Incorrect`;
            explanation.innerHTML = `${num1}${GetOperatorSymbol(operation)}${num2}=<b id="wanted-answer">${answer}</b>`;
            streak = 0;
        }
        input.value = "";
        GetQuestion();
    }
}
input.onkeydown = function (ev) {
    if (ev.key == "Enter") {
        Grade(input.value);
    }
};
document.addEventListener('DOMContentLoaded', () => {
    GetQuestion();
    input.focus();
});
