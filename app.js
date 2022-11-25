// PLAYER SELECTION SECTION 1
let playerOneInput = document.querySelector(".player-one");
let playerTwoInput = document.querySelector(".player-two");
let startSection = document.querySelector("div section");
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
let div = document.querySelector('div');

function createNewCard(cardImg){ //funktion för att lägga till kort
    let main = document.querySelector('main');
    let newCardContent = `<img src=${cardImg}>`; // bildmall till listan
    let newCard = document.createElement("article"); // skapar elementet "article"
    newCard.innerHTML = newCardContent; //lägger i värdet från newCardContent till "newCard".
    main.append(newCard);
} 

function placeCards (){
    let main = document.createElement('main')
    div.append(main);
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
    let main = document.querySelector('main');
    console.log(main);
    console.log(classListIndex);
    for (let i = 0; i < classListIndex.length; i++){ //lägger till ett klassnamn till "classListIndex"
        main.children[i].setAttribute('name', classListIndex[i]);
        // För varje article i main, ge den ett klassnamn från classListIndex[i]
    }
}

function sideBar(){
    let currentPlayer = players[gameTurn];
    let asideContent = `<h3>${currentPlayer.name}s tur</h3> 
    <h4>Poäng</h4> 
    <p>${playerOne.name}: ${playerOne.score}</p> 
    <p>${playerTwo.name}: ${playerTwo.score}</p>` // skapar en mall för sidobar i spelet.
    const asideElement = document.createElement("aside");
    asideElement.innerHTML = asideContent;
    div.append(asideElement);
}

// const articleListener = document.querySelectorAll('article');
let clickedArticles = [];
const articles = document.querySelectorAll('article');
function createArticleListener() {
    let article = document.querySelectorAll('article');
    console.log(article);
    article.forEach( a => {
        a.addEventListener('click', () => {
            clickedArticles.push(a);
            flipCard(article, a);
        });
    });
}

function flipCard(articles, article) {
    article.style.pointerEvents = "none";
    console.log(article.getAttribute('name'));
    if( clickedArticles.length == 2) {
        // Gör alla kort oklickbara
        for(art of articles) { art.style.pointerEvents = "none"; };
        if(clickedArticles[0].getAttribute('name') == clickedArticles[1].getAttribute('name')) {
            // Sätta till attribute isället för klass
            clickedArticles.forEach(article => article.classList.add('flipped'));
            updateScore();
            updateDisplay();
            
        } else {
            setTimeout(() => {
                clickedArticles.forEach(article => {
                    article.innerHTML = `<img src=${hiddenCard}>`;
                });
            }, 1500);
            gameTurn = (gameTurn + 1) % 2;
            updateDisplay();
        }
        setTimeout(() => {
            // vänta en halv sekund innan man gör korten klickbara igen
            for(art of articles) { art.style.pointerEvents = "all"; };
            clickedArticles = [];
            for(art of articles) {
                // om article attributen är flipped islället för klass
                if(art.className == 'flipped') {
                    art.style.pointerEvents = "none";
                }
            }
        }, 1500);
        gameEnd();
    }

    article.innerHTML = `<img src=${images[article.getAttribute('name')]}>`;
}

function updateScore() {
    let currentPlayer = players[gameTurn];
    currentPlayer.score += 1;
}

function updateDisplay() {
    let currentPlayer = players[gameTurn];
    let aside = document.querySelector('aside');
    aside.innerHTML = `<h3>${currentPlayer.name}s tur</h3>
    <h4>Poäng</h4>
    <p>${playerOne.name}: ${playerOne.score}</p>
    <p>${playerTwo.name}: ${playerTwo.score}</p>`; // skapar en mall för sidobar i spelet.
}

function resetGame() {
    gameTurn = 0;
    playerOne.score = 0;
    playerTwo.score = 0;
    classListIndex = [];
    clickedArticles = [];
}

function gameEnd() {
    let main = document.querySelector('main');
    let aside = document.querySelector('aside');
    if(playerOne.score + playerTwo.score >= 12) {
        alert("Game End");
        setTimeout(() => {
            main.remove();
            aside.remove();
            resetGame();
            startGame();
        }, 5000);
        
    }

}

function startGame() { //funktioner som kallas på när spelet startas.
    removePlayerSelection();
    placeCards();
    sideBar();
    shuffleClass();
    giveCardClass();
    createArticleListener();
}

div.setAttribute("flipped", "flipped");
// TODO
/*

1. eventlistener för att veta när man klickar på korten

*/