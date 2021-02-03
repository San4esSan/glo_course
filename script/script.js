'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

let money;
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ, вода');
let deposit = confirm('Есть ли у вас депозит в банке?', false);

let mission = 950000;
let period = 12;


// let expenses1 = prompt('Введите обязательную статью расходов?', 'интернет');
// let amount1 = +prompt('Во сколько это обойдется?', 10000);
// let expenses2 = prompt('Введите обязательную статью расходов?', 'бензин');
// let amount2 = +prompt('Во сколько это обойдется?', 15000);

console.log(addExpenses.length);
console.log("Период равен " + period + ' месяцев');
console.log("Цель заработать " + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let start = function () {

  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};
start();

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?');

    let tmp;
    do {
      tmp = +prompt('Во сколько это обойдется?');
    } while (!isNumber(tmp));
    sum += tmp;
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Сумма обязательных расходов: ', expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц:', accumulatedMonth);

let budgetDey = accumulatedMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDey));

let getTargetMonth = function () {
  return mission / accumulatedMonth;
};

if (accumulatedMonth <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' мес.');
}

let getStatusIncome = function () {
  if (budgetDey > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDey > 600 && budgetDey <= 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDey >= 0 && budgetDey <= 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};
console.log(getStatusIncome());