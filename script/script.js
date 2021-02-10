'use strict';

const startBtn = document.getElementById('start');
console.log(startBtn);

const plusBtnIncome = document.getElementsByTagName('button')[0];
console.log('plusBtnIncome: ', plusBtnIncome);

const plusBtnExpenses = document.getElementsByTagName('button')[1];
console.log('plusBtnExpenses: ', plusBtnExpenses);

const checkDeposit = document.querySelector('#deposit-check');
console.log('checkDeposit: ', checkDeposit);

const incomeItem = document.querySelectorAll('.additional_income-item');
console.log('incomeItem: ', incomeItem);

const expensesMonth = document.getElementsByClassName('result-total')[1];
console.log('expensesMonth: ', expensesMonth);
const additionalIncome = document.getElementsByClassName('result-total')[2];
console.log('additionalIncome: ', additionalIncome);
const additionalExpenses = document.getElementsByClassName('result-total')[3];
console.log('additionalExpenses: ', additionalExpenses);
const incomePeriod = document.getElementsByClassName('result-total')[4];
console.log('incomePeriod: ', incomePeriod);
const targetMonth = document.getElementsByClassName('result-total')[5];
console.log('targetMonth: ', targetMonth);

const budgetMonth  = document.querySelector('.budget_month-value');
console.log('budgetMonth: ', budgetMonth);
const salaryAmount  = document.querySelector('.salary-amount');
console.log('salaryAmount: ', salaryAmount);
const incomeTitle  = document.querySelector('[placeholder="Наименование"]');
console.log('incomeTitle: ', incomeTitle);
const incomeAmount  = document.querySelector('.income-amount');
console.log('incomeAmount: ', incomeAmount);
const expensesTitle  = document.querySelector('div.expenses-items input[placeholder="Наименование"]');
console.log('expensesTitle: ', expensesTitle);
const expensesAmount  = document.querySelector('.expenses-amount');
console.log('expensesAmount: ', expensesAmount);
const additionalExpensesItem  = document.querySelector('.additional_expenses-item');
console.log('additionalExpensesItem: ', additionalExpensesItem);
const targetAmount  = document.querySelector('.target-amount');
console.log('targetAmount: ', targetAmount);
const periodSelect  = document.querySelector('.period-select');
console.log('periodSelect: ', periodSelect);