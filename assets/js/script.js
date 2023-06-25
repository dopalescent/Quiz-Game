var hideQuestions = document.querySelector("#questions")

function tester() {
  console.log("test function called")
  var hideTest = window.confirm("hide?")
  if (hideTest) {
    console.log("hide confirmed");
    hideQuestions.setAttribute("style", "display:none");
  }
};

var testButton = document.querySelector("#test-button");

testButton.addEventListener("click", tester);