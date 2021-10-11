
const mainScreen = document.getElementById('main-screen');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const dots = document.querySelectorAll('.dot-btn');



//// switch wideo and slides 

let indexV = 0;

const activeVideo = n => {
  mainScreen.scr = "assets/video/video" + n + ".mp4";
  mainScreen.poster = "assets/video/poster" + n + ".jpg";
}

const activeDot= n => {
  for(dot of dots) {
    dot.classList.remove('active-dot');
  }
  dots[n].classList.add('active-dot');
}


const showCurrentVideo = ind => {
  activeVideo(ind);
  activeDot(ind);
}

const nextVideo = () => {
  if(indexV == 4) {
    indexV = 0;
    showCurrentVideo(indexV);
  } else {
    indexV++;
    showCurrentVideo(indexV);
  }
}

const prevVideo = () => {
  if(indexV == 0) {
    indexV = 4; 
    showCurrentVideo(indexV);
  } 
  else {
    indexV--;
    showCurrentVideo(indexV);
  }
}


// leftArrow.addEventListener('click', prevVideo());
// rightArrow.addEventListener('click', nextVideo());

dots.forEach((item, indexDot) => {
  item.addEventListener('click', () => {
    indexV = indexDot;
    showCurrentVideo(indexV);
  });
});

/// END switch video and slides

const timeRange = document.querySelector('.time-range');
const volumeRange = document.querySelector('.volume-range');
const toggle = document.querySelectorAll('.toggle-play');
const toggleSound = document.querySelectorAll('.toggle-sound');
const video = document.querySelector('.main-screen.active');
const playBtn = document.querySelectorAll('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const soundBtn = document.querySelector('.sound-btn');
const muteBtn = document.querySelector('.mute-btn');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const exitFullscreenBtn = document.querySelector('.exit-fullscreen-btn');


video.volume = volumeRange.value / 1000;

timeRange.max = Math.ceil(video.duration).toString();

timeRange.value = video.currentTime;
/// changes of track's color before slider-thumb 

timeRange.addEventListener('input', function() {
  let value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

volumeRange.addEventListener('input', function() {
  let value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

/* Toggle play & pause */

toggle.forEach(element => {
  element.addEventListener('click', togglePlay)});

video.addEventListener('click', togglePlay);

function togglePlay() {
  if (video.paused) {
    video.play(); 
    playBtn.forEach(btn => btn.classList.remove('active'));
    pauseBtn.classList.add('active');
  } else {
    video.pause();  
    pauseBtn.classList.remove('active');
    playBtn.forEach(btn => btn.classList.add('active'));
  }
}

/* sound  */

toggleSound.forEach(element => {
  element.addEventListener('click', tglSound);
});

volumeRange.addEventListener('input', changeVolume);

function tglSound() {
  if (video.muted) {
    video.muted=false;
    iconSoundOn();
  } else {
    video.muted=true;
    iconSoundOf();
  }
}

function iconSoundOn() {
  muteBtn.classList.remove('active');
  soundBtn.classList.add('active');
}

function iconSoundOf() {
  soundBtn.classList.remove('active');
  muteBtn.classList.add('active');
}

function changeVolume() {
  video.volume = volumeRange.value / 1000;
    if (video.volume == 0) {
      if (muteBtn.classList.contains('active')) {
        return;
      }
      iconSoundOf();
    } else {
        if (soundBtn.classList.contains('active')) {
          return;
        }
        iconSoundOn();
    }
}
/*  progress */

timeRange.addEventListener('input', changeTime); 

function changeTime() {
  let durationQ = video.duration / 100;

  video.currentTime = timeRange.value * durationQ;
}


