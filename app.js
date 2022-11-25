// PLAYER SELECTION SECTION 1
let playerOneInput = document.querySelector(".player-one");
let playerTwoInput = document.querySelector(".player-two");
let startSection = document.querySelector("main section");
let startButton = document.querySelector(".start-btn");

// Lista på spelare med namn och score
let playerOne = {
    name: "",
    score: 0
}
let playerTwo = {
    name: "",
    score: 0
}

let players = [playerOne, playerTwo];
let gameTurn = 0;

function removePlayerSelection() { //tar bort selection när man trycker på knappen "starta spelet"
    startSection.remove();
}

function getPlayerNames() { //tar emot spelarnas namn som är inskrivna
    if((playerOneInput.value.trim() == "" && playerTwoInput.value.trim() == "") ||
     (playerOneInput.value.trim() == "" || playerTwoInput.value.trim() == "")){
        alert("Fyll i namn på båda spelarna")
    }else{  // Sätter vi namnen i playerOne och playerTwo
        playerOne.name = playerOneInput.value;
        playerTwo.name = playerTwoInput.value;
        startGame();    // startar vi spelet
    }
}

startButton.addEventListener('click', getPlayerNames);
// END PLAYER SELECTION SECTION 1

// GAME SECTION

let classListIndex = []; // Lista för att lagra våra class nummer
let hiddenCard = "bilder/question-mark.png"; // baksida för korten
let images = [ // lägger till bilder till korten
    "bilder/dizzy-face.png",
    "bilder/face-with-hand-over-mouth.png",
    "bilder/face-with-tears-of-joy.png",
    "bilder/money-mouth-face.png",
    "bilder/nerd-face.png",
    "bilder/poop.png",
    "bilder/sleeping-face.png",
    "bilder/smiling-face-with-halo.png",
    "bilder/smiling-face-with-heart-eyes.png",
    "bilder/star-struck.png",
    "bilder/upside-down-face.png",
    "bilder/zany-face.png"
];
let main = document.querySelector("main"); // ta ut main i DOM

function createNewCard(cardImg){ //funktion för att lägga till kort
    let newCardContent = `<img src=${cardImg}>`; // bildmall till listan
    let newCard = document.createElement("article"); // skapar elementet "article"
    newCard.innerHTML = newCardContent; //lägger i värdet från newCardContent till "newCard".
    main.append(newCard); // Lägg ut kortet
} 

function placeCards (){
    for (let a = 0; a < 2; a++) { // gör 2 gånger för att få ut 2 av varje kort
        for (let i = 0; i < images.length; i++){
            createNewCard(hiddenCard); // skapar kort
            classListIndex.push(i); // Lagrar ett nummer till klassen för korten
        }
    }
}

function shuffleClass (){
    // lösning hittad på: https://sebhastian.com/shuffle-array-javascript/
    // hur sort fungerar https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let shuffledNumbers = classListIndex.sort( () => { //blandar alla nummer i "classListIndex"
        return Math.random() - 0.5; 
    });
    return shuffledNumbers; // Ger tillbaka dom blandade numren
}

function giveCardClass(){
    for (let i = 0; i < classListIndex.length; i++){ //lägger till ett klassnamn till "classListIndex"
        main.children[i].className = classListIndex[i];
        // För varje article i main, ge den ett klassnamn från classListIndex[i]
    }
}

// FIXA ------ ÄNDRA SIDEBAR
function updateDisplays() {
    let aside = document.querySelector("aside");
    let currentPlayer = players[gameTurn];
    let asideContent = `<h3>${currentPlayer.name}s tur</h3>
    <h4>Poäng</h4>
    <p>${playerOne.score}</p>
    <p>${playerTwo.score}</p>`;
    aside.innerHTML = asideContent;
}
function sideBar(){
    let currentPlayer = players[gameTurn];
    let asideContent = `<h3>${currentPlayer.name}s tur</h3>
    <h4>Poäng</h4>
    <p>${playerOne.score}</p>
    <p>${playerTwo.score}</p>`; // skapar en mall för sidobar i spelet.
    const container = document.querySelector(".wrap-container");
    const aside = document.createElement("aside");
    aside.innerHTML = asideContent;
    container.append(aside);
}

// const articleListener = document.querySelectorAll('article');
function addArticleListener() {
    const articleListener = document.querySelectorAll('article');
    for (const article of articleListener) {
        article.addEventListener('click', (event) => {
            flippedCard(event.currentTarget)
        });
    }
}
let flippedCardsList = [];
function flippedCard (card) {
    flippedCardsList.push(card.className);
    if (flippedCardsList.length == 2){
        compareFlippedCard ();
        flippedCardsList = [];
    }
}

function compareFlippedCard () {
    let currentPlayer = players[gameTurn];
    if (flippedCardsList[0] == flippedCardsList[1]) {
        currentPlayer.score++;
        updateDisplays();
        console.log(currentPlayer.name);
    } else {
        changePlayerTurn();
        updateDisplays();
        console.log(gameTurn);
    }
}

function changePlayerTurn () {
    gameTurn = (gameTurn + 1) % 2;
}





function startGame() { //funktioner som kallas på när spelet startas.
    removePlayerSelection();
    sideBar();
    placeCards();
    shuffleClass();
    giveCardClass();
    addArticleListener();
}

// TODO
/*

1. eventlistener för att veta när man klickar på korten

*/







// let flipCount = 0;
// let flippedCardClasses= [];
// function flippedCard (target){
    
//     if (flipCount == 2) {
//         compareFlippedCards();
//         flipCount = 0;
//     };
//     let realCard = `<img src=${images[target.className]}>`;
//     target.innerHTML = realCard;
//     flippedCardClasses.push(target)
//     flipCount++;
// }

// function compareFlippedCards () {
//     if (flippedCardClasses[0].className == flippedCardClasses[1].className){
//         console.log(flippedCardClasses);
//         playerOne.score++;
//         console.log(playerOne.score);
//     } else if (flippedCardClasses[0].className != flippedCardClasses[1].className){
//         let backCard = `<img src=${hiddenCard}>`; // bildmall till listan
//         flippedCardClasses[0].innerHTML = backCard;
//         flippedCardClasses[1].innerHTML = backCard;
//         changePlayerTurn();
//         console.log(gameTurn);
//     }
//     flippedCardClasses = [];
// }

// function changePlayerTurn () {
//     gameTurn = (gameTurn + 1) % 2;
// }