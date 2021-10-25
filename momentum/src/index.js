import './style/style.scss';
import Player from './components/player/'
import Weather from './components/weather/';
import Slider from './components/slider';
import Time from './components/time';
import Date from './components/date';
import Greeting from './components/greeting';
import Quote from './components/quote';

// import json from './assets/json.json'  FOR WORK WITH JSON FILE

const root = document.getElementById('root');
const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");

header.classList.add('header');
main.classList.add('main');
footer.classList.add('footer');

header.appendChild(Player);
header.appendChild(Weather);

main.appendChild(Slider);
main.appendChild(Time);
main.appendChild(Date);
main.appendChild(Greeting);

footer.appendChild(Quote);


root.append(header);
root.append(main);
root.append(footer);


