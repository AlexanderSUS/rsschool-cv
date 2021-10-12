
const mainScreen = document.querySelectorAll('.main-screen-wrapper');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const dots = document.querySelectorAll('.dot-btn');
const videoList = document.querySelectorAll('.main-screen');
const videoPlayer = document.querySelector('.custom-vp');
const videoWrapper = document.querySelector('.video-wrapper');
const timeRange = document.querySelector('.time-range');
const volumeRange = document.querySelector('.volume-range');
const toggle = document.querySelectorAll('.toggle-play');
const toggleSound = document.querySelectorAll('.toggle-sound');
const playBtn = document.querySelectorAll('.play-btn');
const screenPlayBtn = document.querySelector('.screen-play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const soundBtn = document.querySelector('.sound-btn');
const muteBtn = document.querySelector('.mute-btn');
const tglScreen = document.querySelectorAll('.toggle-fullscreen');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const exitFullscreenBtn = document.querySelector('.exit-fullscreen-btn');
let video = document.querySelector('.main-screen.active');

//// switch wideo and slides 
let isEn = true;
let currentVideo = 0;

const changeCurrentVideo = n => {
  currentVideo = (n + mainScreen.length) % mainScreen.length;
}

function nextVideo(n, bullet) {
  hideVideo('to-left');
  if (bullet != undefined) {
    changeCurrentVideo(bullet);
  } else {
    changeCurrentVideo(n + 1);
  }
  showVideo('from-right');
  activeBullet(currentVideo);
}

function prevVideo(n, bullet) {
  hideVideo('to-right');
  if (bullet != undefined) {
    changeCurrentVideo(bullet);
  } else {
    changeCurrentVideo(n - 1);
  }
  showVideo('from-left');
  activeBullet(currentVideo);
}

function hideVideo(direction) {
  isEn = false;
  videoOff(currentVideo);
  mainScreen[currentVideo].classList.add(direction);
  mainScreen[currentVideo].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}

function showVideo(direction) {
  mainScreen[currentVideo].classList.add('next', direction);
  mainScreen[currentVideo].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    videoOn(currentVideo);
    isEn = true;
  });
}

const activeBullet = n => {
  for(dot of dots) {
    dot.classList.remove('active');
    dot.style.backgroundColor = "#999";
  }
  dots[n].classList.add('active');
  dots[n].style.backgroundColor = "#333";
}

dots.forEach((dot, indexDot) => {
  dot.addEventListener('click', () => {
    if (indexDot > currentVideo) {
      nextVideo(currentVideo, indexDot);
    } else if (indexDot < currentVideo) {
      prevVideo(currentVideo, indexDot);
    } else {
      return;
    }
  });
});

rightArrow.addEventListener('click', function() {
  if (isEn) {
    nextVideo(currentVideo);
  }
});

leftArrow.addEventListener('click', function() {
  if (isEn) {
    prevVideo(currentVideo);
  }
});

function videoOff(n) {
  if (!video.paused) {
    togglePlay(); 
    }
  videoList[n].classList.remove('active');
  videoList[n].removeEventListener('click', togglePlay, false);
  screenPlayBtn.classList.remove('active');
}

function videoOn(n) {
  videoList[n].classList.add('active');
  videoList[n].addEventListener('click', togglePlay);
  screenPlayBtn.classList.add('active');
    video = document.querySelector('.main-screen.active');
  }

/* END switch video and slides */


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
    togglePlayBtn();
  } else {
    video.pause();  
    togglePlayBtn();
  }
}

video.addEventListener('ended', () => {
  togglePlayBtn();
});

function togglePlayBtn() {
  playBtn.forEach(btn => btn.classList.toggle('active'));
  pauseBtn.classList.toggle('active');
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
