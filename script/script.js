'use strict';

const adv = document.querySelector('.adv');  
adv.remove();

const collectionBook = document.querySelectorAll('.book');
console.log('collectionBook: ', collectionBook);
const collectionUl = document.querySelectorAll('ul');
console.log('collectionUl: ', collectionUl);
const collectionLi = document.querySelectorAll('li');
const collectionH2 = document.querySelectorAll('h2');
console.log('collectionH2: ', collectionH2);
const collectionA = document.querySelectorAll('a');
console.log('collectionA: ', collectionA);

collectionBook[1].after(collectionBook[0]);
collectionBook[0].after(collectionBook[4]);
collectionBook[4].after(collectionBook[3]);
collectionBook[5].after(collectionBook[2]);

collectionLi[3].after(collectionLi[6]);
collectionLi[6].after(collectionLi[8]);
collectionLi[9].after(collectionLi[2]);

collectionLi[47].after(collectionLi[55]);
collectionLi[55].after(collectionLi[49]);
collectionLi[50].after(collectionLi[48]);
collectionLi[53].after(collectionLi[51]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

collectionA[4].textContent = 'Книга 3. this и Прототипы Объектов';

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
console.log('newElem: ', newElem);

collectionLi[25].append(newElem);

console.log('collectionLi: ', collectionLi);



