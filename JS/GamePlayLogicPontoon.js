/**
 * GamePlayLogicPontoon.js
 * @module GamePlayLogicPontoon
*/

/**
 * @class GamePlayLogic class for the pontoon game mode
 */
class gamePlayLogicPontoon {

  /**
   * Creates an instance of gamePlayLogicPontoon.
   * @param {Object} gamePlayer the player who is playing the game
   * @param {Object} gameDealer the dealer the player is up against
   * @param {Object} gameDeck the deck that both the dealer and player are sharing
   * @memberof gamePlayLogicPontoon
   */
  constructor(gamePlayer, gameDealer, gameDeck) {
    /**
    * @property {Object} player The player of the game
    */
    this.player = gamePlayer;

    /**
    * @property {Object} dealer The dealer of the game
    */
    this.dealer = gameDealer;

    /**
    * @property {Object} deck The deck of the game
    */
    this.deck = gameDeck;

    /**
    * @property {boolean} playerWon A flag for the results of the game
    */
    this.playerWon = false;

    /**
    * @property {boolean} gameover A flag for the status of the game
    */
    this.gameover = false;
  }

  /**
   * @property {Function} checkForWinner Checks for a winner of this round
   * @memberof gamePlayLogicPontoon
   */
  checkForWinner() {
    //If the player is done drawing cards, the dealer is dealt cards
    //and a winner is determined based on scores and Blackjack rules
    if (this.player.playerScore > 21) {
      this.gameOver = true;
    }

    if (this.gameOver) {
      while (this.player.playerScore <= 21 && (this.dealer.dealerScore < 17 || (this.dealer.dealerScore == 17 && this.dealer.valChange == true))) {//Hits on soft 17?
        this.dealer.dealerUpdateHand(this.deck.dealCard());
        this.dealer.dealerUpdate();
      }
      if (this.player.playerScore > 21) {
        this.playerWon = false;
      } else if (this.player.playerScore < 22 && this.dealer.dealerScore > 21) {
        this.playerWon = true;
      } else if (this.player.playerScore > this.dealer.dealerScore) {
        this.playerWon = true;
      } else if (this.player.playerScore == this.dealer.dealerScore) {
        this.playerWon = false;
      } else {
        this.playerWon = false;
      }
      this.declareWinner();
    }
  }

  /**
   * @property {Function} declareWinner Outputs to the UI the results of the game
   * @memberof gamePlayLogicPontoon
   */
  declareWinner() {

    //Declares the winner of the hand based on the status of
    //the playerWon variable, and updates the winner's win
    //total.
    var playerWins = document.getElementById('playerWins'),
      dealerWins = document.getElementById('dealerWins'),
      gameStatus = document.getElementById('gameStatus');

    if (this.playerWon == true) {
      swal({
        title: "You Win This Round! Bettings Won: $" + (this.player.currentWager * 2),
        text: "Select Options Below to Play Again or Not",
        icon: "success",
        button: "Close!",
      });
      this.player.playerWinsTotal++;
      playerWins.innerText = this.player.playerWinsTotal;
      dealerWins.innerText = this.dealer.dealerWinsTotal;
    } else if (this.playerWon == false) {
      swal({
        title: "Dealer Wins This Round! Bettings Lost: $" + this.player.currentWager,
        text: "Select Options Below to Play Again or Not",
        icon: "error",
        button: "Close!",
      });
      this.dealer.dealerWinsTotal++;
      dealerWins.innerText = this.dealer.dealerWinsTotal;
      playerWins.innerText = this.player.playerWinsTotal;
    } else {
      swal({
        title: "PUSH! No one Wins! No Bettings Won or Lost",
        text: "Select Options Below to Play Again or Not",
        icon: "info",
        button: "Close!",
      });
      dealerWins.innerText = this.dealer.dealerWinsTotal;
      playerWins.innerText = this.player.playerWinsTotal;
    }

    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    doubleButton.style.display = 'none';
    yesButton.style.display = 'inline';
    noButton.style.display = 'inline';

  }

  /**
   * @property {Function} reset Resets the player, dealer and deck
   * @memberof gamePlayLogicPontoon
   */
  reset() {

    //Resets the completed game in order to start a new hand

    this.player.playerCards = [];
    this.dealer.dealerCards = [];
    this.player.playerScore = 0;
    this.dealer.dealerScore = 0;
    this.player.currentWager = 0;
    this.gameOver = false;
    this.playerWon = false;
    playerScoreboard.innerText = '';
    dealerScoreboard.innerText = '';
    if (this.deck.gameDeck.length <= 4) {
      this.deck.repopulateDeck();
    }

    var dealerHand = document.getElementById('dealerHand');
    var playerHand = document.getElementById('playerHand');

    while (dealerHand.hasChildNodes()) {
      dealerHand.removeChild(dealerHand.firstChild);
    }

    while (playerHand.hasChildNodes()) {
      playerHand.removeChild(playerHand.firstChild);
    }
  }
}
