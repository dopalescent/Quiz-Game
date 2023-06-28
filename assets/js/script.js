// var hideoptions = document.querySelector("#options");
var nextButton = document.querySelector("#next-button");
var timerEl = document.getElementById('timer');
var questionText = document.querySelector('#question-text')
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

var attempted = false;
var correct
var currentQuestion = 0;


function setUp() {
  if(currentQuestion >= questions.length){
    feedbackEl.textContent = "Finished!"
    return;
  };
  console.log(currentQuestion);
  questionText.textContent = questions[currentQuestion];
  var currentOps = opsPool[currentQuestion];
  for (var i = 0; i < options.length; i++) {
    options[i].textContent = currentOps[i];
    console.log("setup read");
  }
  correct = answerKey[currentQuestion];
  nextButton.setAttribute('style', 'display:none')
}

function reset() {
  console.log("transition confirmed");
  feedbackEl.textContent = "";
  for (var i = 0; i < options.length; i++) {
    options[i].setAttribute('style', 'color:black; background-color:none;');
  }
  attempted = false;
  currentQuestion++
};

function nextQuestion() {
  reset();
  setUp();
}

function answer(event) {
  event.stopPropagation();
  console.log("answer click registered");
  console.log(event.target);
  if(attempted) {
    console.log("re-answer prevented");
    return;
  }
  attempted = true;
  correct.setAttribute('style', 'color:white; background-color:green;')
  if(event.target === correct) {
    console.log("correct clicked");
    feedbackEl.textContent = "Correct!"
  } else {
    event.target.setAttribute('style', 'color:white; background-color:red;')
    feedbackEl.textContent = "Nope!"
  }
  nextButton.setAttribute('style', 'display:block')
}

setUp();

nextButton.addEventListener("click", nextQuestion);

op1.addEventListener("click", answer); 
op2.addEventListener("click", answer);
op3.addEventListener("click", answer);
op4.addEventListener("click", answer);


// function tester() {
//   console.log("test function called")
//   var hideTest = window.confirm("hide?");
//   if (hideTest) {
//     console.log("hide confirmed");
//     hideoptions.setAttribute("style", "display:none");
//   }
// };