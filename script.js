var num1Text = document.getElementById("number_one");
var num2Text = document.getElementById("number_two");

var minNum = 1;
var maxNum = 12;

var num1;
var num2;

var streak;

//makes 2 numbers for question
function GenerateNumbers() {
    num1 = getRandomInt(minNum, maxNum);
    num2 = getRandomInt(minNum, maxNum);

    num1Text.innerHTML = num1.toString();
    num2Text.innerHTML = num2.toString();
}

//min and max inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var input = document.getElementById("input");

//when input explicitly entered
input.onkeydown = function (ev) {
    if (ev.key == "Enter") {
        Grade(input.value);
    }
}

var feedback = document.getElementById("feedback");


function Grade(value) {
    const num = parseInt(value);

    if (isNaN(num)) {
        feedback.innerHTML = "Not a Number";
    } else {
        if (num1 * num2 == num) {
            streak++;
            if (streak > 1) {
                feedback.innerHTML = `Correct. ${streak} in a row!`;

                //step it up a bit if your going well ;)
                if (streak > 25) {
                    maxNum = 99;
                } else if (streak > 10) {
                    maxNum = 24;
                }

            } else {
                feedback.innerHTML = "Correct!";
            }
        } else {
            feedback.innerHTML = `Incorrect. ${num1}×${num2}=${num1 * num2}`;
            BreakStreak();
        }

        input.value = "";
        GenerateNumbers();
    }
}

function BreakStreak() {
    minNum = 1;
    maxNum = 12;
    streak = 0;
}

document.onload = new function () {
    GenerateNumbers();
}