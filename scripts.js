const form = document.querySelector(".form");
const minPerSet = document.querySelector(".min-per-set");
const sound = document.querySelector(".sound-type");
const numSet = document.querySelector(".num-of-set");
const restTime = document.querySelector(".rest-time");
const startBtn = document.querySelector(".form__button");

const image = document.querySelector(".tree-map__img");
const plantedMsg = document.querySelector(".tree-map__planted");
const audioPlayer = document.querySelector(".audio");
const notificationSound = document.querySelector(".notification-sound");
const message = document.querySelector(".message__text");
const timerCounter = document.querySelector(".timer__counter");
const timerRest = document.querySelector(".timer__rest");

// Variabel for global tracking
let setTrack, setMin, setSet, setRest, countSet;
let plantedTree = 0;

// countdown interval variable
let countDown;
let restCountdown;

// For faster min count testing purpose
// let secsPerMin = 5;
let secsPerMin = 59;

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
  clearInterval(restCountdown);

  //Render and play track
  playSoundTrack(setTrack);

  // Run new counter loop
  counter();
});

function counter() {
  let countMin = setMin - 1;
  let countSec = secsPerMin;

  //Render init set value
  setMessage(`You are in set ${countSet}/${setSet} (${setMin} min/set)`);

  countDown = setInterval(() => {
    renderTimer(countMin, countSec);
    countSec = countSec - 1;
    // Check for finish 1 min & reset countMin
    if (countSec < 0) {
      countSec = secsPerMin;
      countMin = countMin - 1;

      //Check for Finish 1 set
      if (countMin < 0) {
        countSet++;

        //Update planted tree
        plantedTree++;
        if (plantedTree > 16) plantedTree = 16;

        renderPlantedTree(plantedTree);
        clearInterval(countDown);
        playNotificationSound("endOneSet");
        restTimeCounter(setRest);
      } else {
        countMin = setMin - 1;
      }
    }
  }, 1000);
}

function restTimeCounter(value) {
  const setRestMin = value;

  let countRestSec = secsPerMin;
  let countRestMin = setRestMin - 1;

  // Check all sets finished
  if (countSet > setSet) {
    setMessage(`You finish all sets !`);
    playNotificationSound("endSets");

    //Reset countdown counter for next set
  } else {
    timerRest.classList.add("timer__rest--active");
    setMessage(`Rest Time!`);
    restCountdown = setInterval(() => {
      timerRest.textContent = `${
        countRestMin < 10 ? `0${countRestMin}` : countRestMin
      }:${countRestSec < 10 ? `0${countRestSec}` : countRestSec}`;
      countRestSec = countRestSec - 1;
      if (countRestSec < 0) {
        countRestSec = secsPerMin;
        countRestMin = countRestMin - 1;

        // Check rest counter finished
        if (countRestMin < 0) {
          clearInterval(restCountdown);
          timerRest.classList.remove("timer__rest--active");
          playNotificationSound("endRest");
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

function playSoundTrack(track) {
  if (!track) return;

  let source =
    track === "piano"
      ? "Morning Walks  Chiara Arpressio"
      : track === "baroque"
      ? "Canon in D Pachelbels Canon"
      : "";

  audioPlayer.innerHTML = `<audio 
          loop
          autoplay
          controls
          src="./audio/${source}.mp3"
        ></audio>`;
}

function playNotificationSound(type) {
  if (!type) return;

  let soundSource =
    type === "endSets"
      ? "simple-notification"
      : type === "endRest"
      ? "audio-logo-fa-la-la-185246"
      : type === "endOneSet"
      ? "positive-notification-new-level-152480"
      : "";

  // Descrease volume track before the notification sound
  audioPlayer.firstChild.volume = 0.4;
  notificationSound.innerHTML = `<audio 
          autoplay
          src="./audio/${soundSource}.mp3"
        ></audio>`;

  notificationSound.firstChild.addEventListener("ended", () => {
    // Increase volume track after notification
    audioPlayer.firstChild.volume = 1;
  });
}

// Change map image with level up per finished set
function renderPlantedTree(plantedNum) {
  image.setAttribute("src", `./img/${plantedNum}.png`);
  if (plantedNum === 16)
    plantedMsg.textContent = `Congratulation! You planted all trees 🌲`;
  else {
    plantedMsg.textContent = `You planted ${plantedTree} trees 🌲`;
  }
}
