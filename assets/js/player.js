class Player {
  constructor(deck, index = 0, length) {
    this.hand = this.getCardsFromDeck(deck, index, length);
    this.currentCard = null;
  }

  drawCard(deck) {
    const card = deck.drawCard();
    if (card) {
      this.hand.push(card);
    }
  }

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

  attack() {
    
  }

  defend() {
    
  }

  powerUp(amount = 10) {
    
  }

}

export { Player };