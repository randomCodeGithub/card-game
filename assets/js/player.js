class Player {
  constructor(deck, index = 0, length) {
    this.hand = this.getCardsFromDeck(deck, index, length);
    this.currentCard = null;
  }

  // drawCard(deck) {
  //   const card = deck.drawCard();
  //   if (card) {
  //     this.hand.push(card);
  //   }
  // }

  getCardsFromDeck(deck, index = 0, length) {
    const cards = deck.cards.slice(index, length);
    this.hand = cards;
    return this.hand;
  }

  pop() {
    this.currentCard = this.hand.shift();
    return this.currentCard;
  }

  takeCard(card) {
    this.hand.push(card);
  }

  discardCard() {
    this.currentCard = null;
  }

  attack(enemy) {
    var max = Math.floor(this.currentCard.init_power / 4);
    var value = Math.floor(Math.random() * (Math.floor(max / 10))) * 10;
    var damage = Math.max(0, value - enemy.currentCard.defend);
    enemy.currentCard.defend = Math.max(0, enemy.currentCard.defend - value);
    enemy.currentCard.power -= damage;
    this.currentCard.abilities.attack = false;
    console.log(value)
  }

  defend() {
    var max = Math.floor(this.currentCard.init_power / 4);
    var value = Math.floor(Math.random() * (Math.floor(max / 10))) * 10;
    this.currentCard.defend += value;
    this.currentCard.abilities.defend = false;

  }

  powerUp() {
    var max = Math.floor(this.currentCard.init_power / 2);
    var value = Math.floor(Math.random() * (Math.floor(max / 10))) * 10;
    this.currentCard.power += value;
    this.currentCard.abilities.power_up = false;
  }

}

export { Player };