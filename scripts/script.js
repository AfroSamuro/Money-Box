let array = [];

class Target {
  constructor(goal, required, principal, interest, period, replenishment) {
    this.id = new Date().getTime()
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

  let blackscreen = document.createElement('div');
  let loadDiv = document.createElement('div');
  blackscreen.classList.add('load');
  loadDiv.classList.add('loadDiv');
  loadDiv.textContent = 'Цель добавлена!';
  document.querySelector('main').append(blackscreen);
  document.querySelector('.load').append(loadDiv);

  setTimeout(() => {
    document.querySelector('.load').remove()
  }, 1000)

  userForm.reset();

  array.push(new Target(`${data.get('title__input')}`, `${data.get('need__input')}`, `${data.get('form__have')}`,
    `${data.get('form__percent')}`, `${data.get('form__time')}`, `${data.get('form__output')}`));
});

document.querySelectorAll('.inputBox').forEach((element) => {
  element.addEventListener('input', () => {
    let principal = document.querySelector('.form__have').value;
    let interest = document.querySelector('.form__percent').value;
    let period = document.querySelector('.form__time').value;
    let required = document.querySelector('.form__need').value;

    if (!(principal && interest && period && required)) return;

    document.querySelector('.form__output').value = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1));
    document.querySelector('.form__output').value = Number(document.querySelector('.form__output').value).toFixed(2);
    
    if (document.querySelector('.form__output').value <= 0) {
      document.querySelector('.form__output').value = '--------------------';
    }
  })
})

document.querySelector('.make__cancel').addEventListener('click', () => {
  userForm.reset();
});

document.querySelector('.listBtn').addEventListener('click', () => {
  const form = document.querySelector('.goal__form');
  form.classList.add('hidden');

  if (array.length === 0) {
    document.querySelector('.list__goals-none').classList.remove('hidden');

  } else {
    document.querySelector('.list__goals-none').classList.add('hidden');
    document.querySelector('.list__of-goals').classList.remove('hidden');
    document.querySelector('.list__of-goals').innerHTML = '';

    array.forEach((elem) => {
      let item = document.createElement('div');
      item.classList.add('list__data');
      item.innerHTML = `
      <div class="list__head">
      <button class="list__button-delete">X</button>
      <p class="list__title">${elem.goal}</p>
      </div><p class="list__final-amount">Сумма: ${elem.required} руб</p>
      <hr>
      <p class="list__monthly">Пополнение: ${elem.replenishment} руб</p>`
      document.querySelector('.list__of-goals').append(item);

      item.querySelector('.list__button-delete').addEventListener('click', (e) => {
        e.preventDefault();
        const itemIndex = array.findIndex(item => item.id === elem.id);
        array.splice(itemIndex, 1);
        item.remove();

        if (array.length === 0) {
          document.querySelector('.list__goals-none').classList.remove('hidden');
        }
      })
    });
  }
})

document.querySelector('.createBtn').addEventListener('click', () => {
  const form = document.querySelector('.goal__form');
  form.classList.remove('hidden');
  document.querySelector('.list__of-goals').classList.add('hidden');
  document.querySelector('.list__goals-none').classList.add('hidden');
});

document.querySelector('.logoBtn').addEventListener('click', () => {
  location.reload();
})

let slider = document.querySelector('.form__dragger');
let inputBox = document.querySelector('.form__time');


slider.addEventListener('input', (e) => {
  inputBox.value = e.target.value
})

inputBox.addEventListener('input', (e) => {
  slider.value = e.target.value
})
