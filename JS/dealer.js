/** 
 * Dealer
 * @module Dealer
*/

/**
 * @class The dealer class
 */
class dealer {

  /**
   * Creates an instance of dealer.
   * @memberof dealer
   */
  constructor() {

    /**
    * @property {Array<CardT>} dealerCards The cards the dealer has in their hand
    */
    this.dealerCards = [];

    /**
    * @property {number} dealerScore The score of the dealer 
    */
    this.dealerScore = 0;

    /**
    * @property {number} dealerWinsTotal The total number of wins the dealer has for this session
    */
    this.dealerWinsTotal = 0;

    /**
    * @property {boolean} hasAce A variable representing whether the dealer has an ace in their hand
    */
    this.hasAce = false;

    /**
    * @property {boolean} valChange A variable representing whether the dealer's ace has changed value from 1 to 11
    */
    this.valChange = false;
  }


  /**
   * @property {Function} dScore Get the dealer score
   * @readonly
   * @returns {number} The dealers score
   * @memberof dealer
   */
  get dScore() {
    return this.dealerScore;
  }
  
  /**
   * @property {Function} dealerHand Get the dealer hand
   * @readonly
   * @returns {Array<CardT>} The cards in the dealers hand
   * @memberof dealer
   */
  get dealerHand() {
    return this.dealerCards;
  }

  /**
   * @property {Function} dealerWins Get the total wins the dealer has for this session
   * @readonly
   * @returns {number} The total wins the dealer has for this session
   * @memberof dealer
   */
  get dealerWins() {
    return this.dealerWinsTotal;
  }

  /**
   * @property {Function} dScore Set the score for the dealer
   * @param {score} score The new score the dealer's score is to be set to
   * @memberof dealer
   */
  set dScore(score) {
    this.score = score;
  }

  /**
   * @property {Function} dealerHand Set the cards in the dealers hand
   * @param {Array<CardT>} cards The new cards that the dealer will have   *
   * @memberof dealer
   */
  set dealerHand(cards) {
    this.dealerCards = cards;
  }

  /**
   * @property {Function} dealerWins Set the total wins the dealer has for this session
   * @param {number} wins The new total number of wins the dealer has for this session
   * @memberof dealer
   */
  set dealerWins(wins) {
    this.dealerWinsTotal = wins;
  }


  /**
   * @property {Function} showFirstCard Flips over the hidden card of the dealer
   * @memberof dealer
   */
  showFirstCard(){
    var cardHand = this.dealerCards;
    var dealtCard = cardHand[0];
    var img = document.createElement("img");
    img.src = "../Images/" + dealtCard.img;
    
    var dealerHand = document.getElementById('dealerHand');
    dealerHand.replaceChild(img, dealerHand.firstChild);

    this.dealerUpdateScore(this.dealerCalculateScore());
    dealerScoreboard.innerText = this.dealerScore;
  }
  
  /**
   * @property {Function} showBothCards Flips over two hidden cards - to be used with Pontoon
   * @memberof dealer
   */
  showBothCards(){
    var cardHand = this.dealerCards;
    var firstCard = cardHand[0];
    var secondCard = cardHand[1];
    var imgFirst = document.createElement("img");
    var imgSecond = document.createElement("img");
    imgFirst.src = "../Images/" + firstCard.img;
    imgSecond.src = "../Images/" + secondCard.img;
    
    var dealerHand = document.getElementById('dealerHand');
    dealerHand.replaceChild(imgFirst, dealerHand.firstChild);
    dealerHand.replaceChild(imgSecond, dealerHand.childNodes[1]);

    this.dealerUpdateScore(this.dealerCalculateScore());
    dealerScoreboard.innerText = this.dealerScore;
  }

  /**
   * @property {Function} displayDealerCard Display the most recent card thats been placed in the hand of the dealer
   * @memberof dealer
   */
  displayDealerCard() {
    var cardHand = this.dealerCards;
    var img = document.createElement("img");
    if (cardHand.length == 1){
      img.src = "../Images/card_back.png";
    }else{
      var dealtCard = cardHand[cardHand.length - 1];
      img.src = "../Images/" + dealtCard.img;
    }
    var dealerHand = document.getElementById('dealerHand');
    dealerHand.appendChild(img);
  }

  /**
   * @property {Function} displayDealerCardPontoon Display the most recent card thats been placed in the hand of the dealer - For Pontoon Version
   * @memberof dealer
   */
  displayDealerCardPontoon() {
    var cardHand = this.dealerCards;
    var img = document.createElement("img");
    if (cardHand.length == 1 || (cardHand.length == 2 && this.dealerScore < 17)){
      img.src = "../Images/card_back.png";
    }else{
      var dealtCard = cardHand[cardHand.length - 1];
      img.src = "../Images/" + dealtCard.img;
    }
    var dealerHand = document.getElementById('dealerHand');
    dealerHand.appendChild(img);
  }
  
  /**
   * @property {Function} dealerCalculateScore Calculates the score of the dealer based on visible cards
   * @returns {number} The score to be displayed for the dealer
   * @memberof dealer
   */
  dealerCalculateScore() {
    var score = 0;
	  this.hasAce = false;

    for (let i = 0; i < this.dealerCards.length; i++) {
      if (i == 0 && document.getElementById('dealerHand').firstChild.src.includes("Images/card_back.png") ){continue;}
      if (i == 1 && document.getElementById('dealerHand').childNodes[1].src.includes("Images/card_back.png") ){return 0;}
      var card = this.dealerCards[i];
      if (card.val === ACE) {
        this.hasAce = true;
        score += card.val;
      } else {
        score += card.val;
      }
    }
     
    if (this.hasAce && score + 10 <= 21) {
      this.valChange = true;
      return score + 10;
    }
    this.valChange = false;
    return score;
  }

  /**
   * @property {Function} dealerUpdateScore Updates the score of the dealer
   * @param {number} score The new score for the dealer 
   * @memberof dealer
   */
  dealerUpdateScore(score) { 
    if (!(Number.isInteger(score))){throw new Error("invalid_argument");}
    this.dealerScore = score;
  }

  /**
   * @property {Function} dealerUpdateHand Updates the hand of the dealer by giving it a new card
   * @param {CardT} card
   * @memberof dealer
   */
  dealerUpdateHand(card) {
    if (!(card instanceof CardT)){throw new Error("invalid_argument");}
    this.dealerCards.push(card);
  }

  /**
   * @property {Function} dealerUpdate Updates the visible score and cards of the dealer
   * @memberof dealer
   */
  dealerUpdate() {

    //Lists the dealer's cards and calculates and lists
    //their current score

    this.displayDealerCard();
    this.dealerUpdateScore(this.dealerCalculateScore());
    dealerScoreboard.innerText = this.dealerScore;
  }

  /**
   * @property {Function} dealerUpdatePontoon Updates the visible score and cards of the dealer for the Pontoon version
   * @memberof dealer
   */
  dealerUpdatePontoon(){
    this.displayDealerCardPontoon();
    this.dealerUpdateScore(this.dealerCalculateScore());
    dealerScoreboard.innerText = this.dealerScore;
  }
}