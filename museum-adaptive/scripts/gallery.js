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
    if (i == 10) {
      newPicture[i].style.paddingTop = "50px";
    }
}
