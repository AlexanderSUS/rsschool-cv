const prev = document.getElementById('btn-prev'),
      next = document.getElementById('btn-next'),
      slides = document.querySelectorAll('.welcome-slide'),
      squares = document.querySelectorAll('.square'),
      num = document.getElementById('slide-num');

let isEnabled = true;
let currentSlide = 0;


const changeCurrentSlide = n => {
  currentSlide = (n + slides.length) % slides.length;
}

function nextSlide(n, sq) {
  hideSlide('to-left');
  if (sq != undefined) {
    changeCurrentSlide(sq);
  } else {
    changeCurrentSlide(n + 1);
  }
  showSlide('from-right');
  asctiveSquare(currentSlide);
}

function prevSlide(n, sq) {
  hideSlide('to-right');
  if (sq != undefined) {
    changeCurrentSlide(sq);
  } else {
    changeCurrentSlide(n - 1);
  }
  showSlide('from-left');
  asctiveSquare(currentSlide);
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add('next', direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

const asctiveSquare = n => {
  for(square of squares) {
    square.classList.remove('active');
    square.style.backgroundColor = "#fff";
  }
  squares[n].classList.add('active');
  squares[n].style.backgroundColor = "#9d8665";
  num.innerHTML = currentSlide + 1; 
}


squares.forEach((item, indexSquare) => {
  item.addEventListener('click', () => {
    if (indexSquare > currentSlide) {
      nextSlide(currentSlide, indexSquare);
    } else if (indexSquare < currentSlide) {
      prevSlide(currentSlide, indexSquare);
    } else {
      return;
    }
  });
});

next.addEventListener('click', function() {
  if (isEnabled) {
    nextSlide(currentSlide);
  }
});

prev.addEventListener('click', function() {
  if (isEnabled) {
    prevSlide(currentSlide);
  }
});

const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 500;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						prevSlide(currentSlide);
					}
				} else {
					if (isEnabled) {
						nextSlide(currentSlide);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					prevSlide(currentSlide);
				}
			} else {
				if (isEnabled) {
					nextSlide(currentSlide);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									prevSlide(currentSlide);
								}
							} else {
								if (isEnabled) {
									nextSlide(currentSlide);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

let el = document.querySelector('.welcome-slider');
swipedetect(el); //currentSlide = (n + slides.length) % slides.length;
