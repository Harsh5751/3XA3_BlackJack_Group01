$(document).ready(function() {
  $('.sidenav').sidenav();
});

$(document).ready(function() {
  $('.tooltipped').tooltip();
});

// Variables for the game to run
var startButton = document.getElementById('startButton'),
  hitButton = document.getElementById('hitButton'),
  stayButton = document.getElementById('stayButton'),
  yesButton = document.getElementById('yesButton'),
  noButton = document.getElementById('noButton'),
  dealButton = document.getElementById('dealButton'),
  doubleButton = document.getElementById('doubleButton'),
  gameArea = document.getElementById('gameArea'),
  currentBalance = document.getElementById('currentBalance'),
  chip10 = document.getElementById('chip10'),
  chip25 = document.getElementById('chip25'),
  chip50 = document.getElementById('chip50'),
  chip100 = document.getElementById('chip100'),
  currentWager = document.getElementById('currentWager'),
  gameDeck = "",
  gamePlayer = "",
  gameDealer = "",
  gameLogic = "";
var hasMoney = true; // Player will start with money

//These are id's of elements whose properties we want to manipulate
gameTable.style.display = 'none';
gameArea.style.display = 'none';
//startButton.style.display = 'inline';

//Starts the game, initializes deck, player, dealer, the game logic, and shows the appropriate buttons and player info
startButton.addEventListener('click', function() {
  banner.style.display = 'none';
  gameTable.style.display = 'block';
  dealButton.style.display = 'inline';
  chip10.style.display = 'inline';
  chip25.style.display = 'inline';
  chip50.style.display = 'inline';
  chip100.style.display = 'inline';
  gameDeck = new deck(getCards());
  gameDeck.shuffle();
  gamePlayer = new player("player1");
  gameDealer = new dealer();
  gameLogic = new gamePlayLogic(gamePlayer, gameDealer, gameDeck);
  currentWager.style.display = 'inline';
  currentBalance.style.display = 'inline';
  currentWager.innerText = 'Current Wager: ' + gamePlayer.currentWager;
  currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
});

//Deals a two cards to the player, and two cards to the dealer, then checks for a winner, displays appropriate buttons
dealButton.addEventListener('click', function() {
  gameArea.style.display = 'grid';
  gamePlayer.playerCards.push(gameDeck.dealCard());
  gamePlayer.playerUpdate();
  gamePlayer.playerCards.push(gameDeck.dealCard());
  gamePlayer.playerUpdate();

  gameDealer.dealerCards.push(gameDeck.dealCard());
  gameDealer.dealerUpdate();
  gameDealer.dealerCards.push(gameDeck.dealCard());
  gameDealer.dealerUpdate();

  gameLogic.checkForWinner();

  dealButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  doubleButton.style.display = 'inline';
  chip10.style.display = 'none';
  chip25.style.display = 'none';
  chip50.style.display = 'none';
  chip100.style.display = 'none';
  //splitButton.style.display = 'inline';
});

//Adds 10 to current wager and subtracts 10 from currentChipBalance, updates visuals appropriately
chip10.addEventListener('click', function() {
  if (gamePlayer.currentChipBalance >= gamePlayer.currentWager && gamePlayer.currentChipBalance !== 0 && gamePlayer.currentChipBalance - gamePlayer.currentWager - 10 >= 0) {
    gamePlayer.currentWager += 10;
    currentWager.innerText = 'Current Wager: ' + gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + (gamePlayer.currentChipBalance - gamePlayer.currentWager);
  } else {
    swal({
      title: "Insufficent Funds!",
      text: "Not enough Funds to bet this amount",
      icon: "error",
      button: "Close!",
    });
  }

});

//Adds 25 to current wager and subtracts 25 from currentChipBalance, updates visuals appropriately
chip25.addEventListener('click', function() {
  if (gamePlayer.currentChipBalance >= gamePlayer.currentWager && gamePlayer.currentChipBalance !== 0 && gamePlayer.currentChipBalance - gamePlayer.currentWager - 25 >= 0) {
    gamePlayer.currentWager += 25;
    currentWager.innerText = 'Current Wager: ' + gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + (gamePlayer.currentChipBalance - gamePlayer.currentWager);
  } else {
    swal({
      title: "Insufficent Funds!",
      text: "Not enough Funds to bet this amount",
      icon: "error",
      button: "Close!",
    });
  }

});

//Adds 50 to current wager and subtracts 50 from currentChipBalance, updates visuals appropriately
chip50.addEventListener('click', function() {
  if (gamePlayer.currentChipBalance >= gamePlayer.currentWager && gamePlayer.currentChipBalance !== 0 && gamePlayer.currentChipBalance - gamePlayer.currentWager - 50 >= 0) {
    gamePlayer.currentWager += 50;
    currentWager.innerText = 'Current Wager: ' + gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + (gamePlayer.currentChipBalance - gamePlayer.currentWager);
  } else {
    swal({
      title: "Insufficent Funds!",
      text: "Not enough Funds to bet this amount",
      icon: "error",
      button: "Close!",
    });
  }

});

