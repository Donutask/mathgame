const num1Text = document.getElementById("number_one") as HTMLParagraphElement;
const num2Text = document.getElementById("number_two") as HTMLParagraphElement;
const operatorText = document.getElementById("operator") as HTMLParagraphElement;

const input = document.getElementById("input") as HTMLInputElement;

const feedback = document.getElementById("feedback") as HTMLParagraphElement;
const explanation = document.getElementById("explanation") as HTMLParagraphElement;

let operation: Operator;
let num1: number;
let num2: number;
let answer: number;

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
    operation = RandomInteger(0, 3) as Operator;

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
    explanation.textContent = "";

    if (timeRemaining <= 0) {
        return;
    }

    if (isNaN(num)) {
        explanation.innerHTML = "Please enter a Number";
    } else {
        if (num == answer) {
            //Update stats
            streak++;
            totalCorrect++;
            if (streak > highestStreak) {
                highestStreak = streak;
            }

            //Show response
            if (streak > 1) {
                feedback.textContent = "Correct";
                explanation.textContent = `${streak} in a row!`;
            } else {
                feedback.textContent = "Correct";
            }
        } else {
            streak = 0;
            totalIncorrect++;

            feedback.textContent = `Incorrect`;
            explanation.innerHTML = `${num1}${GetOperatorSymbol(operation)}${num2}=<b id="wanted-answer">${answer}</b>`
        }

        //clear input and give new question
        input.value = "";
        GetQuestion();
    }
}

// When input explicitly entered
input.onkeydown = function (ev: any) {
    if (ev.key == "Enter") {
        Grade(input.value);
    }
}