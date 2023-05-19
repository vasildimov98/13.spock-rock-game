import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

// Variables
const playerScoreEl = document.getElementById("playerScore");
const playerChoice = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoice = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let prevSelectedIcon;
let prevDisplayIcon;
let randomCompChoice;
let computerScore = 0;
let playerScore = 0;

function resetPrevSelectedIcon(currentSelectedIcon) {
  if (prevSelectedIcon) {
    prevSelectedIcon.classList.remove("selected");
  }
  prevSelectedIcon = currentSelectedIcon;

  stopConfetti();
  removeConfetti();
}

function resetPrevDisplayIcon(currentSelectedIcon) {
  if (prevDisplayIcon) {
    prevDisplayIcon.classList.remove("selected");
  }
  prevDisplayIcon = currentSelectedIcon;

  stopConfetti();
  removeConfetti();
}

// Reset all on click
function resetAll() {
  resetPrevDisplayIcon();
  resetPrevSelectedIcon();

  randomCompChoice = "";
  computerScore = 0;
  playerScore = 0;

  playerChoice.textContent = "";
  computerChoice.textContent = "";
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  resultText.textContent = "";
}
window.resetAll = resetAll;

// Compute Random Computer Choice
function selectRandomComputerChoice() {
  const random = Math.random();

  if (random <= 0.2) {
    randomCompChoice = "rock";
  } else if (random <= 0.4) {
    randomCompChoice = "paper";
  } else if (random <= 0.6) {
    randomCompChoice = "scissors";
  } else if (random <= 0.8) {
    randomCompChoice = "lizard";
  } else {
    randomCompChoice = "spock";
  }
}

// Update computer styling depending on choice
function displayComputerChoice() {
  // Update content on selected choice
  switch (randomCompChoice) {
    case "rock":
      resetPrevDisplayIcon(computerRock);
      computerRock.classList.add("selected");
      computerChoice.textContent = " --- Rock";
      break;
    case "paper":
      resetPrevDisplayIcon(computerPaper);
      computerPaper.classList.add("selected");
      computerChoice.textContent = " --- Paper";
      break;
    case "scissors":
      resetPrevDisplayIcon(computerScissors);
      computerScissors.classList.add("selected");
      computerChoice.textContent = " --- Scissors";
      break;
    case "lizard":
      resetPrevDisplayIcon(computerLizard);
      computerLizard.classList.add("selected");
      computerChoice.textContent = " --- Lizard";
      break;
    case "spock":
      resetPrevDisplayIcon(computerSpock);
      computerSpock.classList.add("selected");
      computerChoice.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

// Check result and display it
function displayResult(playerChoice) {
  if (playerChoice === randomCompChoice) {
    resultText.textContent = "It's a tie! 🎀";
    return;
  }

  const result = choices[playerChoice].defeats.indexOf(randomCompChoice);

  if (result === -1) {
    resultText.textContent = "You Lost! 😭";
    computerScore++;
    computerScoreEl.textContent = computerScore;
    return;
  }

  startConfetti();
  resultText.textContent = "You Won! 🏆";
  playerScore++;
  playerScoreEl.textContent = playerScore;
}

// Process Turn
function checkResult(choice) {
  selectRandomComputerChoice();
  displayComputerChoice();
  displayResult(choice);
}

// Function Declaration
function select(choice) {
  // Update content on selected choice
  switch (choice) {
    case "rock":
      resetPrevSelectedIcon(playerRock);
      playerRock.classList.add("selected");
      playerChoice.textContent = " --- Rock";
      break;
    case "paper":
      resetPrevSelectedIcon(playerPaper);
      playerPaper.classList.add("selected");
      playerChoice.textContent = " --- Paper";
      break;
    case "scissors":
      resetPrevSelectedIcon(playerScissors);
      playerScissors.classList.add("selected");
      playerChoice.textContent = " --- Scissors";
      break;
    case "lizard":
      resetPrevSelectedIcon(playerLizard);
      playerLizard.classList.add("selected");
      playerChoice.textContent = " --- Lizard";
      break;
    case "spock":
      resetPrevSelectedIcon(playerSpock);
      playerSpock.classList.add("selected");
      playerChoice.textContent = " --- Spock";
      break;
    default:
      break;
  }

  checkResult(choice);
}
window.select = select;
