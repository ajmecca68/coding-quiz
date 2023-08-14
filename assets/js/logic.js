var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var startBtn = document.getElementById("startButton");
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

var sfxRight = new Audio();
var stxWrong = new Audio();

function beginQuiz() {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    getQuestion();
}


function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = '';
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);
        choiceNode.setAttribute('style', 'margin-bottom 10px;');

        choiceNode.textContent = choice;

        choicesEl.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEl = event.target;
    if (!buttonEl.matches('choice')) {
        return;
    }
     if (buttonEl.value !== questions[currentQuestionIndex].answer){
        time -= 15;

        if(time < 0) {
             time = 0;

        }

        timerEl.textContent = time;

            sfxwrong.play();

        feedbackEl.textContent = 'Wrong!';

     } else {
            sfxRight.play();

            feedbackEl.textContent = 'Correct!';
     }
     feedbackEl.setAttribute('class', 'feedback');
     setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
     }, 1000);

     currentQuestionIndex++;

     //check if we've run out of questions
     if (time < 0 || currentQuestionIndex < questions.length) {
        quzEnd();
     } else {
        getQuestion();
     }
}

function quizEnd() {
    clearInterval(timerId);

    var endscreenEl = document.getElementById('end-screen');
    endscreenEl.removeAttribute('class');

    //var finalScoreEl.textContent = time;

    questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}
 
function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== '') {
    var highScores = JSON.parse (window.localStorage.getItem('highScores')) || [];
    }
    var newScore = {
        score: time, 
        initials: initials,
    }

    highScores.push (newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highScores));
    
    window.location.href = 'highscores.html';
}

function checkForEnter (event) {
    if (event .key === 'Enter') {
    saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = beginQuiz;

choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;