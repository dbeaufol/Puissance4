//====Require====\\
const readline = require('readline');
const chalk = require('chalk');

const CELL_EMPTY = chalk.bgCyan(" O ");
const PLAYER_A = 1;
const PLAYER_B = 2;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
let ligne;

//====Exports====\\
module.exports = {
  CELL_EMPTY,
  PLAYER_A,
  PLAYER_B,
  createEmptyBoard,
}
//Board puissance 4
const board = createEmptyBoard();
function createEmptyBoard(){
  const board = [
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
  ];
  return board;
}

//display(board);
//playGame();

//====Jeu====\\
function playGame() {
  const state = {
    board: board,
    turn: 0,
  }

  //Gestion des tours//
  promptNextMove(state);
  function playNextMove(state) {
    promptNextMove(state);
  }

  function promptNextMove(state) {
    const player = getPlayerForState(state);
    const displayPlayer = getDisplayPlayer(player);
    const question = `${displayPlayer}, prochain coup ? `
    prompt(question, answer => {
      console.log('commande : ' + answer)
      fillBoard(answer,player);
      state.turn++
      promptNextMove(state)
    });
  }

  function fillBoard(answer,player){
    switch (answer) {
      case "1":
      console.log("1");
      ligne = searchRow(answer,player);
      playerTurn(answer,player,ligne);
      isFinished(player,answer,ligne);
      break;
      case "2":
      console.log("2");
      ligne = searchRow(answer,player);
      playerTurn(answer,player,ligne);
      isFinished(player,answer,ligne);
      break;
      case "3":
      console.log("3");
      ligne = searchRow(answer,player);
      playerTurn(answer,player,ligne);
      isFinished(player,answer,ligne);
      break;
      case "4":
      console.log("4");
      ligne = searchRow(answer,player);
      playerTurn(answer,player,ligne);
      isFinished(player,answer,ligne);
      break;
      case "5":
      console.log("5");
      ligne = searchRow(answer,player);
      playerTurn(answer,player,ligne);
      isFinished(player,answer,ligne);
      break;
      case "6":
      console.log("6");
      ligne = searchRow(answer,player);
      playerTurn(answer,player,ligne);
      isFinished(player,answer,ligne);
      break;
      case "7":
      console.log("7");
      ligne = searchRow(answer,player);
      playerTurn(answer,player,ligne);
      isFinished(player,answer,ligne);
      break;
      default:
      console.log("Entrée un chiffre entre 1 et 7");
      state.turn--;
    }
  }

  function playerTurn(answer,player,ligne){
    if(player === PLAYER_A){
      board[ligne][answer-1] = chalk.bgRed(" O ");
      display(board);
    }else if (player === PLAYER_B) {
      board[ligne][answer-1] = chalk.bgYellow(" O ");
      display(board);
    }
  }

  function searchRow(answer,player){
    for(var i=5; i>=0 ; i--){
      const value = board[i][answer-1];
      if(value === CELL_EMPTY){
        ligne = i;
        return ligne;
      }
    }
  }
  //Conditions de victoire
  function isFinished(player,answer,ligne){
    var victoire = false;
    //ligne
    for(var j=0; j<7; j++){
      if([ligne][answer-1] === j && [ligne][answer-1] === j-1 && [ligne][answer-1] === j-2 && [ligne][answer-1] === j-3){
        console.log([ligne][answer-1]);
        var victoire = true;
      };
    }
    //colonne
    for(var i=0; i<5; i++){

    }
  }

  function getPlayerForState(state) {
    const turn = state.turn;
    if (turn % 2 === 0) {
      return PLAYER_A;
    } else {
      return PLAYER_B;
    }
  }

  function getDisplayPlayer(player) {
    switch (player) {
      case PLAYER_A: return 'Joueur A';
      case PLAYER_B: return 'Joueur B';
      default: throw new Error('Invalid player: ' + player);
    }
  }
}

function prompt(question, callback) {
  rl.question(question, callback);
}

function display(board) {
  board.forEach(row => {
    row.forEach(cell => {
      write(String(cell));
    })
    write(String("\n"));
  })
}

function write(msg) {
  process.stdout.write(msg);
}
