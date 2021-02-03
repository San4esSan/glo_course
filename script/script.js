'use strict';

let money = +prompt('Ваш месячный доход?', 70000);
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ, вода');
let deposit = confirm('Есть ли у вас депозит в банке?', false);

let expenses1 = prompt('Введите обязательную статью расходов?', 'интернет');
let amount1 = +prompt('Во сколько это обойдется?', 10000);
let expenses2 = prompt('Введите обязательную статью расходов?', 'бензин');
let amount2 = +prompt('Во сколько это обойдется?', 15000);

let mission = 950000;
let period = 12;

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);
console.log("Период равен " + period + ' месяцев');
console.log("Цель заработать " + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let getExpensesMonth = function () {
  return amount1 + amount2;
};
console.log('Сумма обязательных расходов: ', getExpensesMonth());

let getAccumulatedMonth = function () {
  return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц:', accumulatedMonth);

let budgetDey = accumulatedMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDey));

let getTargetMonth = function () {
  return mission / accumulatedMonth;
};

if (accumulatedMonth <= 0) {
  console.log('При таком бюджете цель не достижима');
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