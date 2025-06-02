//An operation is the type of question that is asked
enum Operator {
    Addition,
    Subtraction,
    Multiplication,
    Division
}

function GetOperatorSymbol(operator: Operator): string {
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