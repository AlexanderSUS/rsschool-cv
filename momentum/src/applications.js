import setBg from './components/slider/slider';
import getDate from './components/date/date';
import showTime from './components/time/time';
import {showGreeting, saveName, getName} from './components/greeting/greeting'

window.onload = () => {
  setBg();
  showTime();
  getDate();
  showGreeting();
  getName();
}

window.addEventListener('beforeunload', saveName);

setInterval(() => {
  getDate();
  showTime();
  showGreeting();
}, 1000); 
