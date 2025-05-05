class AI {
  constructor(computer) {
    this.computer = computer;
  }

  evaluateSituation(player) {
    const computerCard = this.computer.currentCard;
    const playerCard = player.currentCard;
    
    // Calculate threat level based on power difference
    const powerDiff = playerCard.power - computerCard.power;
    const threatLevel = powerDiff > 0 ? 'high' : powerDiff < 0 ? 'low' : 'medium';
    
    console.log('player attck', playerCard.abilities.attack);

    // Calculate optimal strategy based on situation
    if (threatLevel === 'high') {

      // When at a disadvantage, prioritize defense and power-up
      if (computerCard.abilities.power_up && computerCard.power < playerCard.power) {
        return 'power_up';
      }
      if (computerCard.abilities.attack) {
        return 'attack';
      }
      if (playerCard.abilities.attack && computerCard.abilities.defend && computerCard.defend < playerCard.power / 2) {
        return 'defend';
      }

    } else if (threatLevel === 'medium') {
      
      // When evenly matched, mix offense and defense
      if (computerCard.abilities.attack && computerCard.power > playerCard.defend) {
        return 'attack';
      }
      if (computerCard.abilities.power_up) {
        return 'power_up';
      }
      if (playerCard.abilities.attack && computerCard.abilities.defend) {
        return 'defend';
      }

    } else {

      if(playerCard.abilities.power_up || playerCard.abilities.defend || playerCard.abilities.attack) {
        
        // When at advantage, prioritize attack
        if (computerCard.abilities.attack) {
          return 'attack';
        }
        if (computerCard.abilities.power_up) {
          return 'power_up';
        }
        if (computerCard.abilities.defend && playerCard.abilities.true) {
          return 'defend';
        }

      }

    }
    
    return null;
  }

  changeCardValues(player, isPlayerEndedRound = false) {
    // console.log(player.currentCard);
    if(!isPlayerEndedRound) {

      const strategy = this.evaluateSituation(player);
    
      console.log('strategy', strategy)
      
      if (strategy === 'power_up' && this.computer.currentCard.abilities.power_up) {
        this.computer.powerUp();
        return true;
      }
      
      if (strategy === 'attack' && this.computer.currentCard.abilities.attack) {
        this.computer.attack(player);
        return true;
      }
      
      if (strategy === 'defend' && this.computer.currentCard.abilities.defend) {
        this.computer.defend();
        return true;
      }

    }else {

      if (
        player.currentCard.power > this.computer.currentCard.power ||
        player.currentCard.power == this.computer.currentCard.power
      ) {
        
        if (this.computer.currentCard.abilities.power_up) {
            this.computer.powerUp();
            console.log('ai_power_up_ended')

            if(player.currentCard.power < this.computer.currentCard.power) {
              return true;
            }
        }

        // player attack
        if (this.computer.currentCard.abilities.attack) {
          this.computer.attack(player);
          console.log('ai_attack_ended')
          return true;
        }

        console.log(this.computer.currentCard.abilities)

      }

    }



  }
}

export { AI };
