// var hideQuestions = document.querySelector("#questions");

var timerEl = document.getElementById('timer');
var q1El = document.querySelector('#q1');
var q2El = document.querySelector('#q2');
var q3El = document.querySelector('#q3');
var q4El = document.querySelector('#q4');

q1El.textContent = "Replacement?";

function tester() {
  console.log("test function called")
  var nextTest = window.confirm("test transition?");
  if (nextTest) {
    console.log("transition confirmed");
    q1El.textContent = "Changed!"
    q2El.textContent = "Changed!"
    q3El.textContent = "Changed!"
    q4El.textContent = "Changed!"
  }
};

var testButton = document.querySelector("#test-button");

testButton.addEventListener("click", tester);

// function tester() {
//   console.log("test function called")
//   var hideTest = window.confirm("hide?");
//   if (hideTest) {
//     console.log("hide confirmed");
//     hideQuestions.setAttribute("style", "display:none");
//   }
// };