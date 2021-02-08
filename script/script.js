'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function () {
  do {
    money = +prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  return money;
};
start();


let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 12,
  budget: money,
  budgetDey: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ, вода');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?', false);

    while (Object.keys(appData.expenses).length < 3) {
      let key;
      do {
        key = prompt('Введите обязательную статью расходов?');
      } while (!key);
      let tmp;
      do {
        tmp = +prompt('Во сколько это обойдется?');
        appData.expenses[key] = tmp;
      } while (!isNumber(tmp));
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];            // сумма обязательных расходов
    }
    return appData.expensesMonth;
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth; // накопления за месяц = доход - обязательные расходы
    appData.budgetDey = Math.floor(appData.budgetMonth / 30);                 // доход за день = акопления за месяц / 30
    return appData.budgetMonth, appData.budgetDey;
  },

  getTargetMonth: function () {                                   // за сколько месяцев достигнем результата =
    return appData.mission / appData.budgetMonth;                 // цель / накопления за месяц
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

appData.asking();

console.log('Сумма обязательных расходов: ', appData.getExpensesMonth());

if (appData.getBudget() <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' мес.');
}

console.log(appData.getStatusIncome());

console.log('');
console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
  console.log(key, appData[key]);
}