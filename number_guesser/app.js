/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct anwer if lose
- Let player choose to play again
*/

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign min and max numbers
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  // If won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Lost
      gameOver(
        false,
        `Game Over, you lost. The correct answer was ${winningNum}`
      );
    } else {
      // Game continues
      guessInput.style.borderColor = "orange";

      guessInput.value = "";

      setMessage(`Guess is not correct, ${guessesLeft} guesses left`, "orange");
    }
  }
});

// Game Over Function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  // Play Again
  guessBtn.value = "Play Again";
  if (!guessBtn.classList.contains("play-again")) {
    guessBtn.className += "play-again";
  }
}

// Get Winning Number

function getRandomNum(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
