export default getQuotes


async function getQuotes() {
  const quotes = 'https://raw.githubusercontent.com/AlexanderSUS/rsschool-cv/momentum/src/components/quote/data.json';
  const res = await fetch(quotes)
  const data =  await res.json();
  console.log(data);
}