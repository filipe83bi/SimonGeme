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

const redBackground = function () {
  bodyElement.classList.add("game-over");
  setTimeout(() => {
    bodyElement.classList.remove("game-over");
    resetGame();
  }, 300);
};

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
  if (e.key === "Enter") {
    if (!started) {
      started = true;
      level = 0;
      nextSequence();
    }
  }
});

startButtonElement.addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    nextSequence();
  }
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

resetButtonElement.addEventListener("click", function () {
  resetGame();
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    redBackground();
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
}

function gameOver() {
  headerElement.textContent = `Game Over`;
  playSound("wrong");
  started = false;
}
