// Query selectors and connective bits
var startPage = document.querySelector('#start-page');
var startButton = document.querySelector('#start-button');
var scoreLink = document.querySelector('#score-link');
var quizPage = document.querySelector('#quiz-page');
var quizButton = document.querySelector("#quiz-button");
var victoryPage = document.querySelector('#victory-page');
var victoryText = document.querySelector('#victory-text');
var initialsInput = document.querySelector('#initials');
var victoryButton = document.querySelector('#victory-button');
var scorePage = document.querySelector('#score-page');
var scoreboard = document.querySelector('#scoreboard');
var scoreButton = document.querySelector('#score-button');

var timerEl = document.getElementById('timer');
var questionText = document.querySelector('#question-text');
var options = document.querySelectorAll('li');
var op1 = document.querySelector('#q1');
var op2 = document.querySelector('#q2');
var op3 = document.querySelector('#q3');
var op4 = document.querySelector('#q4');
var feedbackEl = document.querySelector('#feedback');

// Global vars
var questions = [
  'Question 1: Javascript is an_____language?', 
  'Question 2: Which of the following will stop an interval timer in Javascript?', 
  'Question 3: Which function is used to serialize an object in a JSON string in Javascript?', 
  'Question 4: Which of the following keywords is used to define a variable in Javascript?'
];
var answerKey = [op2, op3, op1, op4];
var q1Ops = ['Object-Based', 'Object-Oriented', 'Procedural', 'None of the above'];
var q2Ops = ['stopTimer', 'clearTimer', 'clearInterval', 'intervalStop'];
var q3Ops = ['stringify()', 'parse()', 'convert()', 'None of the above'];
var q4Ops = ['set', 'def', 'val', 'var'];
var opsPool = [q1Ops, q2Ops, q3Ops, q4Ops];
var scores = [];

// Functional and placeholder vars
var correct;
var attempted = false;
var timeLeft;
var penalty = false;
var currentQuestion = 0;
var scoreEntry = false;

// Sets up start page
function setStartPage() {
  // Start page made visible, other pages hidden
  startPage.setAttribute('style', 'display:block');
  scorePage.setAttribute('style', 'display:none');
  quizPage.setAttribute('style', 'display:none');
  victoryPage.setAttribute('style', 'display:none');
  // Timer and progress tracker reset
  timeLeft = 60;
  currentQuestion = 0;
  // Quiz display elements preemptively reset
  timerEl.textContent = "Time Left: 60s!";
  quizButton.textContent = "Next Question!";
};

// Sets up quiz page on clicking "start"
function setQuizPage() {
  // Quiz page made visible, other pages hidden
  quizPage.setAttribute('style', 'display:block');
  startPage.setAttribute('style', 'display:none');
  quizButton.setAttribute('style', 'display:none');
  // Calls timer function
  countdown();
  // Plugs question content into quiz page display
  setUp();
};

// Sets up victory/ enter initials page
function setVictoryPage() {
  // Victory page made visible, quiz page hidden
  victoryPage.setAttribute('style', 'display:block');
  quizPage.setAttribute('style', 'display:none');
};

// Sets up score page
function setScorePage() {
  // Calls scoreboard function
  postScoreboard();
  // Score page made visible, other pages hidden
  startPage.setAttribute('style', 'display:none');
  victoryPage.setAttribute('style', 'display:none');
  scorePage.setAttribute('style', 'display:block');
};

// Sets and operates timer
function countdown() {
  // Sets interval
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time Left: " + timeLeft + "s!";
    // Penalty conditional
    if(penalty) {
      timeLeft = timeLeft - 5;
      penalty = false;      
    }
    // Ends quiz if timer runs out, transitions browser to victory page
    if(timeLeft <= 0) {
      clearInterval(timeInterval);
      setVictoryPage();
      victoryText.textContent = "You failed! Tell the world!";
    // Transitions browser to victory page on successful quiz completion
    } else if(currentQuestion >= questions.length) {
      clearInterval(timeInterval);
      setVictoryPage();
      victoryText.textContent = "A quizzer is you!";
    }
  }, 1000); // Interval 1000ms/1s
}

