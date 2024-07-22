const form = document.querySelector(".form");
const minPerSet = document.querySelector(".min-per-set");
const sound = document.querySelector(".sound-type");
const numSet = document.querySelector(".num-of-set");
const timerCounter = document.querySelector(".timer__counter");
const image = document.querySelector(".image-tree__img");
const audioPlay = document.querySelector(".audio");
const message = document.querySelector(".message__text");
const startBtn = document.querySelector(".form__button");

let counter60sec;
let level = 0;

setMessage("Start your Poromodo & plane tree above!");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  counter();
});

function counter() {
  const track = sound.value;
  const min = minPerSet.value;
  const set = numSet.value;

  // Reset input value
  minPerSet.value = numSet.value = "";

  let countMin = min - 1;
  let countSec = 5;
  let countSet = 1;

  //Render init set value
  setMessage(`You are in set ${countSet}/${set}`);

  //Render and play track
  playTrack(track);

  counter60sec = setInterval(() => {
    renderTimer(countMin, countSec);
    countSec = countSec - 1;
    if (countSec < 0) {
      countSec = 5;
      countMin = countMin - 1;
      if (countMin < 0) {
        countSet++;
        if (countSet > set) {
          //Finish sets
          clearInterval(counter60sec);
          setMessage(`You finish all sets !`);

          //Update user level
          level++;
          setImageLevel(level);

          endSetSound();
          //Reset counter for next set
        } else {
          setMessage(`You are in set ${countSet}/${set}`);
          countMin = min - 1;
        }
      }
    }
  }, 1000);
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
}

function endSetSound() {
  audioPlay.innerHTML = `<audio 
          autoplay
          src="./audio/simple-notification.mp3"
        ></audio>`;
}

function setImageLevel(level) {
  image.setAttribute("src", `./img/${level}.png`);
}
