let money = 75000;
let income = 'фриланс';
let addExpenses = 'интернет, такси, коммуналка';
let deposit = true;
let mission = 950000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + ' месяцев');
console.log("Цель заработать " + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDey = money / 30;
console.log('Дневной бюджет равен:', budgetDey);