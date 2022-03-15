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

  console.log(`Цель: ${data.get('title__input')}`);
  console.log(`Требуемая сумма: ${data.get('need__input')}`);
  console.log(`Стартовая сумма ${data.get('form__have')}`);
  console.log(`Процентная ставка: ${data.get('form__percent')}`);
  console.log(`Срок: ${data.get('form__time')}`);
  console.log(`Сумма пополнения: ${data.get('form__output')}`);
  alert('Цель добавлена');
  array.push(new Target(`${data.get('title__input')}`, `${data.get('need__input')}`, `${data.get('form__have')}`,
  `${data.get('form__percent')}`, `${data.get('form__time')}`, `${data.get('form__output')}`));
  console.log(array);
});


let principal = document.querySelector('.form__have').value;
let interest = document.querySelector('.form__percent').value;
let period = document.querySelector('.form__time').value;
let required = document.querySelector('.form__need').value;
document.querySelector('.form__output').value = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1));
document.querySelector('.form__output').value = Number(document.querySelector('.form__output').value).toFixed(2);

document.querySelectorAll('.inputBox').forEach((element) => {
  element.addEventListener('input', () => {
    let principal = document.querySelector('.form__have').value;
    let interest = document.querySelector('.form__percent').value;
    let period = document.querySelector('.form__time').value;
    let required = document.querySelector('.form__need').value;
    document.querySelector('.form__output').value = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1));
    document.querySelector('.form__output').value = Number(document.querySelector('.form__output').value).toFixed(2);
  })
})
