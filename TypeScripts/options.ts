const options = document.getElementById("options_container") as HTMLDialogElement;
const timeInput = document.getElementById("time_input") as HTMLInputElement;

const questionTypeCheckboxes: HTMLInputElement[] = [
    document.getElementById("question_type_checkbox_0") as HTMLInputElement,
    document.getElementById("question_type_checkbox_1") as HTMLInputElement,
    document.getElementById("question_type_checkbox_2") as HTMLInputElement,
    document.getElementById("question_type_checkbox_3") as HTMLInputElement,
    document.getElementById("question_type_checkbox_4") as HTMLInputElement,
]

const keyPrefix = "mathquiz_";
const timeKey = keyPrefix + "startTime";
const questionInclusionKey = keyPrefix + "includeQuestion";

function ShowOptions() {
    options.showModal();

    timeInput.value = startTime.toString();

    for (let i = 0; i < generators.length; i++) {
        questionTypeCheckboxes[i].checked = includedQuestionTypes[i];
    }
}

function CloseOptions() {
    options.close();

    startTime = Number.parseInt(timeInput.value);
    localStorage.setItem(timeKey, startTime.toString());

    for (let i = 0; i < generators.length; i++) {
        includedQuestionTypes[i] = questionTypeCheckboxes[i].checked;
        localStorage.setItem(questionInclusionKey + i, includedQuestionTypes[i].toString());
    }

    ShowBeginScreen();
}

function LoadOptions() {
    startTime = Number.parseInt(localStorage.getItem(timeKey) ?? "");
    if (Number.isNaN(startTime)) {
        startTime = 0;
    }

    includedQuestionTypes = new Array(generators.length);
    for (let i = 0; i < generators.length; i++) {
        const value = localStorage.getItem(questionInclusionKey + i);
        includedQuestionTypes[i] = (value == "true") ? true : false;
    }
}