/** 
 * Deck
 * @module Deck
*/

/**
 * @class The Deck Class
 */
class deck {

  /**
   * Creates an instance of deck.
   * @param {Array<CardT>} cardsRef The 52 cards that go in a deck
   * @memberof deck
   */
  constructor(cardsRef) {
    if (cardsRef.length != TOTAL_CARDS){throw new Error("invalid_argument");}
    for(let i = 0; i < cardsRef.length; i++){
      if (!(cardsRef[i] instanceof CardT)){throw new Error("invalid_argument");}
    }
    this.deck = cardsRef;
  }


  /**
   * @property {Function} gameDeck get the cards in the deck
   * @readonly
   * @returns {Array<CardT>} the cards in the deck
   * @memberof deck
   */
  get gameDeck() {
    return this.deck;
  }

  /**
   * @property {Function} shuffle Shuffles the cards in the deck
   * @memberof deck
   */
  shuffle() {
    var shuffleDeck = this.deck;
    var m = shuffleDeck.length;
    var i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [shuffleDeck[m], shuffleDeck[i]] = [shuffleDeck[i], shuffleDeck[m]];
    }
    this.deck = shuffleDeck;
  }
  
  /**
   * @property {Function} repopulateDeck Sets deck to be a fresh deck of 52 cards and shuffles them
   * @memberof deck
   */
  repopulateDeck() {
    this.deck = getCards();
    this.shuffle();
  }

  /**
   * @property {Function} dealCard Deals one card from the deck
   * @returns {CardT} A card from the deck
   * @memberof deck
   */
  dealCard() {
    if (this.deck.length === 0) {
      this.repopulateDeck();
      return this.deck.shift();
    }
    else {//Otherwise it returns the next card in the deck.
      return this.deck.shift();
    }
  }
}
