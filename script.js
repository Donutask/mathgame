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

// Makes 2 random numbers for question
function GenerateNumbers() {
    num1 = RandomInteger(minNum, maxNum);
    num2 = RandomInteger(minNum, maxNum);

    num1Text.innerHTML = num1.toString();
    num2Text.innerHTML = num2.toString();
}

// Min and max inclusive
function RandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// When input explicitly entered
input.onkeydown = function (ev) {
    if (ev.key == "Enter") {
        Grade(input.value);
    }
}

// Show error if not a number, otherwise check if answer matches the multiplication and show appropriate feedback.
function Grade(value) {
    const num = parseInt(value);

    feedback.textContent = "";
    explanation.textContent = "";

    if (isNaN(num)) {
        explanation.innerHTML = "Please enter a Number";
    } else {
        if (num1 * num2 == num) {
            streak++;
            if (streak > 1) {
                feedback.textContent = "Correct";
                explanation.textContent = `${streak} in a row!`;

                //step it up a bit if your going well ;)
                maxNum = Math.floor(12 + (streak / 3));
            } else {
                feedback.textContent = "Correct";
            }
        } else {
            feedback.textContent = `Incorrect`;
            explanation.innerHTML = `${num1}×${num2}=<b id="wanted-answer">${num1 * num2}</b>`
            ResetStreak();
        }

        //clear input and give new question
        input.value = "";
        GenerateNumbers();
    }
}

// Getting a question wrong resets the streak and difficulty
function ResetStreak() {
    minNum = 1;
    maxNum = 12;
    streak = 0;
}

// Make problem on start
document.onload = new function () {
    GenerateNumbers();
    ResetStreak();
    input.focus();
}