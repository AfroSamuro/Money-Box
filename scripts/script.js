let array = [];

class Target {
  constructor(goal, required, principal, interest, period, replenishment) {
    this.id = new Date().getTime();
    this.goal = goal;
    this.required = required;
    this.principal = principal;
    this.interest = interest;
    this.period = period;
    this.replenishment = replenishment;
  }
}

function appendChart(canvas, start, refills, bankPayment) {
  const data = {
    labels: [
      'Начальный взнос',
      'Пополнения',
      'Процентные начисления',
    ],

    datasets: [{
      label: 'My First Dataset',
      data: [start, refills, bankPayment],
      backgroundColor: [
        'rgb(76, 70, 255)',
        'rgb(41, 255, 242)',
        'rgb(107, 225, 71)'
      ],
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      cutout: '85%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 16,
            color: 'white',
            padding: 20,
          },
        },
      }
    }
  };

  new Chart(
    canvas,
    config
  );
}

function donutStopPropagation(elem) {
  elem.querySelector('.myChart')?.addEventListener('click', (e) => {
    e.stopPropagation();
  })
}


let slider = document.querySelector('.form__dragger');
let inputBox = document.querySelector('.form__time');

slider.addEventListener('input', (e) => {
  inputBox.value = e.target.value;
})

inputBox.addEventListener('input', (e) => {
  slider.value = e.target.value;
})


const userForm = document.querySelector('form');

document.querySelector('.goal').addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(event.target);

  let blackscreen = document.createElement('div');
  let loadDiv = document.createElement('div');
  blackscreen.classList.add('load');
  loadDiv.classList.add('loadDiv');
  loadDiv.textContent = 'Цель добавлена!';
  document.querySelector('main').append(blackscreen);
  document.querySelector('.load').append(loadDiv);

  const donut = document.createElement('div');
  donut.classList.add('myChart');



  setTimeout(() => {
    document.querySelector('.load').remove()
  }, 1000)

  userForm.reset();
  document.querySelector('.chart-wrapper').innerHTML = '';

  array.push(new Target(`${data.get('title__input')}`, `${data.get('need__input')}`, `${data.get('form__have')}`,
    `${data.get('form__percent')}`, `${data.get('form__time')}`, `${data.get('form__output')}`));

});



document.querySelector('.make__cancel').addEventListener('click', () => {
  userForm.reset();
  document.querySelector('.chart-wrapper').innerHTML = '';
});

