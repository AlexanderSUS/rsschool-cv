export default setBg 

const body = document.getElementById('body');
const prev = document.querySelector('.slide-prev'); 
const next = document.querySelector('.slide-next'); 
let currentUrlIndex = 0;
let noTransition = true;
const maxQtyOfLinks = 20;
const linksCollection = []; 


const ghLink = {
  name: "github",
  url: "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/",
};

function getHour() {
  const d = new Date();
  let hour = d.getHours();
  return hour;
}

function getBgNum() {
  let rand = Math.floor(Math.random() * 20) + 1;
  return rand < 10 ? rand.toString().padStart(2, "0") : rand;
}

function getTimeOfDay() {
  const hour = getHour();
  
  if (hour < 4 || hour >= 20) {
    return "night";
  } 
  if (hour < 11) {
    return "morning";
  }
  if (hour < 17) {
    return "afternoon";
  }
  if (hour < 20) {
    return "evening";
  }
}

function getUrl(link, num, opt) {
  let url;

  if (link.name == "github" ) {
    url = `url(${link.url}${getTimeOfDay()}/${num}.jpg)`;
  }
  return url;
}

function changeCurrentUrl(index) {
  currentUrlIndex = (index + maxQtyOfLinks)  % maxQtyOfLinks;
}

function pickImageUrl() {
  let newUrl;
  while (true) {
   newUrl = getUrl(ghLink, getBgNum());
    if (!linksCollection.includes(newUrl)) {
      return newUrl;
    }
  }
}

function prevSlide() {
  if (noTransition) {
    changeCurrentUrl(currentUrlIndex - 1);
    setBg();
    noTransition = false;
  }
}

function nextSlide() {
  if (noTransition) {
    changeCurrentUrl(currentUrlIndex + 1);
    setBg();
    noTransition = false;
  }
}

function setBg() {
  if (linksCollection[currentUrlIndex] === undefined) {
    linksCollection[currentUrlIndex] = pickImageUrl();
  }   
  body.style.backgroundImage = linksCollection[currentUrlIndex];
}

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
body.addEventListener('transitionend', () => {
  noTransition = true;
});
