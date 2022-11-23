let playerOneInput = document.querySelector(".player-one");
let playerTwoInput = document.querySelector(".player-two");
let startButton = document.querySelector(".start-btn");

let playerOne = {
    name: "player one",
    score: 0
}

let playerTwo = {
    name: "player two",
    score: 0
}

function nameGiver (playerOne, playerTwo) {
    console.log(playerOneInput.value, playerTwoInput.value);
    console.log("WOOPP");
    
}

startButton.addEventListener('click', nameGiver)