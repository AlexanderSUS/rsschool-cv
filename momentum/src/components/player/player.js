import playList from "./playlist";
export {initializePlayer, showPlayList}

const playBtn = document.getElementById('play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const list = document.querySelector('.play-list');
const timeRange = document.querySelector('.time-range');
const volumeRange = document.querySelector('.volume-range');
const trackProgress = document.querySelector('.track-progress');
const trackDuration = document.querySelector('.track-duration');
const trackName = document.querySelector('.track-name');
const soundBtn = document.querySelector('.sound-btn');
let playTracks;

const audio = new Audio();
let currentTrack = 0;

audio.volume = volumeRange.value / 1000;
timeRange.value = 0;

function changeTrack(index) {
  currentTrack = (index + playList.length) % playList.length;
}

function setTrack() {
  audio.src = playList[currentTrack].src;
  audio.onload = () => {
    audio.currentTime = 0;
  }
}

function toggleAudio() {
  audio.paused ? playAudio() : pauseAudio(); 
}

function playAudio() {
  audio.play();
  playBtn.classList.remove('play');
  playBtn.classList.add('pause');
  playTracks[currentTrack].classList.remove('stopped');
}

function pauseAudio() {
  audio.pause();
  playBtn.classList.remove('pause');
  playBtn.classList.add('play');
  playTracks[currentTrack].classList.add('stopped');
}

function offTrackHightligth() {
  document.querySelector('.item-active').classList.remove('item-active');
}

function onTrackHightligth() {
  document.querySelector(`.play-item:nth-of-type(${currentTrack + 1})`).classList.add('item-active');
}

function runTrack() {
  setTrack();
  setTrackInfo();
  onTrackHightligth();
  toggleAudio();
}

function prevTrack() {
  offTrackHightligth();
  changeTrack(currentTrack - 1);
  runTrack();
}

function nextTrack() {
  offTrackHightligth();
  changeTrack(currentTrack + 1);
  runTrack();
}

function initializePlayer(){
  setTrack();
  setTrackInfo();
  setPlayerListeners();
}

function showPlayList() {
  playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent  = el.title;
    list.append(li);
  });
  document.querySelector('.play-item:first-of-type').classList.add('item-active');
  document.querySelector('.play-item:first-of-type').classList.add('stopped');
  playTracks = list.childNodes;
}

function setTrackInfo() {
  trackName.textContent = playList[currentTrack].title; 
  trackDuration.textContent = playList[currentTrack].duration;
  changeTrackProgress();
}

function toggleSound() {
  if (audio.muted) {
    audio.muted = false;
  } else{
    audio.muted = true;
  }
    soundBtn.classList.toggle('muted');
}


function changeVolume() {
  audio.volume = volumeRange.value / 1000;
  if (audio.volume == 0) {
    if (soundBtn.classList.contains('muted')) {
      return;
    } else { 
      soundBtn.classList.add('muted');
    } 
  } else {
      if (soundBtn.classList.contains('muted')) {
        soundBtn.classList.remove('muted');
      }
      audio.muted=false;
  }
}

/* Changes of range's color before slider-thumb */
function upgradeTimeRangeColor(el) {
  let value = el.value;
  el.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #fff ${value}%, #fff 100%)`;
}

function setPad(num) {
  return num < 10 ? `0${num}` : num;
}

function changeTrackProgress() {
  let time = Math.round(+audio.currentTime);
  let min = Math.floor(time / 60);
  let sec = time % 60;
  trackProgress.textContent = `${setPad(min)}:${setPad(sec)}`;
}


function setPlayerListeners() {
  playBtn.addEventListener('click', toggleAudio);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);

  /* Changes of range's color before slider-thumb */
  timeRange.addEventListener('input', function() {
    upgradeTimeRangeColor(timeRange);
  });
  volumeRange.addEventListener('input', function() {
    upgradeTimeRangeColor(volumeRange);
  });
  /* end changes of range's color before slider-thumb*/

  audio.addEventListener('timeupdate', () => {
    timeRange.value = (audio.currentTime / audio.duration) * 100;
    changeTrackProgress();
    upgradeTimeRangeColor(timeRange);
  });

  timeRange.addEventListener('input', () => {
    audio.currentTime =  (audio.duration * timeRange.value) / 100 ;
  });

  volumeRange.addEventListener('input', changeVolume); 
  soundBtn.addEventListener('click', toggleSound);

  
  audio.addEventListener('ended', nextTrack);

  playTracks.forEach((track, indexTrack) => {
    track.addEventListener('click', () => {
      if (indexTrack != currentTrack) {
        offTrackHightligth();
        currentTrack = indexTrack;
        runTrack();
      } else if (audio.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
    })}
  );
}
