// ==UserScript==
// @name         Seterra new timing system final screen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Milliseconds on the final screen
// @author       Sinskiy
// @match        *://*.geoguessr.com/seterra/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geoguessr.com
// @grant        none
// ==/UserScript==
const finalScore = document.getElementById("lblFinalScore2");
const completion = document.getElementById("completion");
const map = document.getElementById("svgDiv");

function changeTime() {
  if (completion.style.display === "block") {
    const finalScoreTime = finalScore.title.split("(")[0];
    const seconds = finalScoreTime.replace(" seconds", "s");
    const minutes = seconds.replace(" minutes", "m");
    const hours = minutes.replace(" hours", "h");
    const final = hours.replace(", and ", " ");
    finalScore.innerHTML = `${
      document.getElementById("score").innerHTML
    } ${final}`;
  }
}

map.addEventListener("click", changeTime);
