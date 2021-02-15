'use strict';

let start = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button');
let incomePlus = btnPlus[0];
let expensesPlas = btnPlus[1];
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let checkDeposit = document.querySelector('#deposit-check');
let budgetDayhValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpenses = document.querySelector('.additional_expenses');
let periodSelect = document.querySelector('.period-select');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  budgetDey: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  procentDeposit: 0,
  moneyDeposit: 0,

  start: function () {

    appData.budget = +salaryAmount.value;
    console.log('salaryAmount.value: ', salaryAmount.value);

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayhValue.value = Math.ceil(appData.budgetDey);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(',');
    additionalIncomeValue.value = appData.addIncome.join(',');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlas);
    expensesItems = document.querySelectorAll('.expenses-items');
    console.log(expensesItems.parentNode);

    if (expensesItems.length === 3) {
      expensesPlas.style.display = 'none';
    }
  },

  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    console.log(incomeItems.parentNode);

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];             // сумма обязательных расходов
    }
    return appData.expensesMonth;
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth; // накопления за месяц = доход за месяц + доп.доход - обязательные расходы
    appData.budgetDey = Math.floor(appData.budgetMonth / 30);     // доход за день = акопления за месяц / 30
    return appData.budgetMonth, appData.budgetDey;
  },

  getTargetMonth: function () {                                   // за сколько месяцев достигнем результата =
    return targetAmount.value / appData.budgetMonth;                 // цель / накопления за месяц
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

  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};


start.disabled = true;
start.style.backgroundColor = "#efefef";

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '') {
    start.disabled = false;
    start.style.backgroundColor = '#353a43';
    start.addEventListener('click', appData.start);
  }
});

periodSelect.addEventListener('input', function () {
  let period = document.querySelector('.period-amount').innerHTML = periodSelect.value;
  return appData.showResult();
});

expensesPlas.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);