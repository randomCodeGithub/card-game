import { Card } from './card.js';

const POWERS = [300, 310, 340, 340, 350];
const ELEMENTS = ["fire", "water", "wind", "dark", "light", "earth"];

class Deck {
  constructor(cards = this.resetDeck()) {
    this.cards = cards;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    this.cards.push(card);
  }

  drawCard() {
    return this.cards.pop();
  }

  resetDeck() {
    return ELEMENTS.flatMap((elements) => {
      return POWERS.map((powers) => {
        return new Card(elements + ' ' + powers, elements, powers);
      });
    });
  }
}

export { Deck };