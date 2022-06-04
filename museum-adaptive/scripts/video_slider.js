
const mainScreen = document.getElementById('main-screen');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const dots = document.querySelectorAll('.dot-btn');

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
  })
})

