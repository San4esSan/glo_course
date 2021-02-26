'use strict';

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');
const btnIncAdd = document.getElementsByTagName('button')[0];
const btnExpAdd = document.getElementsByTagName('button')[1];
const addIncItem = document.querySelectorAll('.additional_income-item');
const budgetDayhValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addExpValue = document.getElementsByClassName('additional_expenses-value')[0];
const incPeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpenses = document.querySelector('.additional_expenses');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const addExpItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
const main = document.querySelector('.main');
const result = document.querySelector('.result');
const checkBox = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
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
  }

  check() {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
      startBtn.removeAttribute('disabled');
      startBtn.disabled = false;
      startBtn.style.backgroundColor = '#353a43';
    }
  }

  start() {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
      startBtn.disabled = false;
    }

    const allInput = document.querySelectorAll('.data input[type = text]');
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
    this.getInfoDeposit();
    this.getBudget();
    this.getStatusIncome();

    this.showResult();
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayhValue.value = Math.ceil(this.budgetDey);
    expensesMonthValue.value = this.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(',');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incPeriodValue.value = this.calcPeriod();
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      btnExpAdd.style.display = 'none';
    }
  }

  getExpenses() {
    const _this = this;
    expensesItems.forEach(function (item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      btnIncAdd.style.display = 'none';
    }
  }

  getIncome() {
    const _this = this;
    incomeItems.forEach(function (item) {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = addExpItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    const _this = this;
    addIncItem.forEach(function (item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDey = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDey > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDey > 600 && this.budgetDey <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDey >= 0 && this.budgetDey <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  reset() {
    const inputTextData = document.querySelectorAll('.data input[type = text]');
    const resultInputAll = document.querySelectorAll('.result input[type = text]');

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
      if (i > 0) {
        incomeItems[i].remove(incomeItems[i]);
        btnIncAdd.style.display = 'block';
      }
    }

    for (let i = 1; i < expensesItems.length; i++) {
      if (i > 0) {
        expensesItems[i].remove(expensesItems[i]);
        btnExpAdd.style.display = 'block';
      }
    }

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
    startBtn.style.backgroundColor = "#efefef";
    startBtn.disabled = true;
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';

  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('change', () => {
        if (!isNumber(depositPercent.value) || depositPercent.value > 100) {
          alert('Введите число от 0 до 100');
          depositPercent.value = '0';
        }else{
          startBtn.style.backgroundColor = "#353a43";
          startBtn.disabled = false;
        }
      })
      startBtn.style.backgroundColor = "#efefef";
      startBtn.disabled = true;
      depositPercent.value = '';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = '';
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (checkBox.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
      depositBank.value = '';
      depositAmount.value = '';
    }
  }

  eventListeners() {
    startBtn.style.backgroundColor = "#efefef";
    startBtn.disabled = true;

    startBtn.addEventListener('click', this.start.bind(this));
    btnExpAdd.addEventListener('click', this.addExpensesBlock);
    btnIncAdd.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('keyup', this.check);
    cancelBtn.addEventListener('click', this.reset.bind(this));

    periodSelect.addEventListener('input', function () {
      periodAmount.innerHTML = periodSelect.value;
      return appData.showResult();
    });

    checkBox.addEventListener('change', this.depositHandler.bind(this));

    const addExp = [];
    for (let i = 0; appData.addExpenses.length; i++) {
      let element = appData.addExpenses[i].trim();
      element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
      addExp.push(element);
    }
  }
}

const appData = new AppData();
console.log(appData);

appData.eventListeners();