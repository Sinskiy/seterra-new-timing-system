// ==UserScript==
// @name         Seterra new timing system
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  milliseconds on the screen
// @author       Sinskiy
// @match        *://*.geoguessr.com/seterra/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geoguessr.com
// @grant        none
// ==/UserScript==

document.getElementById("timer").setAttribute("id", "overrideTimer");
const timer = document.getElementById("overrideTimer");
timer.innerHTML = "please, restart";
const gmSelector = document.getElementById("drpGameMode");
const button = document.getElementById("cmdRestart");
const completion = document.getElementById("completion");
const score = document.getElementById("lblFinalScore2");
score.style.fontSize = "35px";
let time = 0;
let timerCount;
let restarted = false;

function startTime() {
  clearInterval(timerCount);
  completion.style.display = "none";
  time = -2;
  timerCount = setInterval(() => {
    time += 0.5;
    timer.innerHTML = `| ${timerTime(time)}`;
    if (completion.style.display === "block") {
      clearInterval(timerCount);
      score.innerHTML =
        document.getElementById("score").innerHTML + timer.innerHTML.slice(2);
      time = 0;
    }
  }, 50);
}

function timerTime(ms) {
  if (ms < 0) return "0.0s";
  const hours = parseInt(Math.floor(ms / 36000));
  let remainder = ms % 36000;
  const minutes = parseInt(Math.floor(remainder / 600));
  remainder = remainder % 600;
  let seconds = parseInt(Math.floor(remainder / 10));
  remainder = parseInt(Math.round(remainder % 10));
  if (remainder === 10) {
    seconds++;
    remainder -= 10;
  }
  return `${hours > 0 ? `${hours}h ` : ""} ${
    minutes > 0 ? `${minutes}m ` : ""
  } ${`${seconds}.${remainder}s`}`;
}

function restartMouse() {
  completion.style.display = "none";
  restarted = true;
  startTime();
}

function restartKeyboard(e) {
  if (e.altKey) {
    if (e.code === "KeyR") {
      completion.style.display = "none";
      restarted = true;
      startTime();
    }
  }
}

gmSelector.addEventListener("change", startTime);
button.addEventListener("click", restartMouse);
document.addEventListener("keydown", restartKeyboard);

