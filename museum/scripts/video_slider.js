
const mainScreen = document.querySelectorAll('.main-screen');
const slides = document.querySelectorAll('.slide-screen');
const dots = document.querySelectorAll('.dot-btn');

let indexV = 0;


const activeVideo = n => {
  for (screen of mainScreen) {
    screen.classList.remove('active')
  }
  mainScreen[n].classList.add('active');
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
  if(indexV == 5) {
    indexV = 1;
    showCurrentVideo(indexV);
  } else {
    indexV++;
    showCurrentVideo(indexV);
  }
}

const prevVideo = () => {
  if(indexV == 1) {
    indexV = 5; 
    showCurrentVideo(indexV);
  } 
  else {
    indexV--;
    showCurrentVideo(indexV);
  }
}

dots.forEach((item, indexDot) => {
  item.addEventListener('click', () => {
    indexV = indexDot;
    showCurrentVideo(indexV);
  })
})

slides.forEach((item, indexVideo) => {
  item.addEventListener('click', () => {
    indexV = indexVideo;
    showCurrentVideo(indexV);
  })
})

