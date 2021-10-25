export default showTime

function showTime() {
  const time = new Date;
  document.querySelector('.time').textContent = time.toLocaleTimeString();
}