import newDeck from "./deck.json" assert { type: "json" };

let dealerContainer = document.getElementById("dealerContainer");
let playerContainer = document.getElementById("playerContainer");
let dealerPunkte = document.getElementById("dealerPunkte");
let playerPunkte = document.getElementById("playerPunkte");
let dealerSiege = document.getElementById("dealerSiege");
let playerSiege = document.getElementById("playerSiege");
let modal = document.getElementById("modal");
let winMessage = document.getElementById("winMessage");
let winOkay = document.getElementById("winOkay");

document.getElementById("hitMe").addEventListener("click", draw);
document.getElementById("startGame").addEventListener("click", newGame);
document.getElementById("fertig").addEventListener("click", checkWinFertig);
document.getElementById("winOkay").addEventListener("click", newGame);

let deck = [];

let dealerCount = 0;
let playerCount = 0;
let siegeDealer = 0;
let siegePlayer = 0;

newGame();
function newGame() {
    dealerContainer.innerHTML = "";
    playerContainer.innerHTML = "";
    dealerPunkte.innerHTML = "";
    playerPunkte.innerHTML = "";
    dealerCount = 0;
    playerCount = 0;
    deck = [...newDeck];
    Shuffle(deck);
    draw();
    draw();
}
function Shuffle(cards) {
    //Fisher-Yates-Shuffle
    for (let i = 0; i < cards.length; i++) {
        const rnd = (Math.random() * i) | 0;
        const tmp = cards[i];
        cards[i] = cards[rnd];
        cards[rnd] = tmp;
    }
    return cards;
}

function draw() {
    let werte1 = deck.splice(0, 1)[0];
    let card1 = document.createElement("div");
    card1.setAttribute("class", "card ");
    card1.setAttribute = ("name", werte1.suit + " " + werte1.value);
    let image1 = document.createElement("img");
    image1.setAttribute("src", werte1.image);
    dealerCount += werte1.punkte;
    card1.appendChild(image1);
    dealerContainer.appendChild(card1);
    // prettier-ignore
    dealerPunkte.innerHTML = "<h3>Punkte Dealer: " + dealerCount + "</h3>";

    let werte2 = deck.splice(0, 1)[0];
    let card2 = document.createElement("div");
    card2.setAttribute("class", "card ");
    let image2 = document.createElement("img");
    image2.setAttribute("src", werte2.image);
    playerCount += werte2.punkte;
    card2.setAttribute = ("name", werte2.suit + " " + werte2.value);
    card2.appendChild(image2);
    playerContainer.appendChild(card2);
    // prettier-ignore
    playerPunkte.innerHTML = "<h3>Punkte Player: "+ playerCount+"</h3>";

    checkWin();
}

function checkWin() {
    if (playerCount > 21 && dealerCount <= 21) {
        siegeDealer++;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML = "Dealer Wins!";
        modal.showModal();
    } else if (dealerCount > 21 && playerCount <= 21) {
        siegePlayer++;
        playerSiege.innerHTML = "Playersiege: " + siegePlayer;
        winMessage.innerHTML = "Player Wins!";
        modal.showModal();
    } else if (playerCount === 21 && dealerCount !== 21) {
        siegePlayer++;
        playerSiege.innerHTML = "Playersiege: " + siegePlayer;
        winMessage.innerHTML = "Player Wins!";
        modal.showModal();
    } else if (dealerCount === 21 && playerCount !== 21) {
        siegeDealer++;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML = "Dealer Wins!";
        modal.showModal();
    } else if (playerCount === 21 && dealerCount === 21) {
        winMessage.innerHTML = "Unentschieden!";
        modal.showModal();
    } else if (playerCount > 21 && dealerCount > 21) {
        winMessage.innerHTML = "Unentschieden!";
        modal.showModal();
    }
}
function checkWinFertig() {
    if (playerCount < 21 && dealerCount < 21) {
        if (playerCount > dealerCount) {
            siegePlayer++;
            playerSiege.innerHTML = "Playersiege: " + siegePlayer;
            winMessage.innerHTML = "Player Wins!";
            modal.showModal();
        } else if (dealerCount > playerCount) {
            siegeDealer++;
            dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
            winMessage.innerHTML = "Dealer Wins!";
            modal.showModal();
        } else if (dealerCount === playerCount) {
            winMessage.innerHTML = "Unentschieden!";
            modal.showModal();
        }
    } else {
        checkWin();
    }
}
