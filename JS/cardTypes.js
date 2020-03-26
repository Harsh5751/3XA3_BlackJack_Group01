/**
 * cardTypes
 * @module cardTypes
 */

 /**
  * Total Cards in a deck
 *  @const {number} 
 */
const TOTAL_CARDS = 52;

/**
 * ACE represented as 1 for ease of use
 * @const {number}
 */
const ACE = 1;

/**
 * JACK represented as 11 for ease of use
 * @const {number}
 */
const JACK = 11;

/**
 * QUEEN represented as 12 for ease of use
 * @const {number}
 */
const QUEEN = 12;
/**
 * @const {number}
 */
const KING = 13;

/**
 * Type defining the different suits available for cards
 * @type {{Heart: string, Diamond: string, Club: string, Spade: string}}
 */
const SuitT = {
    Heart: "Heart",
    Diamond: "Diamond",
    Club: "Club",
    Spade: "Spade"
};

Object.freeze(SuitT);

/**
 * Type defining the different ranks available for cards
 * @type {{ACE: number, TWO: number, THREE: number, FOUR: number, FIVE: number, SIX: number, SEVEN: number, EIGHT: number, NINE: number, TEN: number, JACK: number, QUEEN: number, KING: number}}
 */
const RankT = {
    ACE: ACE,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: JACK,
    QUEEN: QUEEN,
    KING: KING
};

Object.freeze(RankT);

/**
 * Type defining the different values available to cards
 * @type {{ONE: number, TWO: number, THREE: number, FOUR: number, FIVE: number, SIX: number, SEVEN: number, EIGHT: number, NINE: number, TEN: number, ELEVEN: number}}
 */
const ValueT = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    ELEVEN: 11
};

Object.freeze(ValueT);

/**
 * Type defining the differenct image file names available to cards
 * @type {{}}
 */
const CardImage = {
    HeartACE: "Hearts-Ace.png",
    Heart2: "Hearts-2.png",
    Heart3: "Hearts-3.png",
    Heart4: "Hearts-4.png",
    Heart5: "Hearts-5.png",
    Heart6: "Hearts-6.png",
    Heart7: "Hearts-7.png",
    Heart8: "Hearts-8.png",
    Heart9: "Hearts-9.png",
    Heart10: "Hearts-10.png",
    HeartJACK: "Hearts-Jack.png",
    HeartQUEEN: "Hearts-Queen.png",
    HeartKING: "Hearts-King.png",
    DiamondACE: "Diamonds-Ace.png",
    Diamond2: "Diamonds-2.png",
    Diamond3: "Diamonds-3.png",
    Diamond4: "Diamonds-4.png",
    Diamond5: "Diamonds-5.png",
    Diamond6: "Diamonds-6.png",
    Diamond7: "Diamonds-7.png",
    Diamond8: "Diamonds-8.png",
    Diamond9: "Diamonds-9.png",
    Diamond10: "Diamonds-10.png",
    DiamondJACK: "Diamonds-Jack.png",
    DiamondQUEEN: "Diamonds-Queen.png",
    DiamondKING: "Diamonds-King.png",
    ClubACE: "Clubs-Ace.png",
    Club2: "Clubs-2.png",
    Club3: "Clubs-3.png",
    Club4: "Clubs-4.png",
    Club5: "Clubs-5.png",
    Club6: "Clubs-6.png",
    Club7: "Clubs-7.png",
    Club8: "Clubs-8.png",
    Club9: "Clubs-9.png",
    Club10: "Clubs-10.png",
    ClubJACK: "Clubs-Jack.png",
    ClubQUEEN: "Clubs-Queen.png",
    ClubKING: "Clubs-King.png",
    SpadeACE: "Spades-Ace.png",
    Spade2: "Spades-2.png",
    Spade3: "Spades-3.png",
    Spade4: "Spades-4.png",
    Spade5: "Spades-5.png",
    Spade6: "Spades-6.png",
    Spade7: "Spades-7.png",
    Spade8: "Spades-8.png",
    Spade9: "Spades-9.png",
    Spade10: "Spades-10.png",
    SpadeJACK: "Spades-Jack.png",
    SpadeQUEEN: "Spades-Queen.png",
    SpadeKING: "Spades-King.png",
};

Object.freeze(CardImage);


/**
 * @class A class representing a card
 */
class CardT {
    /**
     * Creates an instance of CardT.
     * @param {SuitT} suit the suit of the card
     * @param {RankT} rank the rank of the card
     * @param {ValueT|number} value the value of the card
     * @param {CardImage} img the image file of the card
     * @memberof CardT
     */
    constructor(suit, rank, value, img){
        
        /**
        * @property {SuitT} suit suit of the card
        */
        this.suit = suit;

        /**
        * @property {RankT} rank Rank of the card
        */
        this.rank = rank;

        /**
        * @property {ValueT} val value of the card
        */
        this.val = value;

        /**
        * @property {CardImage} img image file of the card
        */
        this.img = img;
    }
}

/**
 * Variable representing all the cards available
 * @type {Array<CardT>}
 */
var cards = [];


/**
 * A function for producing the 52 available cards in a deck
 * 
 * @returns {Array<CardT>} cards
 */
function getCards(){
    cards = [];
    for(let suit in SuitT){
        for (let rank in RankT){
            let val = ValueT['ONE'];
            if (RankT[rank] == RankT.ACE){val = ValueT['ONE'];}
            else if(RankT[rank] == RankT.JACK){val = ValueT['TEN'];}
            else if(RankT[rank] == RankT.QUEEN){val = ValueT['TEN'];}
            else if(RankT[rank] == RankT.KING){val = ValueT['TEN'];}
            else{
                val = ValueT[rank];
            }

            let img = "";
            if (RankT[rank] == RankT.ACE){
                img = CardImage[suit + rank];}
            else if(RankT[rank] == RankT.JACK){
                img = CardImage[suit + rank];}
            else if(RankT[rank] == RankT.QUEEN){
                img = CardImage[suit + rank];}
            else if(RankT[rank] == RankT.KING){
                img = CardImage[suit + rank];}
            else{
                img = CardImage[suit + val];
            }
            let card = new CardT(SuitT[suit], RankT[rank], val, img);
            cards.push(card);
        }
    }
    return cards;
}
