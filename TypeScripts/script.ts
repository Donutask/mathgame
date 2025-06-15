const num1Text = document.getElementById("number_one") as HTMLParagraphElement;
const num2Text = document.getElementById("number_two") as HTMLParagraphElement;
const operatorText = document.getElementById("operator") as HTMLParagraphElement;

const input = document.getElementById("input") as HTMLInputElement;

const feedback = document.getElementById("feedback") as HTMLParagraphElement;

let currentQuestion: Question;

let streak: number = 0;

let totalQuestions: number;
let totalCorrect: number;
let totalIncorrect: number;
let highestStreak: number;

let shuffleBag: ((difficulty: number) => Question)[];
let previousAnswer: number;
let includedQuestionTypes: boolean[];

// Min and max inclusive
function RandomInteger(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RoundTo(num: number, dp: number): number {
    let power = Math.pow(10, dp);
    return Math.round((num + Number.EPSILON) * power) / power;
}

//Choose random operator and get the corresponding question generator function. 
// Call function with difficulty value (questions answered right in a row) and display question on screen.
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
    //error 
    else {
        num1Text.innerHTML = "No Question!";
        num2Text.innerHTML = "";
        operatorText.textContent = "";
    }
}

function GetDifficulty(): number {
    return streak + totalQuestions;
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

// Show error if not a number, otherwise check if answer matches the multiplication and show appropriate feedback.
function Grade(value: string) {
    const num: number = parseFloat(value);

    feedback.textContent = "";

    //prevent answering after time is up
    if (timeRemaining != undefined && timeRemaining <= 0 && startTime > 0) {
        return;
    }

    if (currentQuestion == null) {
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