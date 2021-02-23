'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.NewDomElement = function () {

  const keys = this;
  for (let key in keys) {

    if (key === 'selector') {
      let newBlock;
      if (this[key][0] === '.') {
        newBlock = document.createElement('div');
        document.body.appendChild(newBlock);
        newBlock.classList.add(this[key].slice(1));
        newBlock.textContent = 'Вот это взрыв мозга у меня сейчас происходит!';
      } else if (this[key][0] === '#') {
        newBlock = document.createElement('p');
        document.body.appendChild(newBlock);
        newBlock.id = (this[key].slice(1));
        newBlock.textContent = 'Продолжаю учиться!';
      }

      let newStyle = Object.entries(this);
      newStyle.forEach(([key, value]) => {

        let syleNew = `
          height: ${newStyle[1][1]};
          width: ${newStyle[2][1]};
          background-color: ${newStyle[3][1]};
          font-size: ${newStyle[4][1]};
        `;

        console.log(syleNew);
        newBlock.style.cssText = syleNew;
      });
    }
  }
};


let newB = new DomElement('.block', '200px', '400px', 'red', '22px');
console.log('newB: ', newB);
newB.NewDomElement();

let newB2 = new DomElement('#best', '200px', '600px', 'blue', '22px');
console.log('newB2: ', newB2);
newB2.NewDomElement();