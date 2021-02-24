'use strict';

class First {
  constructor() {

  }
  hello() {
    console.log("Привет я метод родителя!");
  }
}

class Second {
  constructor() {

  }
  hello() {
    console.log("А я наследуемый метод!");
  }
}