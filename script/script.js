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
  procentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDey: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
      while (isNumber(itemIncome)){
        itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
      }
      let cashIncome;
      do {
        cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
        appData.income[itemIncome] = cashIncome;
      } while (!isNumber(cashIncome));

    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ,   вода ,InteRnet,Tel свЕт').toLowerCase().replace(/(\s*,\s*)|(\s+)/g, ', ');

    while (isNumber(addExpenses)){
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ,   вода ,InteRnet,Tel свЕт').toLowerCase().replace(/(\s*,\s*)|(\s+)/g, ', ');
    }
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    for (let i = 0; i < appData.addExpenses.length; i++) {
      appData.addExpenses[i] = appData.addExpenses[i].slice(0, 1).toUpperCase() + appData.addExpenses[i].slice(1);
    }

    appData.deposit = confirm('Есть ли у вас депозит в банке?', false);

    while (Object.keys(appData.expenses).length < 2) {
      let key = prompt('Введите обязательную статью расходов?');
       
      while (isNumber(key)){
        key = prompt('Введите обязательную статью расходов?');
      }

      let tmp;
      do {
        tmp = +prompt('Во сколько это обойдется?');
        appData.expenses[key] = tmp;
      } while (!isNumber(tmp));
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];             // сумма обязательных расходов
    }
    return appData.expensesMonth;
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth; // накопления за месяц = доход - обязательные расходы
    appData.budgetDey = Math.floor(appData.budgetMonth / 30);     // доход за день = акопления за месяц / 30
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

  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.procentDeposit = +prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.procentDeposit));
      do {
        appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
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

appData.getInfoDeposit();

console.log(appData.addExpenses.join(', '));
