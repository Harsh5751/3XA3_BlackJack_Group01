/** 
 * Player
 * @module Player 
*/

/**
 * @class A Player class
 */
class player {

  /**
   * Creates an instance of player.
   * @param {string} name The name of the player
   * @memberof player
   */
  constructor(name) {
    
    if(!(typeof name === "string")){throw new Error("invalid_argument");}
    /**
    * @property {string} playerName The name of the player
    */
    this.playerName = name;

    /**
    * @property {Array<CardT>} playerCards The cards in the player's hand
    */
    this.playerCards = [];

    /**
    * @property {number} playerScore The player's score
    */
    this.playerScore = 0;

    /**
    * @property {number} currentWager The current wager the player has played
    */
    this.currentWager = 0;

    /**
    * @property {number} currentChipBalance The player's current chip balance, defaulted to 1000 
    */
    this.currentChipBalance = 1000;

    /**
    * @property {number} playerWinsTotal The player's total wins for this session 
    */
    this.playerWinsTotal = 0;
  }


  /**
   * @property {Function} name Get the players name
   * @readonly
   * @memberof player
   * @returns {string} - The name of the player
   */
  get name() {
    return this.playerName;
  }


  /**
   * @property {Function} score Get the players score
   * @readonly
   * @memberof player
   * @returns {number} - The players score
   */
  get score() {
    return this.playerScore;
  }

  /**
   * @property {Function} hand Get the players hand
   * @readonly
   * @memberof player
   * @returns {Array<CardT>} - The hand of the player
   */
  get hand() {
    return this.playerCards;
  }


  /**
   * @property {Function} cash Get the currentChipBalance of the player
   * @readonly
   * @memberof player
   * @returns {number} - The current chip balance of the player
   */
  get cash() {
    return this.currentChipBalance;
  }

  /**
   * @property {Function} playerWins Get the current number of times the player has won in this session
   * @readonly
   * @memberof player
   * @returns {number} - The current number of total wins the player has
   */
  get playerWins() {
    return this.playerWinsTotal;
  }

  /**
   * @property {Function} score Set the score of the player
   * @param {number} score The score that the player will receive
   * @memberof player
   */
  set score(score) {
    this.score = score;
  }

  /**
   * @property {Function} hand Set the player's hand
   * @param {CardT} cards The cards the player's hand will become
   * @memberof player
   */
  set hand(cards) {
    this.playerCards = cards;
  }

  /**
   * @property {Function} cash Set the cash the player has
   * @param {number} amount The amount of chips the player will have
   * @memberof player
   */
  set cash(amount) {
    this.currentChipBalance = amount;
  }

  /**
   * @property {Function} playerWins Set the wins of the player for this session
   * @param {number} wins The number of wins the player will have for this session
   * @memberof player
   */
  set playerWins(wins) {
    this.playerWinsTotal = wins;
  }
  

  /**
   * @property {Function} displayPlayerCard Display the most recent card thats been placed in the hand of the player
   * @memberof player
   */
  displayPlayerCard() {
    var cardHand = this.playerCards;
    var dealtCard = cardHand[cardHand.length - 1];
    var img = document.createElement("img");
    img.src = "../Images/" + dealtCard.img;
    var playerHand = document.getElementById('playerHand');
    playerHand.appendChild(img);
  }

  /**
   * @property {Function} playerCalculateScore Calculates the score of the player based on the cards in their hand
   * @returns {number} Score that has been calculated
   * @memberof player
   */
  playerCalculateScore() {
      var score = 0;
      var hasAce = false;

    for (let i = 0; i < this.playerCards.length; i++) {
      var card = this.playerCards[i];
      if (card.val === ACE) {
        hasAce = true;
        score += card.val;
      } else {
        score += card.val;
      }
    }
     
    if (hasAce && score + 10 <= 21) {
      return score + 10;
    }

    return score;
  }

  /**
   * @property {Function} playerUpdateScore Updates the score of the player
   * @param {number} score The new score that the player will have
   * @memberof player
   */
  playerUpdateScore(score) {
    if (!(Number.isInteger(score))){throw new Error("invalid_argument");}
    this.playerScore = score;
  }

  /**
   * @property {Function} playerUpdateHand Updates the hand of the player by giving it a new card
   * @param {CardT} card The new card the player will add to their hand
   * @memberof player
   */
  playerUpdateHand(card) {
    if (!(card instanceof CardT)){throw new Error("invalid_argument");}
    this.playerCards.push(card);
  }

  /**
   * @property {Function} playerUpdate Updates the visible score and cards of the player
   * @memberof player
   */
  playerUpdate() {
    //Lists the player's cards and calculates and lists
    //their current score

    this.displayPlayerCard();
    this.playerUpdateScore(this.playerCalculateScore());
    playerScoreboard.innerText = this.playerScore;
  }

  /**
   * @property {Function} betCash The amount the player will bet, updates currentWager and currentChipBalance
   * @param {number} amount The amount the player will bet
   * @memberof player
   */
  betCash(amount) {
    if (!(Number.isInteger(amount))){throw new Error("invalid_argument");}
    else if (amount > this.currentChipBalance){throw new Error("out_of_range");}
    this.currentWager = amount;
    this.currentChipBalance -= amount;
  }

}
