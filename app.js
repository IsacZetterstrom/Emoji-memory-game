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
    let div = document.querySelector('body div');
    div.classList.add('wrap-container');
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

function createNewCard(cardImg){ //funktion för att lägga till kort
    let main = document.querySelector("main"); // ta ut main i DOM
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
    let main = document.querySelector("main"); // ta ut main i DOM
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
    <p>${playerOne.name}: ${playerOne.score}</p>
    <p>${playerTwo.name}: ${playerTwo.score}</p>`;
    aside.innerHTML = asideContent;
    
    let playAgainBtn = document.createElement('button');
    playAgainBtn.innerText = 'Spela igen';
    playAgainBtn.addEventListener('click', playAgain)

    let reset = document.createElement('button');
    reset.innerText = 'Välj nya spelare';
    reset.addEventListener('click', resetGame);
    aside.append(playAgainBtn);
    aside.append(reset);
}

function sideBar(){
    // skapar aside och sätter in i div
    let container = document.querySelector(".wrap-container");
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
    let main = document.querySelector("main"); // ta ut main i DOM
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
    let main = document.querySelector("main"); // ta ut main i DOM
    for (const article of main.children) {
        if (article.getAttribute('name') != 'flipped') {
            //alla kort som inte är flipped görs klickbara igen.
            article.style.pointerEvents = "all";
        }
    }
}
// playerOne.score == playerTwo.score ? alert("Oavgjort") : (playerOne.score > playerTwo.score ? alert("Player one wins") : alert("Player Two wins"))
function isGameOver() {
    if (playerOne.score + playerTwo.score == 1){
        if (playerOne.score == playerTwo.score){
            setTimeout(() => { customAlert('Oavgjort!') }, 250);
        }else if (playerOne.score > playerTwo.score) {
            setTimeout(() => { customAlert(playerOne.name) }, 250);
        }else if (playerOne.score < playerTwo.score) {
            setTimeout(() => { customAlert(playerTwo.name) }, 250);
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
        // kör en funktion som kollar om spelet är slut
        isGameOver();
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
            changePlayerTurn();
            updateDisplays();
        }, 1500);
        
    }
}

function changePlayerTurn () {
    //byter spelare (ger en value mellan 0 och 1)
    gameTurn = (gameTurn + 1) % 2;
}

function customAlert (winner) {
    let container = document.querySelector("main");

    let section = document.createElement('section');
    section.classList.add('alert-section');

    let imgdiv = document.createElement('div');
    imgdiv.classList.add('img-div');

    let header = document.createElement('h2');
    header.innerText = "Spelet är över!"
    let sectionText = document.createElement('p');
    sectionText.innerText = 'Vinnare: ' + winner;

    let playAgainBtn = document.createElement('button');
    playAgainBtn.innerText = 'Spela igen';
    playAgainBtn.addEventListener('click', playAgain)

    let reset = document.createElement('button');
    reset.innerText = 'Välj nya spelare';
    reset.addEventListener('click', resetGame);

    section.append(imgdiv);
    section.append(header);
    section.append(sectionText);
    section.append(playAgainBtn);
    section.append(reset);
    container.append(section);
    setTimeout(() => {
        section.style.transform = 'rotate(360deg)';
        section.style.transition = '1.5s cubic-bezier(0.75, 0.4, 0.4, 1.4)';    
    }, 1);
}

function resetGame () {
    location.reload();
}

function playAgain () {
    flippedCardsList = []
    classListIndex = []
    gameTurn = 0;
    playerOne.score = 0;
    playerTwo.score = 0;
    clearBoard();
    startGame();
}

function clearBoard () {
    let main = document.querySelector("main"); // ta ut main i DOM
    let aside = document.querySelector('aside');
    let container = document.querySelector(".wrap-container");
    let alertSection = document.querySelector('.alert-section');
    main.remove();
    aside.remove();
    alertSection.remove();
    let newMain = document.createElement('main');
    container.append(newMain);
}

function startGame() { //funktioner som kallas på när spelet startas.
    removePlayerSelection();
    sideBar();
    placeCards();
    shuffleClass();
    giveCardClass();
    addArticleListener();
}