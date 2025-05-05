class Draw {
  constructor() {
    this.enemyCardSlot = document.querySelector(".enemy-card-slot");
    this.playerCardSlot = document.querySelector(".player-card-slot");
    this.text = document.querySelector(".text");
    this.enemyDeckElement = document.querySelector(".enemy-deck");
    this.playerDeckElement = document.querySelector(".player-deck");
    this.endTurnBtn = document.querySelector("#end-turn");
    this.endRoundBtn = document.querySelector("#end-round");
    // this.gameStatusButton = document.createElement("button").innerText = 'End Round';
  }

  cleanBeforeRound() {
    this.enemyCardSlot.innerHTML = "";
    this.playerCardSlot.innerHTML = "";
    this.text.innerText = "";
  }

  updateDeckCount(player, enemy) {
    this.playerDeckElement.innerText = player.hand.length;
    this.enemyDeckElement.innerText = enemy.hand.length;
  }

  selectedCards(playerCard, enemyCard) {
    this.playerCardSlot.appendChild(this.card(playerCard));
    this.enemyCardSlot.appendChild(this.card(enemyCard));
    this.playerCardSlot.appendChild(this.abilities(playerCard));
  }
  
  updatePlayerCardSlot(playerCard) {
    this.playerCardSlot.innerHTML = "";
    this.playerCardSlot.appendChild(this.card(playerCard));
    this.playerCardSlot.appendChild(this.abilities(playerCard));

  }
  
  updateEnemyCardSlot(enemyCard, playerCard) {
    this.enemyCardSlot.innerHTML = "";
    this.enemyCardSlot.appendChild(this.card(enemyCard));
    this.playerCardSlot.appendChild(this.abilities(playerCard));
  }

  updateText(message) {
    this.text.innerText = message;
  }

  card(card) {
    const cardDIV = document.createElement("div");
    cardDIV.innerText = card.power;
    cardDIV.classList.add("card", card.element);
    cardDIV.dataset.power = card.power;
    cardDIV.dataset.defend = card.defend;
    
    return cardDIV;
  }

  abilities(playerCard) {
    const abilities_div = document.createElement("div");
    abilities_div.classList.add("abilties-wrapper");
    const buttons = {
      defend: document.createElement("button"),
      attack: document.createElement("button"),
      power_up: document.createElement("button"),
    };

    const card_abilities = playerCard.abilities

    for (let key in buttons) {
      var text = key
      buttons[key].innerText = text.replace(/_/g, ' ');
      buttons[key].disabled = !card_abilities[key];
      buttons[key].id = key;
      abilities_div.appendChild(buttons[key]);
    }

    return abilities_div;

  }

  gameDisabledAttr (isRoundStarted) {

    this.nextRoundBtn.disabled = (isRoundStarted) ? false : true;
    this.endRoundBtn.disabled = (isRoundStarted) ? false : true;
  }

  toggleButtonStatus (btnID, isDisabled) {
    document.getElementById(btnID).disabled = isDisabled;
  }

  changeBtnData (button, id = false, name = false) {
    const btn = typeof button === 'string' 
    ? document.getElementById(button) 
    : button;

    if (!btn || !(btn instanceof HTMLElement)) {
      console.error('Button element not found');
      return false;
    }

    // Update ID if new one provided
    if (id !== false) {
      btn.id = id;
    }

    // Update text content if new one provided
    if (name !== false) {
      btn.textContent = name;
    }


  }

}
export { Draw };
