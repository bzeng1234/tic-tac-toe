let Player = (id, symbol)=> {
     return { id, symbol };
 };
 
 let displayController = (() => {
     let closeFormBtn = document.querySelector(".play-btn");
     let squares = document.querySelectorAll(".square");
     let status = document.querySelector(".status");
     let boardContainer = document.querySelector(".gameboard");
 
     let displayBoard = () => {
         boardContainer.style.visibility = 'visible';
     }
     return {closeFormBtn, squares, status, displayBoard}
 })();
 
 let gameBoard = (() => {
     let board = [];
     let playerOne = Player(1, 'X');
     let playerTwo = Player(2, 'O');
     let currPlayer = playerOne;
     let checkWinnerOrTie = () => {
         if((board[0] === currPlayer.symbol && board[1] == currPlayer.symbol && board[2] === currPlayer.symbol) ||
         (board[3] === currPlayer.symbol && board[4] == currPlayer.symbol && board[5] === currPlayer.symbol) ||
         (board[6] === currPlayer.symbol && board[7] == currPlayer.symbol && board[8] === currPlayer.symbol) ||
         (board[0] === currPlayer.symbol && board[3] == currPlayer.symbol && board[6] === currPlayer.symbol) ||    
         (board[1] === currPlayer.symbol && board[4] == currPlayer.symbol && board[7] === currPlayer.symbol) ||
         (board[2] === currPlayer.symbol && board[5] == currPlayer.symbol && board[8] === currPlayer.symbol) ||
         (board[0] === currPlayer.symbol && board[4] == currPlayer.symbol && board[8] === currPlayer.symbol) ||
         (board[2] === currPlayer.symbol && board[4] == currPlayer.symbol && board[6] === currPlayer.symbol)) {
             displayController.status.textContent = `Player ${currPlayer.id} Wins! Press PLAY to play again`;
             return 1;
         } else if (!board.includes(undefined) && board.length == 9) {
             displayController.status.textContent = `Tie Game, press PLAY to play again`;
         } 
     };
 
     let initalizeClick = () => {
         displayController.squares.forEach(element => {
               element.addEventListener("click", funct);
          });
     };
 
     let resetBoard = () => {
         displayController.status.textContent = "";
         displayController.squares.forEach(element => {
             element.textContent = "";
         })
         board.splice(0, board.length);
    };
 
     let initalizeGame = () => {
         displayController.displayBoard();
          resetBoard();
          initalizeClick();
          currPlayer = playerOne;      
     };
 
     function funct(event) {
         if(event.target.textContent === "")
         event.target.textContent = currPlayer.symbol;
         else
             return;
         let blockid = event.target.id - 1;
         board[blockid] = currPlayer.symbol;
         if(checkWinnerOrTie()) {
             displayController.squares.forEach(element => {
                 element.removeEventListener("click", funct);
             });
         }    
         currPlayer = (currPlayer.id === 1) ? playerTwo : playerOne; 
   };
 
     return { board, currPlayer, initalizeGame };
 })();
 
 displayController.closeFormBtn.addEventListener("click", (e) => {
     gameBoard.initalizeGame();
 });