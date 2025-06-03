"use strict";
var Operator;
(function (Operator) {
    Operator[Operator["Addition"] = 0] = "Addition";
    Operator[Operator["Subtraction"] = 1] = "Subtraction";
    Operator[Operator["Multiplication"] = 2] = "Multiplication";
    Operator[Operator["Division"] = 3] = "Division";
})(Operator || (Operator = {}));
function GetOperatorSymbol(operator) {
    switch (operator) {
        case Operator.Addition:
            return "+";
        case Operator.Subtraction:
            return "−";
        case Operator.Multiplication:
            return "×";
        case Operator.Division:
            return "÷";
        default:
            return "?";
    }
}
