class Card {
  constructor(name, element, power) {
    this.name = name;
    this.element = element;
    this.power = power;
    this.abilities = {
      defend: true,
      attack: true,
      power_up: true,
    };
  }
}

export { Card };
