const num1Text = document.getElementById("number_one") as HTMLParagraphElement;
const num2Text = document.getElementById("number_two") as HTMLParagraphElement;
const operatorText = document.getElementById("operator") as HTMLParagraphElement;

const input = document.getElementById("input") as HTMLInputElement;

const feedback = document.getElementById("feedback") as HTMLParagraphElement;

let currentQuestion: Question;

let streak: number = 0;

let totalCorrect: number;
let totalIncorrect: number;
let highestStreak: number;

// Min and max inclusive
function RandomInteger(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Choose random operator and get the corresponding question generator function. 
// Call function with difficulty value (questions answered right in a row) and display question on screen.
function GetQuestion() {
    const questionGenerator = generators[RandomInteger(0, 3)];

    if (questionGenerator != null) {
        currentQuestion = questionGenerator(streak);

        num1Text.innerHTML = currentQuestion.number1.toString();
        num2Text.innerHTML = currentQuestion.number2.toString();
        operatorText.textContent = currentQuestion.operator;
    }
    //error 
    else {
        num1Text.innerHTML = "uh";
        num2Text.innerHTML = "oh";
        operatorText.textContent = "?";
    }
}

// Show error if not a number, otherwise check if answer matches the multiplication and show appropriate feedback.
function Grade(value: string) {
    const num: number = parseInt(value);

    feedback.textContent = "";

    //prevent answering after time is up
    if (timeRemaining != undefined && timeRemaining <= 0 && startTime > 0) {
        return;
    }

    if (isNaN(num)) {
        feedback.innerHTML = "Please enter a Number";
    } else {
        if (num == currentQuestion.answer) {
            //Update stats
            streak++;
            totalCorrect++;
            if (streak > highestStreak) {
                highestStreak = streak;
            }

            //Show response
            if (streak > 1) {
                feedback.textContent = `${streak} in a row${streak > 9 ? "!" : ""}`;
            } else {
                feedback.textContent = "Correct";
            }
        } else {
            streak = 0;
            totalIncorrect++;

            feedback.innerHTML = `${currentQuestion.number1}${currentQuestion.operator}${currentQuestion.number2}=<b id="wanted-answer">${currentQuestion.answer}</b>`
        }

        //clear input and give new question
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
    } else {
        ShowBeginScreen();
    }
});