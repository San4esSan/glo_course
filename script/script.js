'use strict';

let startBtn = document.getElementById('start');
let cancelBtn = document.getElementById('cancel');
let btnIncAdd = document.getElementsByTagName('button')[0];
let btnExpAdd = document.getElementsByTagName('button')[1];
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
let periodAmount = document.querySelector('.period-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
let main = document.querySelector('.main');
let result = document.querySelector('.result');
let checkBox = document.querySelector('#deposit-check');

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
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayhValue.value = Math.ceil(this.budgetDey);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ').toLowerCase();
    additionalIncomeValue.value = this.addIncome.join(',');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      btnExpAdd.style.display = 'none';
    }
  },

  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      btnIncAdd.style.display = 'none';
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

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; // накопления за месяц = доход за месяц + доп.доход - обязательные расходы
    this.budgetDey = Math.floor(this.budgetMonth / 30);     // доход за день = акопления за месяц / 30
    return this.budgetMonth, this.budgetDey;
  },

  getTargetMonth: function () {                                   // за сколько месяцев достигнем результата =
    return targetAmount.value / this.budgetMonth;                 // цель / накопления за месяц
  },

  getStatusIncome: function () {
    if (appData.budgetDey > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDey > 600 && this.budgetDey <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDey >= 0 && this.budgetDey <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },

  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.procentDeposit = +prompt('Какой годовой процент?', '10');
      } while (!isNumber(this.procentDeposit));
      do {
        this.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },

  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },

  reset: function () {
    let inputTextData = document.querySelectorAll('.data input[type = text]');
    let resultInputAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function (elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });

    resultInputAll.forEach(function (elem) {
      elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      btnIncAdd.style.display = 'block';
    };

    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      btnExpAdd.style.display = 'block';
    };

    this.budget = 0;
    this.budgetDey = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.procentDeposit = 0;
    this.moneyDeposit = 0;

    cancelBtn.style.display = 'none';
    startBtn.style.display = 'block';
    btnExpAdd.removeAttribute('disabled');
    btnIncAdd.removeAttribute('disabled');
    checkBox.checked = false;
  },
};

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
    startBtn.disabled = false;
  }
});

startBtn.addEventListener('click', function () {
  appData.start.bind(appData)();
  document.querySelectorAll('input[type=text]').forEach(function(item){
    item.disabled = true;
});
   startBtn.style.display = 'none';
  cancelBtn.style.display = 'block';
});

periodSelect.addEventListener('input', function () {
  periodAmount.innerHTML = periodSelect.value;
  return appData.showResult();
});

cancelBtn.addEventListener('click', function () {
  appData.reset.bind(appData)();
  appData.reset();
});

btnExpAdd.addEventListener('click', appData.addExpensesBlock);
btnIncAdd.addEventListener('click', appData.addIncomeBlock);