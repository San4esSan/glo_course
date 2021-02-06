'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let income = 'фриланс';
let mission = 950000;
let period = 12;
let money;

let start = function () {
  do {
   money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  return money;
};
start();


let appData = {
  income: {},
  addIncome: [],
  // expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 12,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ, вода');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?', false);
  },
  budget: money,
  budgetDey: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  expenses: [],
  getExpensesMonth: function () {
    let sum = 0;  
    for (let i = 0; i < 2; i++) {
      appData.expenses[i] = prompt('Введите обязательную статью расходов?');
      let tmp;
      do {
        tmp = +prompt('Во сколько это обойдется?');
      } while (!isNumber(tmp));
      sum += tmp;
    }
    console.log(appData.expenses);
    return sum;                                               // сумма обязательных расходов
  },

  getAccumulatedMonth: function () {                          // накопления за месяц =
    return appData.budget - appData.expensesMonth;            // доход - обязательные расходы
  }, 

  getTargetMonth: function () {                               // за сколько месяцев достигнем результата =
    return appData.mission / appData.budgetMonth;             // цель / накопления за месяц
  },

  getStatusIncome: function () {
    if (appData.budgetDey > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDey > 600 && appData.budgetDey <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDey >= 0 && appData.budgetDey <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },
};

console.log("Период равен " + period + ' месяцев');
console.log("Цель заработать " + mission + ' рублей');
console.log(appData.addExpenses.length);

appData.budgetDey = appData.getAccumulatedMonth() / 30;
appData.expensesMonth = appData.getExpensesMonth();
appData.budgetMonth = appData.getAccumulatedMonth();

console.log('Сумма обязательных расходов: ', appData.expensesMonth);

console.log('Накопления за месяц:', appData.budgetMonth);

console.log('Бюджет на день: ', Math.floor(appData.budgetDey));

console.log(appData.getStatusIncome());

if (appData.getAccumulatedMonth() <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' мес.');
}