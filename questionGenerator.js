"use strict";
let generators = new Map();
generators.set(Operator.Addition, Addition);
generators.set(Operator.Subtraction, Subtraction);
generators.set(Operator.Multiplication, Multiplication);
generators.set(Operator.Division, Division);
function Addition(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));
    num1 = RandomInteger(minNum, maxNum);
    num2 = RandomInteger(minNum, maxNum);
    return { n1: num1, n2: num2, a: num1 + num2 };
}
;
function Subtraction(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 1.1));
    let num1 = RandomInteger(minNum, maxNum);
    let num2 = RandomInteger(minNum, num1);
    return { n1: num1, n2: num2, a: num1 - num2 };
}
;
function Multiplication(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));
    num1 = RandomInteger(minNum, maxNum);
    num2 = RandomInteger(minNum, maxNum);
    return { n1: num1, n2: num2, a: num1 * num2 };
}
;
function Division(difficulty) {
    let minNum = 1;
    let maxNum = Math.floor(10 + (difficulty / 3));
    num1 = RandomInteger(minNum, maxNum);
    num2 = RandomInteger(minNum, maxNum);
    let product = num1 * num2;
    return { n1: product, n2: num2, a: product / num2 };
}
;
