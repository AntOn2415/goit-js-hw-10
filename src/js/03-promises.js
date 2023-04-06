// ________робочий варіант але деколи перестае робить
import Notiflix from 'notiflix';
// посилання
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);
// промисифікація функції
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
// делегування події
function onFormSubmit(e) {
  e.preventDefault();
  // отримуємо посилання на імпути
  // отримуємо значення імпутів
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  // кількість виклику функції
  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );

      });
    delay += step;
  }
  form.reset()
    }

// ________робочий варіант але тільки не на гітхабі

// import Notiflix from 'notiflix';
// // посилання
// const form = document.querySelector('.form');

// form.addEventListener('submit', onFormSubmit);

// // делегування події
// function onFormSubmit(e) {
//   e.preventDefault();
//   // отримуємо посилання на імпути
//   // отримуємо значення імпутів
//   let delay = Number(form.elements.delay.value);
//   const step = Number(form.elements.step.value);
//   const amount = Number(form.elements.amount.value);

// // промисифікація функції
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve({ position, delay });
//       } else {
//         // Reject
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

//   // кількість виклику функції
//   for (let position = 1; position <= amount; position++) {
//     createPromise(position, delay)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
        
//       });
//     delay += step;
//   }
//   form.reset();
//     }

//  ______________Робочий варіант, але я не розумію чого так не можна робити
// import Notiflix from 'notiflix';

// // // посилання
// const form = document.querySelector('.form');

// // промисификация функції
// function createPromise(position, delay, delayStep) {
//   const shouldResolve = Math.random() > 0.3;

//  delay = delay + (position - 1) * delayStep;

//   return new Promise((resolve, reject) => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve({ position, delay});
//       } else {
//         // Reject
//         reject({ position, delay });
//       }
//   });
// };

// // дилегування події
// form.addEventListener('submit', e => {
//   e.preventDefault();
// // отримуемо посилання на імпути
//   const delayInput = form.elements.delay;
//   const stepInput = form.elements.step;
//   const amountInput = form.elements.amount;
// // отримуемо значення імпутів
//   const delay = parseInt(delayInput.value);
//   const step = parseInt(stepInput.value);
//   const amount = parseInt(amountInput.value);
  
//     let position = 1;
//     let interval;
//     // кількість визову функції
//     interval = setInterval(() => {
//   createPromise(position, delay, step)
//   .then(({ position, delay }) => {
//   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// })
// .catch(({ position, delay}) => {
//   Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// });
// if  (++position > amount ) {
//   clearInterval(interval);
// form.reset();
// }
//     }, step);
// });