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
    let rounded = timerTime(time, true);
    const roundedSplitted =
      time < 600 ? rounded.split("s") : rounded.split("m", "s");
    // 0s format
    timer.innerHTML = `| ${
      roundedSplitted.length < 3
        ? Math.round(roundedSplitted[0]) + "s"
        : `${roundedSplitted[0]}m ${Math.round(`${roundedSplitted[2]}s`)}`
    }`;
    // 0.0s format
    // timer.innerHTML = `| ${timerTime(time, true)}`;
    if (completion.style.display === "block") {
      clearInterval(timerCount);
      let officialTime = score.title.split(" ")[0];
      let officialTimeWithMinutes = score.title.split(" ")[0];
      let officialTimeWithMinutesSeconds = score.title.split(" ")[3];
      score.innerHTML = `${document.getElementById("score").innerHTML} ${
        time > 600
          ? `${officialTimeWithMinutes}m ${officialTimeWithMinutesSeconds}s`
          : `${officialTime}s`
      }`;
      time = 0;
    }
  }, 50);
}
function timerTime(ms, msVisible) {
  if (msVisible === true && ms < 0) return "0.0s";
  if (msVisible === false && ms < 0) return "0s";
  let remainder = ms % 36000;
  const minutes = parseInt(Math.floor(remainder / 600));
  remainder = remainder % 600;
  let seconds = parseInt(Math.floor(remainder / 10));
  remainder = parseInt(Math.floor(remainder % 10));
  if (remainder === 10) {
    seconds++;
    remainder -= 10;
  }
  if (msVisible) {
    return `${minutes > 0 ? `${minutes}m ` : ""} ${`${seconds}.${remainder}s`}`;
  } else {
    return `${minutes > 0 ? `${minutes}m ` : ""} ${
      seconds > 0 ? `${seconds}s` : ""
    }`;
  }
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

