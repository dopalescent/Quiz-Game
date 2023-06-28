// var hideQuestions = document.querySelector("#questions");
var testButton = document.querySelector("#test-button");

var timerEl = document.getElementById('timer');
var questions = document.querySelectorAll('li');
var q1El = document.querySelector('#q1');
var q2El = document.querySelector('#q2');
var q3El = document.querySelector('#q3');
var q4El = document.querySelector('#q4');
var feedbackEl = document.querySelector('#feedback');
var attempted = false;
var correct = q1El

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
}

function tester() {
  console.log("test function called")
  var nextTest = window.confirm("test transition?");
  if (nextTest) {
    console.log("transition confirmed");
    q1El.textContent = "Changed!";
    q2El.textContent = "Changed!";
    q3El.textContent = "Changed!";
    q4El.textContent = "Changed!";
    feedbackEl.textContent = "";
    for (var i = 0; i < questions.length; i++) {
      questions[i].setAttribute('style', 'color:black; background-color:none;');
    }
    correct = q2El;
    attempted = false;
  }
};

q1El.addEventListener("click", answer);
q2El.addEventListener("click", answer);
q3El.addEventListener("click", answer);
q4El.addEventListener("click", answer);


testButton.addEventListener("click", tester);

// function tester() {
//   console.log("test function called")
//   var hideTest = window.confirm("hide?");
//   if (hideTest) {
//     console.log("hide confirmed");
//     hideQuestions.setAttribute("style", "display:none");
//   }
// };