document.querySelector('.listBtn').addEventListener('click', function renderlist() {


  document.querySelector('.listBtn').style.color = "#03989e";
  document.querySelector('.createBtn').style.color = "#8b8b8b";
  document.querySelector('.list-icon').src = "./images/list.svg";
  document.querySelector('.create-icon').src = "./images/graycreate.svg";
  document.querySelector('.listBtn').style.backgroundColor = "rgb(255, 255, 255)";
  document.querySelector('.createBtn').style.backgroundColor = "rgb(244, 242, 243)";

  const form = document.querySelector('.goal__form');
  form.classList.add('hidden');

  if (array.length === 0) {
    document.querySelector('.list__goals-none').classList.remove('hidden');

  } else {
    document.querySelector('.list__of-goals').classList.remove('hidden');
    document.querySelector('.list__of-goals').innerHTML = '';

    array.forEach((elem) => {
      let item = document.createElement('div');
      item.classList.add('list__data');
      let html =
        `
      <div class="list__head">
      <button class="list__button-delete">X</button>
      <p class="list__title">${elem.goal}</p>
      </div><p class="list__final-amount">Сумма: ${elem.required} руб</p>
      
      <p class="list__monthly">Пополнение: ${elem.replenishment} руб</p>
      <div class="myChart">
        <canvas></canvas>
      </div>
      `
      item.innerHTML = html;

      donutStopPropagation(item);

      appendChart(item.querySelector('canvas'),
        elem.principal,
        elem.replenishment * elem.period,
        elem.required - elem.principal - elem.replenishment * elem.period)

      document.querySelector('.list__of-goals').append(item);

      item.addEventListener('click', (e) => {

        let grayarea = document.createElement('div');
        grayarea.classList.add('gray');
        document.querySelector('.new-form').append(grayarea);
        let changeitem = document.createElement('div');
        changeitem = document.createElement('div');
        changeitem.classList.add('newForm');
        changeitem.innerHTML = `
      </form>
      <form action="" class="goal goal__form change__form">
      <section class="goal__data">
        <label class="goal__label">
          <p class="goal__description">Цель</p>
          <div class="goal__input-container">
            <span class="goal__placeholder goal__placeholder_name">✓</span>
            <input class="goal__input form__title form__title-change" type="text" placeholder="Имя" name="title__input" required autocomplete="off" value="${elem.goal}">
          </div>
        </label>
        
        <label class="goal__label">
          <p class="goal__description">Требуемая сумма</p>
          <div class="goal__input-container">
            <span class="goal__placeholder">₽</span>
            <input class="goal__input form__need inputBox2 form__need-change" type="number" placeholder="1,200,000" name="need__input" required value="${elem.required}">
          </div>
        </label>
       

        <label class="goal__label">
          <p class="goal__description">Стартовая сумма</p>
          <div class="goal__input-container">
            <span class="goal__placeholder">₽</span>
            <input class="goal__input form__have inputBox2 form__have-change" type="number" placeholder="400,000" name="form__have" required value="${elem.principal}">
          </div>
         
        </label>
      

        <label class="goal__label">
          <p class="goal__description">Процентная ставка</p>
          <div class="goal__input-container">
            <span class="goal__placeholder">%</span>
            <input class="goal__input form__percent inputBox2 form__percent-change" type="number" placeholder="10.5" name="form__percent" required value="${elem.interest}">
          </div>
        </label>
        

        <label class="goal__label">
          <div class="goal__description-container">
            <p class="goal__description">Срок</p>
            <p class="goal__description">Мес.</p>
          </div>
          <!-- <input type="range" min="1" max="12" class="dragger"> -->
          <div class="goal__range range">
           
            <!-- <div class="range__trace">
              <div class="range__tracer"></div>
              <div class="range__passed"></div>
            </div> -->
            <!-- <input type="range" min="1" max="12" class="dragger"> -->

            <input type="number" name="form__time" min="1" max="12" placeholder="Срок, мес." class="form__time form__time-change inputBox2"
              required hidden value="${elem.period}">
              <input type="range" min="1" max="12" class="form__dragger inputBox2 form__dragger-change" list="tickmarks" value="${elem.period}">
              <datalist id="tickmarks">
  
                <option value="1">
                <option value="2">
                <option value="3">
                <option value="4">
                <option value="5">
                <option value="6">
                <option value="7">
                <option value="8">
                <option value="9">
                <option value="10">
                <option value="11">
                <option value="12">
              </datalist>
              <div class="range__parts">
                <p class="number">1</p>
                <p class="number">2</p>
                <p class="number">3</p>
                <p class="number">4</p>
                <p class="number">5</p>
                <p class="number">6</p>
                <p class="number">7</p>
                <p class="number">8</p>
                <p class="number">9</p>
                <p class="number">10</p>
                <p class="number">11</p>
                <p class="number">12</p>
              </div>
          </div>
         
        </label>

        <div class="goal__buttons">
          <button  class="goal__button goal__button_submit make__change">Изменить</button>
          <button  class="goal__button goal__button_reset make__discard" type="reset">Отмена</button>
        </div>

       

      </section>

      <section class="goal__payment payment">
        <h1 class="payment__title">Месячный платёж</h1>
        <!-- <label for="output">Ежемесячное пополнение:</label> -->
        <div class="payment__body">
          <div class="output__container">
          <input class="output form__output-change" name="form__output" readonly  value="${elem.replenishment}">
          </div>
          <div class="chart-wrapper-change">
            
          </div>
        </div>

      </section>


    </form>
      `;

        document.querySelector('.new-form').append(changeitem);

        document.querySelector('.make__discard').addEventListener('click', () => {
          document.querySelector('.new-form').innerHTML = '';
        })

        document.querySelectorAll('.inputBox2').forEach((element) => {
          element.addEventListener('input', () => {
            let principal = document.querySelector('.form__have-change').value;
            let interest = document.querySelector('.form__percent-change').value;
            let period = document.querySelector('.form__dragger-change').value;
            let required = document.querySelector('.form__need-change').value;

            if (!(principal && interest && period && required)) return;

            document.querySelector('.form__output-change').value = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1));
            document.querySelector('.form__output-change').value = Number(document.querySelector('.form__output-change').value).toFixed(2);
            if (+interest === 0) {
              document.querySelector('.form__output-change').value = (required - principal) / period;
              document.querySelector('.form__output-change').value = Number(document.querySelector('.form__output-change').value).toFixed(2);
            };
            if (document.querySelector('.form__output-change').value <= 0) {
              document.querySelector('.form__output-change').value = '--------------------';
            }
            document.querySelector('.chart-wrapper-change').innerHTML = '';
            document.querySelector('.chart-wrapper-change').innerHTML = `<div class="myChart formChart"><canvas></canvas></div>`;
            appendChart(document.querySelector('.chart-wrapper-change canvas'),
              principal,
              document.querySelector('.form__output-change').value * period,
              required - principal - document.querySelector('.form__output-change').value * period)
          })
        })

        let slider = document.querySelector('.form__dragger-change');
        let inputBox = document.querySelector('.form__time-change');

        slider.addEventListener('input', (e) => {
          inputBox.value = e.target.value;
        })

        inputBox.addEventListener('input', (e) => {
          slider.value = e.target.value;
        })
        let principal = document.querySelector('.form__have-change').value;
        let interest = document.querySelector('.form__percent-change').value;
        let period = document.querySelector('.form__dragger-change').value;
        let required = document.querySelector('.form__need-change').value;
        document.querySelector('.chart-wrapper-change').innerHTML = '';
        document.querySelector('.chart-wrapper-change').innerHTML = `<div class="myChart formChart"><canvas></canvas></div>`;
        appendChart(document.querySelector('.chart-wrapper-change canvas'),
          principal,
          document.querySelector('.form__output-change').value * period,
          required - principal - document.querySelector('.form__output-change').value * period)

        document.querySelector('.change__form').addEventListener('submit', (event) => {
          event.preventDefault();

          let blackscreen = document.createElement('div');
          let loadDiv = document.createElement('div');
          blackscreen.classList.add('load');
          loadDiv.classList.add('loadDiv');
          loadDiv.textContent = 'Цель изменена!';
          document.querySelector('main').append(blackscreen);
          document.querySelector('.load').append(loadDiv);


          setTimeout(() => {
            document.querySelector('.load').remove()
          }, 1000)

          const obj = array[array.findIndex(item => item.id === elem.id)]
          obj.goal = document.querySelector('.form__title-change').value;
          obj.required = document.querySelector('.form__need-change').value;
          obj.principal = document.querySelector('.form__have-change').value;
          obj.interest = document.querySelector('.form__percent-change').value;
          obj.period = document.querySelector('.form__time-change').value;
          obj.replenishment = document.querySelector('.form__output-change').value;

          document.querySelector('.new-form').innerHTML = '';
          html = '';
          let newHtml =
            `
      <div class="list__head">
      <button class="list__button-delete">X</button>
      <p class="list__title">${obj.goal}</p>
      </div><p class="list__final-amount">Сумма: ${obj.required} руб</p>
      
      <p class="list__monthly">Пополнение: ${obj.replenishment} руб</p>
      <div class="myChart">
        <canvas></canvas>
      </div>
      `
          item.innerHTML = newHtml;

          donutStopPropagation(item);

          appendChart(item.querySelector('canvas'),
            obj.principal,
            obj.replenishment * obj.period,
            obj.required - obj.principal - obj.replenishment * obj.period)

          item.querySelector('.list__button-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const itemIndex = array.findIndex(item => item.id === elem.id);
            array.splice(itemIndex, 1);
            item.remove();

            if (array.length === 0) {
              document.querySelector('.list__goals-none').classList.remove('hidden');
            }
          })

        });

      })

      item.querySelector('.list__button-delete').addEventListener('click', (e) => {
        e.stopPropagation();
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
  donutStopPropagation(document);
})

document.querySelectorAll('.inputBox').forEach((element) => {
  element.addEventListener('input', () => {
    let principal = document.querySelector('.form__have').value;
    let interest = document.querySelector('.form__percent').value;
    let period = document.querySelector('.form__time').value;
    let required = document.querySelector('.form__need').value;
    if (!(principal && interest && period && required)) return;

    document.querySelector('.output').value = (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1));
    document.querySelector('.output').value = Number(document.querySelector('.output').value).toFixed(2);
    if (+interest === 0) {
      document.querySelector('.output').value = (required - principal) / period;
      document.querySelector('.output').value = Number(document.querySelector('.output').value).toFixed(2);
    }
    if (document.querySelector('.output').value <= 0) {
      document.querySelector('.output').value = '--------------------';
    }
    document.querySelector('.chart-wrapper').innerHTML = '';
    document.querySelector('.chart-wrapper').innerHTML = `<div class="myChart formChart"><canvas></canvas></div>`;
    appendChart(document.querySelector('canvas'),
      principal,
      document.querySelector('.output').value * period,
      required - principal - document.querySelector('.output').value * period)
  })
})

document.querySelector('.createBtn').addEventListener('click', () => {
  const form = document.querySelector('.goal__form');
  form.classList.remove('hidden');
  document.querySelector('.list__of-goals').classList.add('hidden');
  document.querySelector('.list__goals-none').classList.add('hidden');

  document.querySelector('.createBtn').style.color = "#03989e";
  document.querySelector('.listBtn').style.color = "#8b8b8b";
  document.querySelector('.list-icon').src = "./images/graylist.svg";
  document.querySelector('.create-icon').src = "./images/create.svg";
  document.querySelector('.createBtn').style.backgroundColor = "rgb(255, 255, 255)";
  document.querySelector('.listBtn').style.backgroundColor = "rgb(244, 242, 243)";
});

document.querySelector('.logoBtn').addEventListener('click', () => {
  location.reload();
})



document.querySelectorAll('img').forEach((element) => {
  element.ondragstart = function () {
    return false;
  };
})
