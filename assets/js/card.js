class Card {
  constructor(name, element, power, defend) {
    this.name = name;
    this.element = element;
    this.init_power = power;
    this.power = power;
    this.defend = 0;
    this.defend = defend;
    this.abilities = {
      defend: true,
      attack: true,
      power_up: true,
    };
  }
}

export { Card };
