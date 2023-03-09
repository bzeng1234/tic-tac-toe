let Player = (id, symbol)=> {
     return { id, symbol };
};

let displayController = (() => {
     let closeFormBtn = document.querySelector(".play-btn");
     let squares = document.querySelectorAll(".square");
     let resetBoard = () => {
          closeFormBtn.addEventListener("click", (e) => {
               squares.forEach(element => {
                    element.textContent = "";
               })
          });
     };
     let initalizeClick = (gameBoard) => {
          squares.forEach(element => {
               element.addEventListener("click", (e) => {
                    if(gameBoard.currPlayer.id === 1)
                         e.target.textContent = 'X';
                    else if(gameBoard.currPlayer.id === 2)
                         e.target.textContent = '0';
                         gameBoard.currPlayer = (gameBoard.currPlayer.id === 1) ? gameBoard.playerTwo : gameBoard.playerTwo;
                    
                    let blockid = e.target.id - 1;

               });
          });
     };
     
     return {resetBoard, initalizeClick}
})();

let gameBoard = (() => {
     let board = [];
     let playerOne = Player(1, 'X');
     let playerTwo = Player(2, 'O');
     let currPlayer = playerOne;
     let winGame = false;
     let display = Object.assign(displayController);
     display.initalizeClick(this);
     let initalizeGame = () => {
          console.log("initializing game.");
          display.resetBoard();
          currPlayer = playerOne;
          winGame = false;
     };
     return { board, playerOne, playerTwo, currPlayer, display, initalizeGame };
})();

gameBoard.initalizeGame();