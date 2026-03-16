
//Global variables
let randomNumber;
let attempts;
let remaining;
let wins = 0;
let losses = 0;

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("randomNumber: " + randomNumber);
  attempts = 0;
  remaining = 7;

  //hiding the Reset and  button
  document.querySelector("#resetBtn").style.visibility = "hidden";
  document.querySelector("#feedback").style.display = "none";
  document.querySelector("#feedback").textContent = "";

  //showing the Guess button
  document.querySelector("#guessBtn").style.visibility = "visible";

  //adding focus to textbox
  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus();
  playerGuess.value = "";

  //clearning previous guesses
  document.querySelector("#guesses").textContent = "";

  //setting wins, losses and rememainng text
  document.querySelector("#remaining").textContent = remaining;
  document.querySelector("#wins").textContent = wins;
  document.querySelector("#losses").textContent = losses;
}

function checkGuess() {
  let feedback = document.querySelector("#feedback");
  feedback.style.display = "inline";
  feedback.textContent = "";
  let guess = document.querySelector("#playerGuess").value;
  console.log("Player guess: " + guess);
  if (guess < 1 || guess > 99) {
    feedback.textContent = "Enter a number between 1 and 99";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  remaining--;
  console.log("Attempts:" + attempts);
  feedback.style.color = "orange";
  if (guess == randomNumber) {
    feedback.textContent = "You guessed it! You won!";
    feedback.style.color = "#39FF14";
    wins++;
    gameOver();
  } else {
    document.querySelector("#guesses").textContent += guess + " ";
    document.querySelector("#remaining").textContent = remaining;
    if (attempts == 7) {
      feedback.textContent = 'Sorry, you lost!\nThe answer was: "' + randomNumber + '"';

      feedback.style.color = "red";
      answer.style.color = "red";

      losses++;
      gameOver();
    } else if (guess > randomNumber) {
      feedback.textContent = "Guess was high";
    } else {
      feedback.textContent = "Guess was low";
    }
  }
}
function gameOver() {
  guessBtn = document.querySelector("#guessBtn").style.visibility = "hidden";
  resetBtn = document.querySelector("#resetBtn").style.visibility = "visible";
  //guessBtn; //hides guess button
  //resetBtn; //displays reset button

}