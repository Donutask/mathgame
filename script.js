var num1Text = document.getElementById("number_one");
var num2Text = document.getElementById("number_two");

var minNum = 1;
var maxNum = 12;

var num1;
var num2;

var streak;

//makes 2 numbers for question
function GenerateNumbers() {
    num1 = getRandomInt(minNum, maxNum);
    num2 = getRandomInt(minNum, maxNum);

    num1Text.innerHTML = num1.toString();
    num2Text.innerHTML = num2.toString();
}

//min and max inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var input = document.getElementById("input");

//when input explicitly entered
input.onkeydown = function (ev) {
    if (ev.key == "Enter") {
        Grade(input.value);
    }
}

var feedback = document.getElementById("feedback");


function Grade(value) {
    const num = parseInt(value);

    if (isNaN(num)) {
        feedback.innerHTML = "Not a Number";
    } else {
        if (num1 * num2 == num) {
            streak++;
            if (streak > 1) {
                feedback.innerHTML = `Correct. ${streak} in a row!`;

                //step it up a bit if your going well ;)
                if (streak > 25) {
                    maxNum = 99;
                } else if (streak > 10) {
                    maxNum = 24;
                }

            } else {
                feedback.innerHTML = "Correct!";
            }
        } else {
            feedback.innerHTML = `Incorrect. ${num1}×${num2}=${num1 * num2}`;
            BreakStreak();
        }

        //clear inout and give new question
        input.value = "";
        GenerateNumbers();
    }
}

//getting one wrong resets the streak and difficulty
function BreakStreak() {
    minNum = 1;
    maxNum = 12;
    streak = 0;
}

//make problem on start
document.onload = new function () {
    GenerateNumbers();
    BreakStreak();
}

//Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};

//Web app install
//https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
let deferredPrompt;
const addButton = document.getElementById("add_button");
addButton.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addButton.style.display = 'block';

    addButton.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addButton.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                // console.log('User accepted the A2HS prompt');
            } else {
                // console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});