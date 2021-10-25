export default getQuotes

const quotesUrl = 'https://raw.githubusercontent.com/AlexanderSUS/rsschool-cv/momentum/momentum/src/components/quote/data.json';

function pickRandom(arr) {
  return Math.floor(Math.random() * arr.length);
}

async function getQuotes() {
  const res = await fetch(quotesUrl);
  const data =  await res.json();
  const index = pickRandom(data);
  document.querySelector('.author').textContent = data[index].text;
  document.querySelector('.quote').textContent = data[index].author;
}

document.querySelector('.change-quote').addEventListener('click', getQuotes);