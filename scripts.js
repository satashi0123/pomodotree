const form = document.querySelector(".form");
const minPerSet = document.querySelector(".min-per-set");
const sound = document.querySelector(".sound-type");
const numSet = document.querySelector(".num-of-set");
const restTime = document.querySelector(".rest-time");
const startBtn = document.querySelector(".form__button");

const image = document.querySelector(".tree-map__img");
const plantedMsg = document.querySelector(".tree-map__planted");
const audioPlay = document.querySelector(".audio");
const message = document.querySelector(".message__text");
const timerCounter = document.querySelector(".timer__counter");
const timerRest = document.querySelector(".timer__rest");

let countDown;
let restCountdown;
let plantedTree = 0;

// Variabel for global tracking
let setTrack, setMin, setSet, setRest, countSet;

// For testing purpose
const testSec = 5;

// Init message
setMessage("Start your Poromodo & plane tree above!");

form.addEventListener("submit", (e) => {
  // Record all the input value
  setTrack = sound.value;
  setMin = minPerSet.value;
  setSet = numSet.value;
  setRest = restTime.value;

  // Set default countSet
  countSet = 1;

  // Reset all input field
  minPerSet.value = numSet.value = "";

  e.preventDefault();
  // Clear the lastest dountdown on run
  clearInterval(countDown);
  // Run new counter
  counter();
});

function counter() {
  let countMin = setMin - 1;
  let countSec = testSec;

  //Render init set value
  setMessage(`You are in set ${countSet}/${setSet} (${setMin} min/set)`);

  //Render and play track
  playTrack(setTrack);

  countDown = setInterval(() => {
    renderTimer(countMin, countSec);
    countSec = countSec - 1;
    // Check for finish 1 min & reset countMin
    if (countSec < 0) {
      countSec = testSec;
      countMin = countMin - 1;
      //Check for Finish 1 set
      if (countMin < 0) {
        countSet++;

        //Update planted tree
        plantedTree++;
        renderPlantedTree(plantedTree);
        clearInterval(countDown);
        restTimeCounter(setRest);

        // Check for finished all
        // if (countSet > setSet) {
        //   //Finish sets
        //   clearInterval(countDown);
        //   setMessage(`You finish all sets !`);

        //   endSetSound();

        //   //Reset dountdown counter for next set
        // } else {
        //   setMessage(`You are in set ${countSet}/${setSet}`);
        //   countMin = setMin - 1;
        // }
      } else {
        countMin = setMin - 1;
      }
    }
  }, 1000);
}

function restTimeCounter(value) {
  const sm = value;
  const ss = 5;

  let cs = 5;
  let cm = sm - 1;

  if (countSet > setSet) {
    //Finish sets

    setMessage(`You finish all sets !`);
    endSetSound();

    //Reset dountdown counter for next set
  } else {
    timerRest.classList.add("timer__rest--active");
    setMessage(`Rest Time!`);
    restCountdown = setInterval(() => {
      timerRest.textContent = `${cm < 10 ? `0${cm}` : cm}:${
        cs < 10 ? `0${cs}` : cs
      }`;
      cs = cs - 1;
      if (cs < 0) {
        cs = ss;
        cm = cm - 1;
        if (cm < 0) {
          clearInterval(restCountdown);
          timerRest.classList.remove("timer__rest--active");
          counter();
        }
      }
    }, 1000);
  }
}

function renderTimer(min, sec) {
  timerCounter.textContent = `${min < 10 ? `0${min}` : min}:${
    sec < 10 ? `0${sec}` : sec
  }`;
}

function setMessage(msg) {
  message.textContent = msg;
}

function playTrack(track) {
  if (track === "piano")
    audioPlay.innerHTML = `<audio 
          loop
          autoplay
          controls
          src="./audio/Morning Walks  Chiara Arpressio.mp3"
        ></audio>`;
  else if (track === "baroque")
    audioPlay.innerHTML = `<audio 
  loop
  autoplay
  controls
  src="./audio/Canon in D Pachelbels Canon.mp3"
></audio>`;
  else return;
}

function endSetSound() {
  audioPlay.innerHTML = `<audio 
          autoplay
          src="./audio/simple-notification.mp3"
        ></audio>`;
}

// Change map image with level up per finished set
function renderPlantedTree(plantedNum) {
  image.setAttribute("src", `./img/${plantedNum}.png`);
  plantedMsg.textContent = `You planted ${plantedTree} trees 🌲`;
}
