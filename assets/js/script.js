var startPage = document.querySelector('#start-page');
var startButton = document.querySelector('#start-button');
var scoreLink = document.querySelector('#score-link');
var quizPage = document.querySelector('#quiz-page');
var quizButton = document.querySelector("#quiz-button");
var victoryPage = document.querySelector('#victory-page');
var victoryText = document.querySelector('#victory-text');
var victoryButton = document.querySelector('#victory-button');
var scorePage = document.querySelector('#score-page');
var scoreButton = document.querySelector('#score-button');

var timerEl = document.getElementById('timer');
var questionText = document.querySelector('#question-text');
var options = document.querySelectorAll('li');
var op1 = document.querySelector('#q1');
var op2 = document.querySelector('#q2');
var op3 = document.querySelector('#q3');
var op4 = document.querySelector('#q4');
var feedbackEl = document.querySelector('#feedback');

var questions = ['Question 1', 'Question 2', 'Question 3', 'Question 4'];
var answerKey = [op1, op3, op2, op4];
var q1Ops = ['a1', 'b1', 'c1', 'd1'];
var q2Ops = ['a2', 'b2', 'c2', 'd2'];
var q3Ops = ['a3', 'b3', 'c3', 'd3'];
var q4Ops = ['a4', 'b4', 'c4', 'd4'];
var opsPool = [q1Ops, q2Ops, q3Ops, q4Ops];

var timeLeft = 30;
var attempted = false;
var penalty = false;
var correct;
var currentQuestion = 0;


function setStart() {
  scorePage.setAttribute('style', 'display:none');
  startPage.setAttribute('style', 'display:block');
  quizPage.setAttribute('style', 'display:none');
  victoryPage.setAttribute('style', 'display:none');
};

function setQuiz() {
  startPage.setAttribute('style', 'display:none');
  quizPage.setAttribute('style', 'display:block');
  quizButton.setAttribute('style', 'display:none');
  countdown();
  setUp();
};

function setVictory() {
  quizPage.setAttribute('style', 'display:none');
  victoryPage.setAttribute('style', 'display:block');
};

function setScore() {
  startPage.setAttribute('style', 'display:none');
  victoryPage.setAttribute('style', 'display:none');
  scorePage.setAttribute('style', 'display:block');
};

function countdown() {
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time Left: " + timeLeft + "s!";
    if(penalty) {
      timeLeft = timeLeft - 5;
      penalty = false;      
    }
    if(timeLeft <= 0) {
      clearInterval(timeInterval);
      setVictory();
      victoryText.textContent = "You failed! Tell the world!";
      console.log("Failed!");
    } else if(currentQuestion >= questions.length) {
      clearInterval(timeInterval);
      setVictory();
      victoryText.textContent = "A quizzer is you!";
      console.log(timeLeft);
    }
  }, 1000);
}

function setUp() {
  if(currentQuestion >= questions.length) {
    return;
  } else if(currentQuestion === questions.length - 1) {
    quizButton.textContent = "Finish!";
  };
  questionText.textContent = questions[currentQuestion];
  var currentOps = opsPool[currentQuestion];
  for (var i = 0; i < options.length; i++) {
    options[i].textContent = currentOps[i];
  }
  correct = answerKey[currentQuestion];
  quizButton.setAttribute('style', 'display:none');
  correct.textContent = "Correct";
};

function reset() {
  feedbackEl.textContent = "";
  for (var i = 0; i < options.length; i++) {
    options[i].setAttribute('style', 'color:black; background-color:none;');
  };
  attempted = false;
  currentQuestion++;
};

function nextQuestion() {
  reset();
  setUp();
};

function answer(event) {
  event.stopPropagation();
  if(attempted) {
    console.log("re-answer prevented");
    return;
  };
  attempted = true;
  correct.setAttribute('style', 'color:white; background-color:green;');
  if(event.target === correct) {
    feedbackEl.textContent = "Correct!";
  } else {
    event.target.setAttribute('style', 'color:white; background-color:red;');
    feedbackEl.textContent = "Nope!";
    penalty = true;
  };
  quizButton.setAttribute('style', 'display:block');
};



setStart();

startButton.addEventListener("click", setQuiz);
scoreLink.addEventListener("click", setScore);
quizButton.addEventListener("click", nextQuestion);
victoryButton.addEventListener("click", setScore);
scoreButton.addEventListener("click", setStart);

op1.addEventListener("click", answer); 
op2.addEventListener("click", answer);
op3.addEventListener("click", answer);
op4.addEventListener("click", answer);

