"use strict";
class Question {
    constructor(operator, number1, number2, answer) {
        this.operator = operator;
        this.number1 = number1;
        this.number2 = number2;
        this.answer = answer;
    }
}
let generators = [
    Addition,
    Subtraction,
    Multiplication,
    Division,
];
function Addition(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));
    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);
    return new Question("+", num1, num2, num1 + num2);
}
;
function Subtraction(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));
    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, num1);
    return new Question("−", num1, num2, num1 - num2);
}
;
function Multiplication(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));
    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);
    return new Question("×", num1, num2, num1 * num2);
}
;
function Division(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));
    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, maxNum);
    let product = num1 * num2;
    return new Question("÷", product, num2, product / num2);
}
;
