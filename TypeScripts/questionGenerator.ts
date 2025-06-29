class Question {
    operator: string;
    number1: number;
    number2: number;
    answer: number;
    constructor(operator: string, number1: number, number2: number, answer: number) {
        this.operator = operator;
        this.number1 = number1;
        this.number2 = number2;
        this.answer = answer;
    }
}

type QuestionGenerator = ((difficulty: number) => Question);

const generators: QuestionGenerator[] = [];
// How many of each generator to put into shuffle bag
const generatorWeight: number[] = [];

// Adds the generator function to the list and creates input box UI
function AddQuestionGenerator(generator: QuestionGenerator, weight: number): void {
    generators.push(generator);
    generatorWeight.push(weight);

    let optionsCheckbox = document.createElement("input");
    optionsCheckbox.type = "checkbox";
    optionsCheckbox.id = "question_type_checkbox_" + (generators.length - 1);
    optionsCheckbox.className = "question-type-checkbox";

    questionTypeCheckboxParent.appendChild(optionsCheckbox);
}

function Addition(difficulty: number): Question {

    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));

    //Random doubling
    if (RandomInteger(0, difficulty) > 10) {
        minNum = maxNum;
        maxNum *= 2;
    }

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);

    return new Question("+", num1, num2, num1 + num2);
};

function Subtraction(difficulty: number): Question {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));

    //Random doubling
    if (RandomInteger(0, difficulty) > 10) {
        minNum = maxNum;
        maxNum *= 2;
    }

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, num1);

    return new Question("−", num1, num2, num1 - num2);
};

function Division(difficulty: number): Question {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);

    let product = num1 * num2;

    return new Question("÷", product, num2, product / num2);
};

function Multiplication(difficulty: number): Question {
    let num1: number;
    let num2: number;

    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));

    num1 = RandomInteger(minNum, maxNum);
    num2 = RandomInteger(minNum, maxNum);

    return new Question("×", num1, num2, num1 * num2);
};

function Percentage(difficulty: number): Question {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum) * 100;

    for (let n = 1; n < (num2 / 2); n++) {
        if (num1 % n == 0 && num2 % n == 0) {
            num1 /= n;
            num2 /= n;
            break;
        }
    }

    let answer = RoundTo(((num1 / 100) * num2), 2);

    return new Question("% of ", num1, num2, answer);
};