//Adds 100 to current wager and subtracts 100 from currentChipBalance, updates visuals appropriately
chip100.addEventListener('click', function() {
  if (gamePlayer.currentChipBalance >= gamePlayer.currentWager && gamePlayer.currentChipBalance !== 0 && gamePlayer.currentChipBalance - gamePlayer.currentWager - 100 >= 0) {
    gamePlayer.currentWager += 100;
    currentWager.innerText = 'Current Wager: ' + gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + (gamePlayer.currentChipBalance - gamePlayer.currentWager);
  } else {
    swal({
      title: "Insufficent Funds!",
      text: "Not enough Funds to bet this amount",
      icon: "error",
      button: "Close!",
    });
  }

});

//Deals the player another card. Checks for winner
hitButton.addEventListener('click', function() {
  doubleButton.style.display = 'none';
  gamePlayer.playerCards.push(gameDeck.dealCard());
  gamePlayer.playerUpdate();
  gameLogic.checkForWinner();
  if (gameLogic.playerWon === false && gameLogic.gameOver === true) {
    gamePlayer.currentChipBalance -= gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
  } else {
    currentBalance.innerText = 'Chip Balance: ' + (gamePlayer.currentChipBalance - gamePlayer.currentWager);
  }
});

//Player indicates they want to stop being dealt cards. Checks for winner
stayButton.addEventListener('click', function() {
  gameLogic.gameOver = true;
  gameDealer.showFirstCard();
  gameLogic.checkForWinner();
  if (gameLogic.playerWon === true && gamePlayer.playerCards.length == 2 && gamePlayer.playerScore == 21) {
    gamePlayer.currentChipBalance += (gamePlayer.currentWager * 1.5);
    currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
  } else if (gameLogic.playerWon === true) {
    gamePlayer.currentChipBalance += gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
  } else if (gameLogic.playerWon === false) {
    gamePlayer.currentChipBalance -= gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
  } else {
    currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
  }
});

//Player indicate they want to double down on their wager
doubleButton.addEventListener('click', function(){
  if(gamePlayer.currentWager === 0){
    swal({
      title: "You have No Wager!",
      text: "Double Down Has no effect if an initial bet is not made.",
      icon: "info",
      button: "Close!",
    });
  }
  else if (gamePlayer.currentChipBalance < gamePlayer.currentWager * 2){
    swal({
      title: "Not Enough Chip Balance to Double your Wager!",
      text: "Can't double your wager.",
      icon: "info",
      button: "Close!",
    });
  }
  else{
    gamePlayer.currentWager *= 2;
    currentWager.innerText = 'Current Wager: ' + gamePlayer.currentWager;
    currentBalance.innerText = 'Chip Balance: ' + (gamePlayer.currentChipBalance - gamePlayer.currentWager);
    gamePlayer.playerCards.push(gameDeck.dealCard());
    gamePlayer.playerUpdate();
    gameLogic.gameOver = true;
    gameDealer.showFirstCard();
    gameLogic.checkForWinner();
    if (gameLogic.playerWon === true && gamePlayer.playerCards.length == 2 && gamePlayer.playerScore == 21) {
      gamePlayer.currentChipBalance += (gamePlayer.currentWager * 1.5);
      currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
    } else if (gameLogic.playerWon === true) {
      gamePlayer.currentChipBalance += gamePlayer.currentWager;
      currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
    } else if (gameLogic.playerWon === false) {
      gamePlayer.currentChipBalance -= gamePlayer.currentWager;
      currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
    } else {
      currentBalance.innerText = 'Chip Balance: ' + gamePlayer.currentChipBalance;
    }
  }
});

//Player indicates they want to continue playing
yesButton.addEventListener('click', function() {
  gameLogic.reset();
  gameArea.style.display = 'none';
  currentWager.innerText = 'Current Wager: ' + gamePlayer.currentWager;
  //gameDeck.repopulateDeck(cards);
  yesButton.style.display = 'none';
  noButton.style.display = 'none';
  dealButton.style.display = 'inline';
  chip10.style.display = 'inline';
  chip25.style.display = 'inline';
  chip50.style.display = 'inline';
  chip100.style.display = 'inline';
  if (gamePlayer.currentChipBalance < 10 && hasMoney === true) {
    swal({
      title: "Chip Balance Lower then Min Betting Amount!",
      text: "You can continue to play without betting, or restart the game to get back your chip balance.",
      icon: "info",
      button: "Close!",
    });
    hasMoney = false;
  }
});

//Player indicates that they do not want to continue playing, brought back to main blackjack screen
noButton.addEventListener('click', function() {
  gameLogic.reset();
  gameDeck.repopulateDeck();
  hasMoney = true;
  gamePlayer.playerWinsTotal = 0;
  gamePlayer.dealerWinsTotal = 0;
  gamePlayer.currentWager = 0;
  gamePlayer.currentChipBalance = 0;
  playerWins.innerText = '';
  dealerWins.innerText = '';
  gameArea.style.display = 'none';
  banner.style.display = 'block';
  yesButton.style.display = 'none';
  noButton.style.display = 'none';
  gameTable.style.display = 'none';
  currentWager.style.display = 'none';
  currentBalance.style.display = 'none';
});
