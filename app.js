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
        removePlayerSelection();
        console.log(playerOne, playerTwo);
        CreateNewCard("bilder/face-with-tears-of-joy.png");
    }
}

startButton.addEventListener('click', getPlayerNames);
// END PLAYER SELECTION SECTION 1

// GAME SECTION

let main = document.querySelector("main");

function CreateNewCard(cardImg){
    let newCardContent = `
    <figure>
    <img src=${cardImg}/>
    </figure>
    `
    let newCard = document.createElement("div");
    newCard.innerHTML = newCardContent;

    console.log(newCard);
    //main.append(newCard);
} 


// Vi måste göra en mapp med bilder!!!!!!!
// okej!
//JUST JA! man glömmer bort när man nöter kod xD