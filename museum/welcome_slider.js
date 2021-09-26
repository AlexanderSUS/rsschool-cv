const prev = document.getElementById('btn-prev'),
      next = document.getElementById('btn-next'),
      slides = document.querySelectorAll('.slide'),
      squares = document.querySelectorAll('.square'),
      num = document.getElementById('slide-num');

let index = 0;

console.log(slides);
const asctiveSlide = n => {
  for(slide of slides) {
    slide.classList.remove('active');
  }
  slides[n].classList.add('active');
}

const asctiveSquare= n => {
  for(square of squares) {
    square.classList.remove('active');
    square.style.backgroundColor = "#fff";
  }
  squares[n].classList.add('active');
  squares[n].style.backgroundColor = "#9d8665";
  num.innerHTML = index + 1;
}

const showCurrentSlide = ind => {
  asctiveSlide(ind);
  asctiveSquare(ind);
}

const nextSlide = () => {
  if(index == slides.length - 1) {
    index = 0;
    showCurrentSlide(index);
  } 
  else {
    index++;
    showCurrentSlide(index);
  }
}

const prevSlide = () => {
  if(index == 0) {
    index = slides.length - 1;
    showCurrentSlide(index);
  } 
  else {
    index--;
    showCurrentSlide(index);
  }
}

squares.forEach((item, indexSquare) => {
  item.addEventListener('click', () => {
    index = indexSquare;
    showCurrentSlide(index);
  })
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);