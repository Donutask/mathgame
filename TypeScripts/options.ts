const options = document.getElementById("options_container") as HTMLDialogElement;
const timeInput = document.getElementById("time_input") as HTMLInputElement;

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
    startTime = Number.parseInt(localStorage.getItem(timeKey) ?? "");
    if (Number.isNaN(startTime)) {
        startTime = 0;
    }
}