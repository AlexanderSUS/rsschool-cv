export {showGreeting, saveName, getName}

const name = document.querySelector('.name');

function saveName() {
    localStorage.setItem('name', name.value);
}

function getName() {
  if(localStorage.getItem('name') !== null) {
    name.value = localStorage.getItem('name');
  }
}

function getHour() {
  const d = new Date();
  let hour = d.getHours();
  return hour;
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

function showGreeting() {
  document.querySelector('.greeting').textContent = `Good ${getTimeOfDay()}`;
}
