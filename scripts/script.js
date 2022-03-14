let array = [];

class Target {
  constructor(goal, required, principal, interest, period, replenishment) {
    this.goal = goal;
    this.required = required;
    this.principal = principal;
    this.interest = interest;
    this.period = period;
    this.replenishment = replenishment;
  }
}

const userForm = document.querySelector('form');

userForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(event.target);

  console.log(`Цель: ${data.get('goal')}`);
  console.log(`Требуемая сумма: ${data.get('required')}`);
  console.log(`Стартовая сумма ${data.get('principal')}`);
  console.log(`Процентная ставка: ${data.get('interest')}`);
  console.log(`Срок: ${data.get('period')}`);
  console.log(`Сумма пополнения: ${data.get('replenishment')}`);
  alert('Цель добавлена');
  array.push(new Target(`${data.get('goal')}`, `${data.get('required')}`, `${data.get('principal')}`,
  `${data.get('interest')}`, `${data.get('period')}`, `${data.get('replenishment')}`));
  console.log(array);
});




// let principal = document.querySelector('.input-principal').value;
// let interest = document.querySelector('.input-interest').value;
// let period = document.querySelector('.input-period').value;
// let required = document.querySelector('.input-required').value;


// let replenishment;

// replenishment = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1))

let principal = document.querySelector('.input-principal').value;
let interest = document.querySelector('.input-interest').value;
let period = document.querySelector('.input-period').value;
let required = document.querySelector('.input-required').value;
document.querySelector('.input-replenishment').value = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1));
document.querySelector('.input-replenishment').value = Number(document.querySelector('.input-replenishment').value).toFixed(2);

document.querySelectorAll('.inputBox').forEach((element) => {
  element.addEventListener('input', () => {
    let principal = document.querySelector('.input-principal').value;
    let interest = document.querySelector('.input-interest').value;
    let period = document.querySelector('.input-period').value;
    let required = document.querySelector('.input-required').value;
    document.querySelector('.input-replenishment').value = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1));
    document.querySelector('.input-replenishment').value = Number(document.querySelector('.input-replenishment').value).toFixed(2);
  })
})


