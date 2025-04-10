"use strict";

const headerElement = document.getElementById("header");
const startButtonElement = document.getElementById("start-game");
const resetButtonElement = document.getElementById("reset-game");
const colorButtonElement = document.querySelectorAll(".color-buttons");
const bodyElement = document.querySelector(".body");

const buttonColor = ["red", "yellow", "green", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const startGame = function () {
  if (!started) {
    started = true;
    level = 0;
    toggleRulesAndColorButtons();
    nextSequence();
  }
};

const colorAnimation = function (color) {
  const colorButton = document.getElementById(`${color}`);
  colorButton.style.backgroundColor = `var(--${color}-tint)`;
  setTimeout(() => {
    colorButton.style.backgroundColor = `var(--${color})`;
  }, 100);
};

const playSound = function (sound) {
  const soundOut = new Audio(`./sounds/${sound}.mp3`);
  soundOut.play();
};

const gameOverBackground = function () {
  bodyElement.classList.add("game-over");
  setTimeout(() => {
    bodyElement.classList.remove("game-over");
    resetGame();
  }, 300);
};

const toggleRulesAndColorButtons = function () {
  if (!started) {
    document.querySelector(".rules").style.display = "block";
    document.querySelector(".color-button-container").style.display = "none";
  } else {
    document.querySelector(".rules").style.display = "none";
    document.querySelector(".color-button-container").style.display = "grid";
  }
};

toggleRulesAndColorButtons();

const nextSequence = function () {
  level++;
  userClickedPattern = [];
  headerElement.textContent = `Level ${level}`;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColor[randomNumber];
  colorAnimation(randomChosenColor);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
};

document.addEventListener("keydown", function (e) {
  startGame();
});

startButtonElement.addEventListener("click", function () {
  startGame();
});

colorButtonElement.forEach((button) => {
  button.addEventListener("click", (color) => {
    const colorId = color.target.getAttribute("id");
    colorAnimation(colorId);
    playSound(colorId);
    userClickedPattern.push(colorId);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOverBackground();
    gameOver();
  }
}

function resetGame() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  headerElement.textContent = `Press Enter to Start`;
  bodyElement.classList.remove("game-over");
  document.querySelector(".rules").style.display = "block";
  document.querySelector(".color-button-container").style.display = "none";
}

function gameOver() {
  headerElement.textContent = `Game Over`;
  playSound("wrong");
  started = false;
}
