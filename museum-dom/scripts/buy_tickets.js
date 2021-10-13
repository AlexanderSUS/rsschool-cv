const radios = document.querySelectorAll('.radio-btn-tickets');
const inputs = document.querySelectorAll('.ticket-input');
const output = document.getElementById('output-sum');
const ticketBtn = document.querySelectorAll('.ticket-btn');

const basic = 1;
const senior = 0.5;
const permanentEx = 20;
const temporaryEx = 25;
const combinedEx = 40;
const typeArray = [permanentEx, temporaryEx, combinedEx];

saveValue();

function saveValue() {
  if (sessionStorage.getItem("total")) {
    output.innerHTML = sessionStorage.getItem("total");
    document.querySelector('.quantity-basic').value = sessionStorage.getItem("basicQty");
    document.querySelector('.quantity-senior').value = sessionStorage.getItem("seniorQty");
    radios[0].checked = false;

    for (let i = 0; i < radios.length; i++) {
      if (+sessionStorage.getItem("typeCost") == typeArray[i]) {
        radios[i].checked = true;
      }
    }
  } else {
    updateData();
  }
}



document.querySelector('.minus-basic').addEventListener('click', () => {
  document.querySelector('.quantity-basic').stepDown();
  });

document.querySelector('.plus-basic').addEventListener('click', () => {
  document.querySelector('.quantity-basic').stepUp();
});

document.querySelector('.minus-senior').addEventListener('click', () => {
 document.querySelector('.quantity-senior').stepDown();
});

document.querySelector('.plus-senior').addEventListener('click', () => {
  document.querySelector('.quantity-senior').stepUp();
});

radios.forEach(radio => {
  radio.addEventListener('click', updateData);
});

ticketBtn.forEach(btn => {
  btn.addEventListener('click', updateData);
});

function updateData() {
  let typeCost = getCostType(checkRadio());
  let basicQty = document.querySelector('.quantity-basic').value;
  let seniorQty = document.querySelector('.quantity-senior').value;

  let total = (typeCost * basicQty) + (typeCost * seniorQty * senior);

  output.innerHTML = total;

  sessionStorage.setItem("typeCost", typeCost);
  sessionStorage.setItem("basicQty", basicQty);
  sessionStorage.setItem("seniorQty", seniorQty);
  sessionStorage.setItem("total", total);
}


function getCostType(name) {
  if (name == "permanent") {
    return permanentEx;
  } 
  if (name == "temporary") {
    return temporaryEx;
  }
    return combinedEx;
}

function checkRadio() {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
}