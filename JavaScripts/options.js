"use strict";
const options = document.getElementById("options_container");
const timeInput = document.getElementById("time_input");
const keyPrefix = "mathquiz_";
const timeKey = keyPrefix + "startTime";
function ShowOptions() {
    options.showModal();
    timeInput.value = startTime.toString();
}
function CloseOptions() {
    options.close();
    startTime = Number.parseInt(timeInput.value);
    localStorage.setItem(timeKey, startTime.toString());
    ShowBeginScreen();
}
function LoadOptions() {
    var _a;
    startTime = Number.parseInt((_a = localStorage.getItem(timeKey)) !== null && _a !== void 0 ? _a : "");
    if (Number.isNaN(startTime)) {
        startTime = 0;
    }
}
