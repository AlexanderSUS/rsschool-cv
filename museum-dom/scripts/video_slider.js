
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

/* END switch video and slides */

const videoPlayer = document.querySelector('.custom-vp');
const videoWrapper = document.querySelector('.video-wrapper');
const timeRange = document.querySelector('.time-range');
const volumeRange = document.querySelector('.volume-range');
const toggle = document.querySelectorAll('.toggle-play');
const toggleSound = document.querySelectorAll('.toggle-sound');
const video = document.querySelector('.main-screen.active');
const playBtn = document.querySelectorAll('.play-btn');
const screenPlayBtn = document.querySelector('.screen-play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const soundBtn = document.querySelector('.sound-btn');
const muteBtn = document.querySelector('.mute-btn');
const tglScreen = document.querySelectorAll('.toggle-fullscreen');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const exitFullscreenBtn = document.querySelector('.exit-fullscreen-btn');

video.volume = volumeRange.value / 1000;
timeRange.value = 0; 

/* Changes of track's color before slider-thumb */
timeRange.addEventListener('input', function() {
  upgradeTimeRangeColor(timeRange);
});

volumeRange.addEventListener('input', function() {
  upgradeTimeRangeColor(volumeRange);
});

function upgradeTimeRangeColor(el) {
  let value = el.value;
  el.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
}

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

/* Sound  */
toggleSound.forEach(element => {
  element.addEventListener('click', tglSound);
});

volumeRange.addEventListener('input', changeVolume);

function tglSound() {
  if (video.muted) {
    video.muted=false;
    tglSoundBtn();
  } else {
    video.muted=true;
    tglSoundBtn()
  }
}

function tglSoundBtn() {
  muteBtn.classList.toggle('active');
  soundBtn.classList.toggle('active');
}

function changeVolume() {
  video.volume = volumeRange.value / 1000;
    if (video.volume == 0) {
      if (muteBtn.classList.contains('active')) {
        return;
      }
      tglSoundBtn();
    } else {
        if (soundBtn.classList.contains('active')) {
          return;
        }
        tglSoundBtn();
        video.muted=false;
    }
}

/*  Progress */
video.addEventListener('timeupdate', () => {
  timeRange.value = (video.currentTime / video.duration) * 100;
  upgradeTimeRangeColor(timeRange);
});

timeRange.addEventListener('input', () => {
  video.currentTime =  (video.duration * timeRange.value) / 100 ;
});

/* Fullscreen option */

tglScreen.forEach(btn => {
  btn.addEventListener('click', toggleFullscreen);
});

function tglFullscreenBtn() {
  fullscreenBtn.classList.toggle('active');
  exitFullscreenBtn.classList.toggle('active');
}

function toggleFullscreen() {
  if (!document.webkitFullscreenElement) {
    videoPlayer.webkitRequestFullscreen();
    videoWrapper.style.maxWidth = "100%";
    videoWrapper.style.maxHeight = "94%"
    screenPlayBtn.classList.toggle('fullscreen');
    tglFullscreenBtn();
    
  } else {
    document.webkitExitFullscreen();
    videoWrapper.style.maxWidth = "1440px";
    videoWrapper.style.maxHeight = "650px";
    screenPlayBtn.classList.toggle('fullscreen');
    tglFullscreenBtn();
  }
}