// Sets question content for quiz page
function setUp() {
  // Aborts function if current question value is inappropriately high
  if(currentQuestion >= questions.length) {
    return;
  // Changes button text from "next question" to "finish" on the final question
  } else if(currentQuestion === questions.length - 1) {
    quizButton.textContent = "Finish!";
  };
  // Posts text for current question to quiz page display
  questionText.textContent = questions[currentQuestion];
  // Gets current answer set and posts it to the multiple choice section
  var currentOps = opsPool[currentQuestion];
  for (var i = 0; i < options.length; i++) {
    options[i].textContent = currentOps[i];
  }
  // Sets correct answer
  correct = answerKey[currentQuestion];
  // Hides "next question" button until an answer is selected
  quizButton.setAttribute('style', 'display:none');
};

// Cleans up quiz page on question transition
function reset() {
  // Clears feedback text
  feedbackEl.textContent = "";
  // Clears colored hilighting from answers
  for (var j = 0; j < options.length; j++) {
    options[j].setAttribute('style', 'color:black; background-color:none;');
  };
  // Progression control variables adjusted
  attempted = false;
  currentQuestion++;
};

// Calls needed functions on question transition
function nextQuestion() {
  reset();
  setUp();
};

// Processes answer input
function answer(event) {
  event.stopPropagation();
  // Prevents more than one attempt on a given question
  if(attempted) {
    return;
  };
  attempted = true;
  // Hilighting and feedback based on answer correctness
  correct.setAttribute('style', 'color:white; background-color:green;');
  if(event.target === correct) {
    feedbackEl.textContent = "Correct!";
  } else {
    event.target.setAttribute('style', 'color:white; background-color:red;');
    feedbackEl.textContent = "Nope!";
    penalty = true;
  };
  // Reveals "next question" button to allow progression
  quizButton.setAttribute('style', 'display:block');
};

// Posts the scoreboard to the score page
function postScoreboard() {
  // Clears any previous scores
  while (scoreboard.children.length > 0) {
    scoreboard.removeChild(scoreboard.children[0]);
  }
  // Collects players score if scoreboard accessed from quiz
  if(currentQuestion > 0) {
    var playerScore = {initials: initialsInput.value.trim(), score: timeLeft};
    scores.push(playerScore);
    initialsInput.value = "";
  };
  // Sorts scoreboard entries by score from highest to lowest
  function sorter (a, b) {
    var scoreA = a.score;
    var scoreB = b.score;
    if (scoreA > scoreB) {
      return -1;
    } else if (scoreA < scoreB) {
      return 1;
    } else {
      return 0;
    }
  }
  scores.sort(sorter);
  // Creates scoreboard entry elements and appends them to the scoreboard
  for (var k = 0; k < scores.length; k++) {
    var liElement = document.createElement('li');
    liElement.textContent = scores[k].initials + " --- " + scores[k].score;
    scoreboard.appendChild(liElement);
  }
  // Saves current scoreboard to local storage
  localStorage.setItem('scores', JSON.stringify(scores))
};

// Sets start page upon loading
setStartPage();
// Checks local storage for saved scoreboard upon loading
var storedScore = JSON.parse(localStorage.getItem('scores'));
if (storedScore !== null) {
  scores = storedScore;
}

// Event listeners for page transition
startButton.addEventListener("click", setQuizPage);
scoreLink.addEventListener("click", setScorePage);
quizButton.addEventListener("click", nextQuestion);
victoryButton.addEventListener("click", setScorePage);
scoreButton.addEventListener("click", setStartPage);
// Event listeners for multiple choice selection
op1.addEventListener("click", answer); 
op2.addEventListener("click", answer);
op3.addEventListener("click", answer);
op4.addEventListener("click", answer);

