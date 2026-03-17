
//event lister
document.querySelector("button").addEventListener("click", gradeQuiz);
document.querySelector("#reveal").addEventListener("click", revealAnswers);


//global vars
let score = 0;
let attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
document.querySelector("#reveal").style.display = "none";

//functions
function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  q4ChoicesArray = _.shuffle(q4ChoicesArray);

  for (let i = 0; i < q4ChoicesArray.length; i++) {
    document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id="${q4ChoicesArray[i]}"
      value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
  }
}

function isFormValid() {
  let isValid = true;
  if (document.querySelector("#q1").value == "") {
    isValid = false;
    document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
  }
  return isValid;
}//isFormValid

function gradeQuiz() {
  console.log("Grading quiz…");
  document.querySelector("#validationFdbk").innerHTML = ""// resets validation feedback
  if (!isFormValid()) {
    return;
  }

  //variables
  score = 0;
  let q1Response = document.querySelector("#q1").value.toLowerCase();
  let q2Response = document.querySelector("#q2").value;
  let q5Response = document.querySelector("#q5").value;

  let q7Response = document.querySelector("#q7").value;
  let q8Response = document.querySelector("#q8").value.toLowerCase();
  let q9Response = document.querySelector("#q9").value.toLowerCase();
  let q10Response = document.querySelector("#q10").value;

  let q4Response; 
  let value =  document.querySelector("input[name=q4]:checked");
  if(value){
    q4Response = value.value;
  }
  
  let q6Response;
  value = document.querySelector("input[name=q6]:checked");
  if(value){
    q6Response = value.value;
  }

  console.log(q8Response);

  //grading question 1
  if (q1Response == "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  //grading question 2
  if (q2Response == "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  //Grading question 3
  if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked &&
    !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
  }
  else {
    wrongAnswer(3);
  }

  //Grading question 4
  if (q4Response == "Rhode Island") {
    rightAnswer(4);
  }
  else {
    wrongAnswer(4);
  }

  //grading question 5
  if (q5Response == "dc") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  //grading question 6
  if (q6Response == "superior") {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  //grading question 7
  if (q7Response == "oroville") {
    rightAnswer(7);
  } else {
    wrongAnswer(7);
  }

  //grading question 8
  if (q8Response == "delaware") {
    rightAnswer(8);
  } else {
    wrongAnswer(8);
  }

  //grading question 9
  if (q9Response.includes("navajo")) {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  //grading question 10
  if (q10Response == "whitney") {
    rightAnswer(10);
  } else {
    wrongAnswer(10);
  }

  document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
  document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
  localStorage.setItem("total_attempts", attempts);


  document.querySelector("#reveal").style.display = "inline";

}//gradeQuiz


function rightAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
  document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='checkmark'>";
  score += 10;
}

function wrongAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
  document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function revealAnswers() {
  for (let index = 1; index < 11; index++){
    document.querySelector(`#q${index}Feedback`).className = "bg-yellow text-white";
  }
  document.querySelector("#q1Feedback").innerHTML = "Sacramento";
  document.querySelector("#q2Feedback").innerHTML = "The Missouri river";
  document.querySelector("#q3Feedback").innerHTML = " T. Jefferson and T. Roosevelt ";
  document.querySelector("#q4Feedback").innerHTML = "Rhode Island";
  document.querySelector("#q5Feedback").innerHTML = "Washington, D.C.";
  document.querySelector("#q6Feedback").innerHTML = "Lake Superior";
  document.querySelector("#q7Feedback").innerHTML = "Oroville Dam";
  document.querySelector("#q8Feedback").innerHTML = "Delaware";
  document.querySelector("#q9Feedback").innerHTML = "Navajo Nation";
  document.querySelector("#q10Feedback").innerHTML = "Mount Whitney, California";
}

