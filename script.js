import newDeck from "./deck.json" assert { type: "json" };

let dealerContainer = document.getElementById("dealerContainer");
let playerContainer = document.getElementById("playerContainer");
let playerPunkte = document.getElementById("playerPunkte");
let dealerSiege = document.getElementById("dealerSiege");
let playerSiege = document.getElementById("playerSiege");
let modal = document.getElementById("modal");
let winMessage = document.getElementById("winMessage");
let dealerPunkteModal = document.getElementById("dealerPunkteModal");
let playerPunkteModal = document.getElementById("playerPunkteModal");

let deck = [];
let dealerCount = 0;
let playerCount = 0;
let siegeDealer = 0;
let siegePlayer = 0;
let dealerDraw = [];
let playerDraw = [];

document.getElementById("hitMe").addEventListener("click", draw);
document.getElementById("startGame").addEventListener("click", newGame);
document.getElementById("fertig").addEventListener("click", checkWinFertig);
document.getElementById("winOkay").addEventListener("click", newGame);
document.getElementById("doubleDown").addEventListener("click", doubleDown);

newGame();

function doubleDown() {
    draw();
    checkWinFertig();
    checkWinFertig();
}
function newGame() {
    modal.close();
    dealerDraw = [];
    playerDraw = [];
    dealerContainer.innerHTML = "";
    playerContainer.innerHTML = "";
    playerPunkte.innerHTML = "";
    dealerCount = 0;
    playerCount = 0;
    deck = [
        ...newDeck,
        ...newDeck,
        ...newDeck,
        ...newDeck,
        ...newDeck,
        ...newDeck,
    ];
    Shuffle(deck);
    draw();
    draw();
    checkWin();
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
    dealerDraw.push(werte1);
    dealerDraw.sort((a, b) => a.punkte - b.punkte);
    let card1 = document.createElement("div");
    card1.setAttribute("class", "card ");
    card1.setAttribute = ("name", werte1.suit + " " + werte1.value);
    let image1 = document.createElement("img");
    image1.setAttribute("src", "./images/card back red.png");
    if (werte1.punkte === 11) {
        if (dealerCount <= 10) {
            dealerCount += werte1.punkte;
        } else {
            dealerCount++;
        }
    } else {
        dealerCount += werte1.punkte;
    }
    card1.appendChild(image1);
    dealerContainer.appendChild(card1);
    dealerPunkteModal.innerHTML = "<h3>Punkte Dealer: " + dealerCount + "</h3>";

    let werte2 = deck.splice(0, 1)[0];
    playerDraw.push(werte2);
    playerDraw.sort((a, b) => a.punkte - b.punkte);
    console.log(playerDraw);
    let card2 = document.createElement("div");
    card2.setAttribute("class", "card ");
    let image2 = document.createElement("img");
    image2.setAttribute("src", werte2.image);
    if (werte2.punkte === 11) {
        if (playerCount <= 10) {
            playerCount += werte2.punkte;
        } else {
            playerCount++;
        }
    } else {
        playerCount += werte2.punkte;
    }

    card2.setAttribute = ("name", werte2.suit + " " + werte2.value);
    card2.appendChild(image2);
    playerContainer.appendChild(card2);
    playerPunkte.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
    playerPunkteModal.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";

    checkWin();
}

function checkWin() {
    if (playerCount > 21 && dealerCount <= 21) {
        siegeDealer++;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML = "<h3>Dealer Wins!</h3>";
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
        modal.close();
        modal.showModal();
    } else if (dealerCount === 21 && playerCount !== 21) {
        siegeDealer++;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML = "Dealer Wins!";
        modal.close();
        modal.showModal();
    } else if (playerCount === 21 && dealerCount === 21) {
        winMessage.innerHTML = "Unentschieden!";
        modal.close();
        modal.showModal();
    } else if (playerCount > 21 && dealerCount > 21) {
        winMessage.innerHTML = "Unentschieden!";
        modal.showModal();
    }
}
function checkWinFertig() {
    playerDraw = 0;
    dealerDraw = 0;
    for (let i = 0; i < playerDraw.length; i++) {
        if (playerDraw[i].punkte === 11) {
            if (playerCount <= 10) {
                playerCount += playerDraw[i].punkte;
            } else {
                playerCount++;
            }
        } else {
            playerCount += playerDraw[i].punkte;
        }
    }
    for (let i = 0; i < dealerDraw.length; i++) {
        if (dealerDraw[i].punkte === 11) {
            if (dealerCount <= 10) {
                dealerCount += playerDraw[i].punkte;
            } else {
                dealerCount++;
            }
        } else {
            dealerCount += dealerDraw[i].punkte;
        }
    }
    playerPunkte.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
    playerPunkteModal.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
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
