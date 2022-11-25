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
// -----------------------------------------------------------------------
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

function updateDisplays() { //funktion för att uppdatera allt i sidebar.
    let aside = document.querySelector("aside"); 
    let currentPlayer = players[gameTurn]; //tar in spelare av gameturn (från players listan) och lägger in i currentplayer.
    let asideContent = `<h3>${currentPlayer.name}s tur</h3>
    <h4>Poäng</h4>
    <p>${playerOne.score}</p>
    <p>${playerTwo.score}</p>`;
    aside.innerHTML = asideContent;
}

function sideBar(){
    // skapar aside och sätter in i div
    const container = document.querySelector(".wrap-container");
    let aside = document.createElement("aside");
    container.append(aside);
    updateDisplays(); // kallar på all data som ska sättas in i aside
}

// skapa en eventListener för varje article
function addArticleListener() {
    const articleListener = document.querySelectorAll('article');
    for (const article of articleListener) {
        article.addEventListener('click', (event) => {
            flippedCard(event.currentTarget)
        });
    }
}

let flippedCardsList = []; //lista på alla kort som är "flippade"
function flippedCard (card) { //ska spara och jämnföra / kolla om 2 är valda
    flippedCardsList.push(card);
    card.innerHTML = `<img src=${images[card.className]}>`;
    card.style.pointerEvents = "none"; // stänger av så man inte kan klicka på samma kort igen
    card.setAttribute('name', 'flipped');
    if (flippedCardsList.length == 2){
        for (const article of main.children) {
            article.style.pointerEvents = "none";
        }
        compareFlippedCard();
        setTimeout(() => {flippedCardsList = [];}, 1500);
    }
}

function isCardFlipped () { //kollar på alla kort om name är "flipped"
    for (const article of main.children) {
        if (article.getAttribute('name') != 'flipped') {
            //alla kort som inte är flipped görs klickbara igen.
            article.style.pointerEvents = "all";
        }
    }
}

function compareFlippedCard () { //jämnför korten om de är en match eller inte.
    let currentPlayer = players[gameTurn];
    if (flippedCardsList[0].className == flippedCardsList[1].className) {
        // Match!
        currentPlayer.score++;
        updateDisplays();
        isCardFlipped();
    } else {
        // Not a match!
        setTimeout(() => {
            //tar bort flipped attributet och vänder tillbaka kortet same gör dem klickbara igen.
            flippedCardsList.forEach((card) => {
                card.removeAttribute('name');
                card.style.pointerEvents = "all" //gör korten klickbara igen.
                card.innerHTML = `<img src=${hiddenCard}>`;
            });
            isCardFlipped();
        }, 1500);
        changePlayerTurn();
        updateDisplays();
    }
}

function changePlayerTurn () {
    //byter spelare (ger en value mellan 0 och 1)
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
