const prev = document.getElementById('btn-prev'),
      next = document.getElementById('btn-next'),
      slide = document.getElementById('slide'),
      squares = document.querySelectorAll('.square'),
      num = document.getElementById('slide-num');

const maxIndex = 5;
let index = 1;

const asctiveSlide = n => {
  slide.style.backgroundImage = "url(./assets/" + n + ".jpg)"; 
}

const asctiveSquare= n => {
  for(square of squares) {
    square.classList.remove('active');
    square.style.backgroundColor = "#fff";
  }
  squares[n].classList.add('active');
  squares[n].style.backgroundColor = "#9d8665";
  num.innerHTML = index; 
}

const showCurrentSlide = ind => {
  asctiveSlide(ind);
  asctiveSquare(ind - 1);
}

const nextSlide = () => {
  if(index == 5) {
    index = 1;
    showCurrentSlide(index);
  } else {
    index++;
    showCurrentSlide(index);
  }
}

const prevSlide = () => {
  if(index == 1) {
    index = 5; 
    showCurrentSlide(index);
  } 
  else {
    index--;
    showCurrentSlide(index);
  }
}

squares.forEach((item, indexSquare) => {
  item.addEventListener('click', () => {
    index = indexSquare + 1;
    showCurrentSlide(index);
  })
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);