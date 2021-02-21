'use strict';

let startBtn = document.getElementById('start');
let cancelBtn = document.getElementById('cancel');
let btnIncAdd = document.getElementsByTagName('button')[0];
let btnExpAdd = document.getElementsByTagName('button')[1];
let addIncItem = document.querySelectorAll('.additional_income-item');
let checkDeposit = document.querySelector('#deposit-check');
let budgetDayhValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let addExpValue = document.getElementsByClassName('additional_expenses-value')[0];
let incPeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpenses = document.querySelector('.additional_expenses');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let addExpItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
let main = document.querySelector('.main');
let result = document.querySelector('.result');
let checkBox = document.querySelector('#deposit-check');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
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
};

AppData.prototype.check = function () {
  if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
    startBtn.removeAttribute('disabled');
  }
};

AppData.prototype.start = function () {
  if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
    startBtn.disabled = false;
  }

  let allInput = document.querySelectorAll('.data input[type = text]');
  allInput.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });

  btnExpAdd.setAttribute('disabled', 'true');
  btnIncAdd.setAttribute('disabled', 'true');
  startBtn.style.display = 'none';
  cancelBtn.style.display = 'block';

  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.getInfoDeposit();
  this.getStatusIncome();

  this.showResult();
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayhValue.value = Math.ceil(this.budgetDey);
  expensesMonthValue.value = this.expensesMonth;
  addExpValue.value = this.addExpenses.join(', ');
  addIncomeValue.value = this.addIncome.join(',');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incPeriodValue.value = this.calcPeriod();

};


AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    btnExpAdd.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    btnIncAdd.style.display = 'none';
  }
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = addExpItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  addIncItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDey = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
  if (this.budgetDey > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDey > 600 && this.budgetDey <= 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDey >= 0 && this.budgetDey <= 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.procentDeposit = +prompt('Какой годовой процент?', '10');
    } while (!isNumber(this.procentDeposit));
    do {
      this.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
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
};

AppData.prototype.eventListeners = function () {
  startBtn.addEventListener('click', appData.start.bind(appData));
  btnExpAdd.addEventListener('click', appData.addExpensesBlock);
  btnIncAdd.addEventListener('click', appData.addIncomeBlock);
  salaryAmount.addEventListener('keyup', appData.check);
  cancelBtn.addEventListener('click', appData.reset.bind(appData));
  
  periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
    return appData.showResult();
  });
  
  let addExp = [];
  for (let i = 0; appData.addExpenses.length; i++) {
    let element = appData.addExpenses[i].trim();
    element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    addExp.push(element);
  };
}


const appData = new AppData();
console.log(appData);

appData.eventListeners();

