const options = document.getElementById("options_container") as HTMLDialogElement;
const timeInput = document.getElementById("time-input") as HTMLInputElement;

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
    if (startTime == null || isNaN(startTime) || !isFinite(startTime) || startTime > 999) {
        startTime = 0;
    }
    localStorage.setItem(timeKey, startTime.toString());

    for (let i = 0; i < generators.length; i++) {
        includedQuestionTypes[i] = questionTypeCheckboxes[i].checked;
        localStorage.setItem(questionInclusionKey + i, includedQuestionTypes[i].toString());
    }

    EnsureQuestionsIncluded();

    ShowBeginScreen();
}

function LoadOptions() {
    //Time
    startTime = Number.parseInt(localStorage.getItem(timeKey) ?? "");
    if (Number.isNaN(startTime)) {
        startTime = 0;
    }

    //Included Questions
    includedQuestionTypes = new Array(generators.length);
    for (let i = 0; i < generators.length; i++) {
        const value = localStorage.getItem(questionInclusionKey + i);
        includedQuestionTypes[i] = (value == "true") ? true : false;
    }

    EnsureQuestionsIncluded();
}

//Ensure at least 1 question type is included
function EnsureQuestionsIncluded() {
    for (let i = 0; i < includedQuestionTypes.length; i++) {
        if (includedQuestionTypes[i] == true) {
            return;
        }
    }

    includedQuestionTypes[0] = true;
    includedQuestionTypes[1] = true;
    includedQuestionTypes[2] = true;
    includedQuestionTypes[3] = true;
}