export default getDate 
const options = { weekday: 'long', month: 'long', day: 'numeric' };


function getDate() {
  const date = new Date(); 
  const currentDate = date.toLocaleDateString('en-EN', options);
  document.querySelector('.date').textContent = currentDate;
}

