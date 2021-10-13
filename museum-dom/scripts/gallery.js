const pictureInnerContainer = document.querySelector('.picture-inner-container');

const pictureMaxNum = 15;
const maxHeight = 6090;
const picture = [];


for (let i = 0; i < pictureMaxNum; i++) {
  picture[i] = document.createElement('img');
  picture[i].classList.add('gallery-img'); 
  picture[i].src = `./assets/gallery/galery${i + 1}.jpg`;
  picture[i].alt = `galery${i + 1}`;
}

let newPicture = shuffle(picture);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

for (let i = 0; i < pictureMaxNum; i++) {
    pictureInnerContainer.append(newPicture[i]);
    if (i == 10 && screen.width > 768) {
      newPicture[i].style.paddingTop = "50px";
    }
}

/* Animation Effect */

let scroll = window.requestAnimationFrame || function(callback) {
  window.setTimeout(callback, 1000/60);}

function effect() {
  newPicture.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  });

  scroll(effect);
}

effect();

function isElementInViewport(el) {
    if (typeof jQuery === "functiton" && el instanceof jQuery) {
      el = el[0];
    }

  let rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}