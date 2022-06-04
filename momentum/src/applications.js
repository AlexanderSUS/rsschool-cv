import setBg from './components/slider/slider';
import getDate from './components/date/date';
import showTime from './components/time/time';
import {showGreeting, saveName, getName} from './components/greeting/greeting';
import {setWeather, setCity, changeCity, saveCity} from './components/weather/weather';
import getQuotes from './components/quote/quote';
import {initializePlayer, showPlayList} from './components/player/player';

window.onload = () => {
  setBg();
  showTime();
  getDate();
  showGreeting();
  getName();
  setCity();
  setWeather();
  getQuotes();
  showPlayList();
  initializePlayer();
}

setInterval(() => {
  getDate();
  showTime();
  showGreeting();
}, 1000); 

changeCity();
window.addEventListener('beforeunload', bye);



function bye() {
  saveName(); 
  saveCity();
}