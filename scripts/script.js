class Range {
  container;
  trace 
  tracer

  value = 1;

  isDown = false;
  previousX = 0;

  constructor(range) {
    this.container = range;

    this.trace = this.container.querySelector('.range__trace');
    this.tracer =  this.container.querySelector('.range__tracer');
    this.parts = this.container.querySelector('.range__parts');
    this.passed = this.container.querySelector('.range__passed');

    const bound = this.trace.getBoundingClientRect()

    this.max = bound.right;
    this.min = bound.left;


    this.tracer.addEventListener('mousedown', (e) => {
      e.preventDefault()
      this.isDown = true
    })

    document.addEventListener('mouseup', (e) => {
      this.isDown = false
    })

    this.parts.querySelector(':first-child').style.color = '#4A86FF';

    document.addEventListener('mousemove', (e) =>  {
      if(!this.isDown) return;
      this.setTracer(e.pageX)
      this.previousX = e.pageX;
    })
  }


  setTracer(cursorX) {
    
    if(cursorX < this.min || cursorX > this.max) return
    const path = cursorX - this.min
    const bound = Math.floor(((path / this.trace.offsetWidth * 12)));
    
    if(bound + 1 !== this.value) {
      this.value = bound + 1
      this.onChange?.(this.value)

      this.parts.querySelectorAll(`p`).forEach((e, i) => {
        if (i > bound) {
          e.style.color = 'rgb(101, 101, 101)';
          this.count--
          return
        };
        this.count++
        e.style.color = '#4A86FF';
      });
    };

  
  
    this.passed.style.width = path + 'px'
    this.tracer.style.left = path + 'px'
  }

  reset() {
    this.parts.querySelectorAll(`p`).forEach(p => p.style.color = 'rgb(101, 101, 101)')
    this.passed.style.width = 0 + 'px'
    this.tracer.style.left = 0 + 'px'
    this.value = 1
  }

}

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
  elem.querySelector('.myChart').addEventListener('click', (e) => {
    e.stopPropagation();
  })
}

const range = new Range(document.querySelector('.range'))
let inputBox = document.querySelector('.form__time');

const userForm = document.querySelector('form');
const output = userForm.querySelector('output')

range.onChange = () => {
  calculateReplenishment()
}

userForm.addEventListener('submit', (event) => {
  event.preventDefault();


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

  array.push(createTargetFromForm(userForm));

  userForm.reset();

});

userForm.addEventListener('reset', () => {
  range.reset()
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
        changeitem.innerHTML = `<form action="" class="goal__form change__form">

        <label for="title__input">Цель</label>
        <input type="text" name="title__input" placeholder="Название" class="form__title form__title-change" required value="${elem.goal}">
  
        <label for="need__input">Требуемая сумма:</label>
        <input type="number" min="0" name="need__input" placeholder="Цель, руб." class="form__need form__need-change inputBox2" step="0.01" required value="${elem.required}">
  
  
        <div class="form__lotsOfInputs">
          <div>
            <label for="form__have">Стартовая сумма:</label>
            <input type="number" min="0" name="form__have" placeholder="Нач. взнос" class="form__have form__have-change inputBox2" step="0.01"
              required value="${elem.principal}">
          </div>
          <div>
            <label for="form__percent">Процентная ставка:</label>
            <input type="number" min="0" name="form__percent" placeholder="Процент, %" class="form__percent form__percent-change inputBox2" step="0.1"
              required value="${elem.interest}">
          </div>
          <div>
            <label for="form__time">Срок (в мес.):</label><br>
            <input type="number" name="form__time" min="1" max="12" placeholder="Срок, мес." class="form__time form__time-change inputBox2" required value="${elem.period}">
            <input type="range" min="1" max="12" class="form__dragger form__dragger-change inputBox2">
          </div>
        </div>
        <label for="form__output">Ежемесячное пополнение:</label>
        <input class="form__output form__output-change" min="0" placeholder="***" name="form__output" readonly value="${elem.replenishment}">
  
        <div class="form__make">
          <button class="button make__create make__change">Изменить</button>
          <button class="button make__discard" type="button">Отмена</button>
        </div>
  
      </form>`;

        document.querySelector('.new-form').append(changeitem);

        document.querySelector('.make__discard').addEventListener('click', () => {
          document.querySelector('.new-form').innerHTML = '';
        })

        document.querySelectorAll('.inputBox2').forEach((element) => {
          element.addEventListener('input', () => {
            let principal = document.querySelector('.form__have-change').value;
            let interest = document.querySelector('.form__percent-change').value;
            let period = document.querySelector('.form__time-change').value;
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
          })
        })

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




userForm.querySelectorAll('input:not([name=title__input])').forEach((element) => {
  element.addEventListener('input', () => {
    calculateReplenishment()


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


function calculateReplenishment () {
  const { replenishment }  = createTargetFromForm(userForm)
  output.value = isNaN(replenishment) ? '╮(︶▽︶)╭' 
  : replenishment < 0 ? 'Некорректные значения ( ͡° ͜ʖ ͡°)' : "₽ " +  replenishment;
}
 

function createTargetFromForm(form) {
  const data = new FormData(form)
  const required =  data.get('need__input');
  const interest =  data.get('form__percent');
  const title = data.get('title__input'); 
  const period = range.value;
  const principal = data.get('form__have');
  const result = (required && interest && period && principal) 
  
  ? (required - (principal * ((1 + interest / (100 * 12)) ** period))) * (interest / (100 * 12)) * (1 / ((1 + interest / (100 * 12)) ** period - 1))
  : NaN

  return new Target(
    title,
    required,
    principal, 
    interest, 
    period,
    isNaN(result) ? NaN : +result.toFixed(2),
  )
}








