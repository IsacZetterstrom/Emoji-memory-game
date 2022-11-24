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

function removePlayerSelection() {
    startSection.remove();
}

function getPlayerNames() {
    if((playerOneInput.value.trim() == "" && playerTwoInput.value.trim() == "") ||
     (playerOneInput.value.trim() == "" || playerTwoInput.value.trim() == "")){
        alert("Fyll i namn på båda spelarna")
    }else{
        playerOne.name = playerOneInput.value;
        playerTwo.name = playerTwoInput.value;
        startGame();
    }
}



startButton.addEventListener('click', getPlayerNames);
// END PLAYER SELECTION SECTION 1

// GAME SECTION

let main = document.querySelector("main");

function CreateNewCard(cardImg){
    let randomClassNumber = Math.floor(Math.random()* (12-1) + 1);
    let newCardContent = `
    <img src=${cardImg}>
    `
    let newCard = document.createElement("article");
    newCard.classList.add(randomClassNumber);
    newCard.innerHTML = newCardContent;

    main.append(newCard);
} 
let hiddenCard = "bilder/hidden.png";
let setImgToCard = [
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

function placeCards (){
    for (let a = 0; a < 2; a++) { // gör 2 gånger för att få ut 2 av varje kort
        for (let i = 0; i < setImgToCard.length; i++){
            CreateNewCard(
                setImgToCard[i] // hiddenCard istället
            )
        }  
    }
}

function startGame() {
    removePlayerSelection(); // tar bort elementet för spelväljare.
    placeCards();
    
}

// Vi måste göra en mapp med bilder!!!!!!!
// okej!
//JUST JA! man glömmer bort när man nöter kod xD


