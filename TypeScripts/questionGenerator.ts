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

let generators: ((difficulty: number) => Question)[] = [
    Addition,
    Subtraction,
    Multiplication,
    Division,
];

function Addition(difficulty: number): Question {

    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);

    return new Question("+", num1, num2, num1 + num2);
};

function Subtraction(difficulty: number): Question {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, num1);

    return new Question("−", num1, num2, num1 - num2);
};

function Multiplication(difficulty: number): Question {

    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);

    return new Question("×", num1, num2, num1 * num2);
};

function Division(difficulty: number): Question {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));

    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);

    let product = num1 * num2;

    return new Question("÷", product, num2, product / num2);
};


