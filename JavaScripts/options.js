"use strict";
const options = document.getElementById("options_container");
const timeInput = document.getElementById("time-input");
const questionTypeCheckboxParent = document.getElementById("question-checkbox-container");
const keyPrefix = "mathquiz_";
const timeKey = keyPrefix + "startTime";
const questionInclusionKey = keyPrefix + "includeQuestion";
function ShowOptions() {
    options.showModal();
    timeInput.value = startTime.toString();
    for (let i = 0; i < generators.length; i++) {
        document.getElementById("question_type_checkbox_" + i).checked = includedQuestionTypes[i];
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
        includedQuestionTypes[i] = document.getElementById("question_type_checkbox_" + i).checked;
        localStorage.setItem(questionInclusionKey + i, includedQuestionTypes[i].toString());
    }
    EnsureQuestionsIncluded();
    ShowBeginScreen();
}
function LoadOptions() {
    var _a;
    startTime = Number.parseInt((_a = localStorage.getItem(timeKey)) !== null && _a !== void 0 ? _a : "");
    if (Number.isNaN(startTime)) {
        startTime = 0;
    }
    includedQuestionTypes = new Array(generators.length);
    for (let i = 0; i < generators.length; i++) {
        const value = localStorage.getItem(questionInclusionKey + i);
        includedQuestionTypes[i] = (value == "true") ? true : false;
    }
    EnsureQuestionsIncluded();
}
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
