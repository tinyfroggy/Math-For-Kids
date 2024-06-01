const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const audio = document.getElementById("myAudio");
const startGame = document.getElementById("playButton");
const page = document.getElementById("safeTimerDisplay");
const wrongAnswers = document.getElementById("wrong");
const rightAnswers = document.getElementById("right");
const div_start = document.getElementById("div-start");
const wrong_span = document.getElementById("wrong-span");
const right_span = document.getElementById("right-span");
const restartBtn = document.getElementById("restartBtn");
const div_end = document.getElementById("div-end");
const bord = document.getElementById("bord");
let answer = 0;

const score = {
    wrong: 1,
    right: 1
};

function generate_equation() {
    let num1, num2;

    // Generate two numbers that can divide each other without remainder and are not zero
    do {
        num1 = Math.floor(Math.random() * 12) + 1; // 1 to 12
        num2 = Math.floor(Math.random() * 12) + 1; // 1 to 12
    } while (num1 % num2 !== 0); // Ensure they divide evenly 

    // Calculate the correct answer
    answer = num1 - num2;

    // Ensure dummy answers are unique and not equal to the correct answer
    let dummyAnswer1, dummyAnswer2;
    do {
        dummyAnswer1 = Math.floor(Math.random() * 12) + 1;
    } while (dummyAnswer1 === answer);

    do {
        dummyAnswer2 = Math.floor(Math.random() * 12) + 1;
    } while (dummyAnswer2 === answer || dummyAnswer2 === dummyAnswer1);

    // Display the numbers
    document.getElementById("num1").innerHTML = num1;
    document.getElementById("num2").innerHTML = num2;

    // Shuffle answers and assign to options
    let allAnswers = [answer, dummyAnswer1, dummyAnswer2];
    let switchAnswers = [];

    for (let i = allAnswers.length; i--;) {
        switchAnswers.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
    }

    option1.innerHTML = switchAnswers[0];
    option2.innerHTML = switchAnswers[1];
    option3.innerHTML = switchAnswers[2];
}

option1.addEventListener("click", () => {
    if (option1.innerHTML == answer) {
        generate_equation();
        rightAnswers.innerHTML = score.right++;
    } else {
        audio.play();
        wrongAnswers.innerHTML = score.wrong++;
    }
});

option2.addEventListener("click", () => {
    if (option2.innerHTML == answer) {
        generate_equation();
        rightAnswers.innerHTML = score.right++;
    } else {
        audio.play();
        wrongAnswers.innerHTML = score.wrong++;
    }
});

option3.addEventListener("click", () => {
    if (option3.innerHTML == answer) {
        generate_equation();
        rightAnswers.innerHTML = score.right++;
    } else {
        audio.play();
        wrongAnswers.innerHTML = score.wrong++;
    }
});

startGame.addEventListener('click', function () {
    startGame.style.display = 'none';
    div_start.style.display = 'none';
    startTimer();
});

restartBtn.style.display = 'none';
div_end.style.display = 'none';

restartBtn.addEventListener('click', function () {
    restartBtn.style.display = 'none';
    div_end.style.display = 'none';
    resetGame();
});

function startTimer() {
    let count = 60;  // يمكنك ضبط الوقت المطلوب هنا
    const timer = setInterval(function () {
        page.innerHTML = count--;
        console.log(count);
        if (count < 0) {
            clearInterval(timer);
            console.log("Time's up!");
            restartBtn.style.display = 'block';
            div_end.style.display = 'block';
            right_span.innerHTML = rightAnswers.innerHTML
            wrong_span.innerHTML = wrongAnswers.innerHTML
        }
    }, 1000);
}

function resetGame() {
    score.wrong = 1;
    score.right = 1;
    wrongAnswers.innerHTML = 0;
    rightAnswers.innerHTML = 0;
    startGame.style.display = 'block';
    div_start.style.display = 'block';
    page.innerHTML = 60
    generate_equation();  // لإعادة توليد المعادلة
}

generate_equation();
