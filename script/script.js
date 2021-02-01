'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

let mission = 950000;
let period = 12;

let budgetMonth = money - amount1 - amount1;
let budgetDey = budgetMonth / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + ' месяцев');
console.log("Цель заработать " + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' мес.');
console.log('Бюджет на день: ', Math.floor(budgetDey));

if (budgetDey > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDey > 600 && budgetDey <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDey <= 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDey < 0) {
  console.log('Что то пошло не так');
}