import { Draw } from './draw.js';
import { Deck } from './Deck.js';
import { Player } from './Player.js';

class Game {
  constructor() {
    this.deck = null;
    this.playerDeck = null;
    this.enemyDeck = null;
    this.inRound = false;
    this.isStop = true;
    this.draw = new Draw();
    this.listeners();
  }

  listeners() {

    document.addEventListener("click", () => {
      if (this.isStop) {
        this.start();
        return;
      }
    
      if (this.inRound) {
        this.draw.cleanBeforeRound();
        this.draw.updateDeckCount(this.playerDeck, this.enemyDeck);
        this.inRound = false;
      } else {
        this.flipCards();
      }
    });
    
  }

  start() {
    this.deck = new Deck();
    this.deck.shuffle();
    const deck_midpoint = Math.ceil(this.deck.cards.length / 2);
    this.playerDeck = new Player(this.deck, 0, deck_midpoint);
    this.enemyDeck = new Player(this.deck, deck_midpoint, this.deck.cards.length);

    this.inRound = false;
    this.isStop  = false

    this.draw.cleanBeforeRound();
    this.draw.updateDeckCount(this.playerDeck, this.enemyDeck);
    // this.cleanBeforeRound();

    console.log('player', this.playerDeck.hand)
    console.log('enemy', this.enemyDeck.hand)
    console.log("deck", this.deck.cards)
  }

  flipCards() {
    this.inRound = true;
  
    const playerCard = this.playerDeck.pop();
    const enemyCard = this.enemyDeck.pop();
  
    this.draw.selectedCards(playerCard, enemyCard);
  
    this.draw.updateDeckCount(this.playerDeck, this.enemyDeck);
  
  
    if (this.isRoundWinner(playerCard, enemyCard)) {
      this.draw.updateText("Win");
      this.playerDeck.takeCard(playerCard);
      this.playerDeck.takeCard(enemyCard);
    } else if (this.isRoundWinner(enemyCard, playerCard)) {
      this.draw.updateText("Lose");
      this.enemyDeck.takeCard(playerCard);
      this.enemyDeck.takeCard(enemyCard);
    } else {
      this.draw.updateText("Draw");
      this.playerDeck.takeCard(playerCard);
      this.enemyDeck.takeCard(enemyCard);
    }
  
    if (this.isOver(this.playerDeck)) {
      this.draw.updateText("You Lose!");
      this.isStop = true;
    } else if (this.isOver(this.enemyDeck)) {
      this.draw.updateText("You Win!");
      this.isStop = true;
    }

  }

  isRoundWinner(cardOne, cardTwo) {
    return cardOne.power > cardTwo.power;
  }

  isOver(deck) {
    return deck.hand.length === 0;
  }  

}

new Game().start();