import { Draw } from './draw.js';
import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { AI } from './ai.js';

class Game {
  constructor() {
    this.deck = null;
    this.playerDeck = null;
    this.isPlayerTurn = false;
    this.isPlayerStart = false;
    this.enemyDeck = null;
    this.isTurnEnded = true;
    this.inRound = false;
    this.isRoudEnded = true;
    this.isStop = true;
    this.draw = new Draw();
    this.AI = null;
    this.listeners();
  }

  listeners() {

    document.getElementById("new-game").addEventListener("click", () => {
      // this.isStop = true;
      if (this.isStop) {
        this.start();
        return;
      }

      console.log(this.inRound)
    
      if (this.inRound) {
        this.draw.cleanBeforeRound();
        this.draw.updateDeckCount(this.playerDeck, this.enemyDeck);
        this.inRound = false;
      } else {
        console.log('flipped')
        this.flipCards();
      }
    });

    document.getElementById("end-turn").addEventListener("click", (e) => {
      const btnID = e.currentTarget.id;
      this.isPlayerTurn = false;
      this.draw.updateText("Enemy turn");

      this.draw.toggleButtonStatus(btnID, true);
      if(!this.isPlayerTurn) {
        this.isPlayerTurn = true;
        setTimeout(() => {
          
          this.AI.changeCardValues(this.playerDeck);
          
          this.draw.updatePlayerCardSlot(this.playerDeck.currentCard);
          this.draw.updateEnemyCardSlot(this.enemyDeck.currentCard, this.playerDeck.currentCard);
          this.draw.updateText("Your turn");
          this.draw.toggleButtonStatus(btnID, false);
        }, 1000);
      }
    })
    
    document.getElementById("end-round").addEventListener("click", (e) => {
        const btnID = e.currentTarget.id;

        if(this.isRoudEnded && !this.isStop) {
          this.draw.changeBtnData(btnID, false, 'End round');
          document.getElementById("new-game").click();
          return false;
        }

        this.AI.changeCardValues(this.playerDeck, true);
        this.draw.updatePlayerCardSlot(this.playerDeck.currentCard);
        this.draw.updateEnemyCardSlot(this.enemyDeck.currentCard, this.playerDeck.currentCard);
        // this.isPlayerTurn = !this.isPlayerTurn;

        this.isTurnEnded = true;
        this.isRoudEnded = true;
        if (this.isRoundWinner(this.playerDeck, this.enemyDeck)) {
          this.draw.updateText("Win");
          this.playerDeck.takeCard(this.playerDeck.currentCard);
          this.playerDeck.takeCard(this.enemyDeck.currentCard);
        } else if (this.isRoundWinner(this.enemyDeck, this.playerDeck)) {
          this.draw.updateText("Lose");
          this.enemyDeck.takeCard(this.playerDeck.currentCard);
          this.enemyDeck.takeCard(this.enemyDeck.currentCard);
        } else {
          this.draw.updateText("Draw");
          this.playerDeck.takeCard(this.playerDeck.currentCard);
          this.enemyDeck.takeCard(this.enemyDeck.currentCard);
        }
      
        if (this.isOver(this.playerDeck)) {
          this.draw.updateText("You Lose!");
          this.isStop = true;
        } else if (this.isOver(this.enemyDeck)) {
          this.draw.updateText("You Win!");
          this.isStop = true;
        }

        if(!this.isStop) {
          this.isPlayerStart = !this.isPlayerStart;
          this.isPlayerTurn = this.isPlayerStart;
        }

        this.playerDeck.discardCard();
        this.enemyDeck.discardCard();

        // this.draw.toggleButtonStatus('end-turn', true);
        this.draw.changeBtnData(btnID, false, 'Next round');
    })

    document.addEventListener("click", (event) => {
      if (event.target.id === "power_up") {
        this.playerDeck.powerUp();
        this.draw.updatePlayerCardSlot(this.playerDeck.currentCard);
        document.getElementById("end-turn").click();
        
      }
      if (event.target.id === "attack") {
        this.playerDeck.attack(this.enemyDeck, this.playerCard);
        this.draw.updateEnemyCardSlot(this.enemyDeck.currentCard, this.playerDeck.currentCard);
        document.getElementById("end-turn").click();
      }
      if (event.target.id === "defend") {
        this.playerDeck.defend();
        this.draw.updatePlayerCardSlot(this.playerDeck.currentCard);
        document.getElementById("end-turn").click();
      }

    });
    
  }

  start() {
    this.deck = new Deck();
    this.deck.shuffle();
    const deck_midpoint = Math.ceil(this.deck.cards.length / 2);
    this.playerDeck = new Player(this.deck, 0, deck_midpoint);
    this.enemyDeck = new Player(this.deck, deck_midpoint, this.deck.cards.length);

    console.log('player', this.playerDeck.hand)
    console.log('enemy', this.enemyDeck.hand)

    this.inRound = false;
    this.isTurnEnded = false;
    this.isStop  = false

    this.draw.cleanBeforeRound();
    this.draw.updateDeckCount(this.playerDeck, this.enemyDeck);

    this.isPlayerStart = Math.random() < 0.5;

    this.isPlayerTurn = this.isPlayerStart;
    this.draw.updateText((this.isPlayerTurn ? "You turn" : "Enemy turn"));
    this.draw.toggleButtonStatus('end-turn', false);
  }

  flipCards() {
    this.isTurnEnded = false;
    this.isRoudEnded = false;
    this.inRound = true;
    const playerCard = this.playerDeck.pop();
    const enemyCard = this.enemyDeck.pop();

    this.AI = new AI(this.enemyDeck);
  
    this.draw.selectedCards(playerCard, enemyCard);
  
    this.draw.updateDeckCount(this.playerDeck, this.enemyDeck);

    if(!this.isPlayerTurn) {
        this.isPlayerTurn = true;
        this.draw.updateText("Enemy turn");
        setTimeout(() => {
          
          this.AI.changeCardValues(this.playerDeck);
          
          this.draw.updatePlayerCardSlot(this.playerDeck.currentCard);
          this.draw.updateEnemyCardSlot(this.enemyDeck.currentCard, this.playerDeck.currentCard);
          this.draw.updateText("Your turn");
        }, 1000);
      }else {
        this.draw.updateText("Your turn");
      }

  }

  setTurn() {
    
  }

  isRoundWinner(cardOne, cardTwo) {
    return cardOne.currentCard.power > cardTwo.currentCard.power;
  }

  isOver(deck) {
    return deck.hand.length === 0;
  }  

}

new Game().start();