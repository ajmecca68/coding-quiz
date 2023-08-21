// set time and question variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// set the elements and button variables
var startBtn = document.getElementById('startButton');
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

// set the initial timer to question length * 15.
timerEl.innerHTML = time;

// once start game is clicked it hides the start screen and begins the quiz and timer.
function beginQuiz() {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
    timerId = setInterval(countdown, 1000);
    timerEl.textContent = time;
//gets the next question from the function question
    getQuestion();
}


function getQuestion() {
    //determine what the current question is
    var currentQuestion = questions[currentQuestionIndex];

    // set the title of the question 
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
    
    // zero out the choices to begin
    choicesEl.innerHTML = '';
    
    // creates choice buttons
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = choice;

        choicesEl.appendChild(choiceNode);
    }
}


function questionClick(event) {
    var buttonEl = event.target;
    if (!buttonEl.matches('.choice')) {
        return;
    }
//checks if question was correct    
    if (buttonEl.value !== questions[currentQuestionIndex].answer){
        time -= 15;
        if(time < 0) {
             time = 0;
            }

        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong!';

     } else {
        
        feedbackEl.textContent = 'Correct!';
           
     }
     feedbackEl.setAttribute('class', 'feedback');
     
     setTimeout(function () {
     feedbackEl.setAttribute('class', 'feedback hide');
     }, 1000);

     currentQuestionIndex++;

     //check if we've run out of questions
     if (time < 0 || currentQuestionIndex === questions.length) {
        quizEnd();
     } else {
        getQuestion();
     }
}
// ends quiz 
function quizEnd() {
    // clears timer
    clearInterval(timerId);

    var endscreenEl = document.getElementById('end-screen');
    endscreenEl.removeAttribute('class');

    // var finalScoreEl = textContent(time);

    questionsEl.setAttribute('class', 'hide');
}

function countdown() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}
 
function saveHighscore() {
    var initials = initialsEl.value.trim().toUpperCase();
    if (initials !== '') {
    var highScores = JSON.parse (window.localStorage.getItem('scores')) || [];
    }
    var newScore = {
        score: time, 
        initials: initials,
    }

    highScores.push(newScore);
    window.localStorage.setItem('scores', JSON.stringify(highScores));
    
    window.location.href = 'highscores.html';
}

function checkForEnter (event) {
    if (event.key === 'Enter') {
    saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = beginQuiz;

choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;