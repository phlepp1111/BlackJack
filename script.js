import newDeck from "./deck.json" assert { type: "json" };

const dealerContainer = document.getElementById("dealerContainer");
const playerContainer = document.getElementById("playerContainer");
const playerPunkte = document.getElementById("playerPunkte");
const splitPunkte = document.getElementById("splitPunkte");
const dealerSiege = document.getElementById("dealerSiege");
const playerSiege = document.getElementById("playerSiege");
const modal = document.getElementById("modal");
const winMessage = document.getElementById("winMessage");
const dealerPunkteModal = document.getElementById("dealerPunkteModal");
const playerPunkteModal = document.getElementById("playerPunkteModal");
const splitPunkteModal = document.getElementById("splitPunkteModal");
const splitBtn = document.getElementById("splitBtn");
const splitContainer = document.getElementById("playerContainer2");
const splitNewCard = document.getElementById("splitNewCard");

let deck = [];
let dealerCount = 0;
let playerCount = 0;
let splitCount = 0;
let siegeDealer = 0;
let siegePlayer = 0;
let dealerDraw = [];
let playerDraw = [];
let splitDraw = [];
let splitToggle = false;

document.getElementById("hitMe").addEventListener("click", draw);
document.getElementById("startGame").addEventListener("click", newGame);
document.getElementById("fertig").addEventListener("click", function () {
    checkWinFertig(1, splitToggle);
});
document.getElementById("winOkay").addEventListener("click", newGame);
document.getElementById("doubleDown").addEventListener("click", doubleDown);
splitBtn.addEventListener("click", split);
splitNewCard.addEventListener("click", splitCardsDraw);
// splitStand.addEventListener("click", splitCardsStand);

newGame();

function doubleDown() {
    draw();
    checkWinFertig(2);
}
function newGame() {
    modal.close();
    dealerDraw = [];
    playerDraw = [];
    splitDraw = [];
    dealerContainer.innerHTML = "";
    playerContainer.innerHTML = "";
    splitContainer.innerHTML = "";
    playerPunkte.innerHTML = "";
    splitPunkte.innerHTML = "";
    winMessage.innerHTML = "";
    dealerCount = 0;
    playerCount = 0;
    splitToggle = false;
    splitBtn.removeAttribute("class", "splitOFF");
    document.getElementById("doubleDown").removeAttribute("class", "splitOFF");
    splitContainer.setAttribute("class", "splitOFF");
    splitContainer.style.display = "none";
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
    splitCheck();
    dealerCardsDraw(0);
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
function split() {
    splitBtn.setAttribute("class", "splitOFF");
    splitContainer.removeAttribute("class", "splitOFF");
    splitContainer.style.display = "flex";
    splitNewCard.removeAttribute("class", "splitOFF");
    document.getElementById("doubleDown").setAttribute("class", "splitOFF");
    splitToggle = true;
    playerContainer.removeChild(playerContainer.children[0]);
    let splitCard = playerDraw.splice(0, 1)[0];
    splitDraw.push(splitCard);
    let card2 = document.createElement("div");
    card2.setAttribute("class", "card ");
    let image2 = document.createElement("img");
    image2.setAttribute("src", splitDraw[0].image);
    card2.appendChild(image2);
    splitContainer.appendChild(card2);
    draw();
    splitCardsDraw();
}
function splitCheck() {
    splitBtn.setAttribute("class", "splitOFF");
    splitNewCard.setAttribute("class", "splitOFF");
    // console.log(playerDraw[0].value, playerDraw[1].value);
    if (playerDraw[0].value === playerDraw[1].value) {
        splitBtn.removeAttribute("class", "splitOFF");
    }
}
function draw() {
    playerCount = 0;
    let werte2 = deck.splice(0, 1)[0];
    playerDraw.push(werte2);
    playerDraw.sort((a, b) => a.punkte - b.punkte);
    let card2 = document.createElement("div");
    card2.setAttribute("class", "card ");
    let image2 = document.createElement("img");
    image2.setAttribute("src", werte2.image);
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
    card2.setAttribute = ("name", werte2.suit + " " + werte2.value);
    card2.appendChild(image2);
    playerContainer.appendChild(card2);
    playerPunkte.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
    playerPunkteModal.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
}
function splitCardsDraw() {
    splitCount = 0;
    let werte2 = deck.splice(0, 1)[0];
    splitDraw.push(werte2);
    splitDraw.sort((a, b) => a.punkte - b.punkte);
    let card2 = document.createElement("div");
    card2.setAttribute("class", "card ");
    let image2 = document.createElement("img");
    image2.setAttribute("src", werte2.image);
    for (let i = 0; i < splitDraw.length; i++) {
        if (splitDraw[i].punkte === 11) {
            if (splitCount <= 10) {
                splitCount += splitDraw[i].punkte;
            } else {
                splitCount++;
            }
        } else {
            splitCount += splitDraw[i].punkte;
        }
    }
    card2.setAttribute = ("name", werte2.suit + " " + werte2.value);
    card2.appendChild(image2);
    splitContainer.appendChild(card2);
    splitPunkte.innerHTML = "<h3>Punkte Split: " + splitCount + "</h3>";
    splitPunkteModal.innerHTML = "<h3>Punkte Split: " + splitCount + "</h3>";
}

function dealerCardsDraw(x) {
    dealerCount = 0;
    let werte1 = deck.splice(0, 1)[0];
    dealerDraw.push(werte1);
    dealerDraw.sort((a, b) => a.punkte - b.punkte);
    let card1 = document.createElement("div");
    card1.setAttribute("class", "card ");
    card1.setAttribute = ("name", werte1.suit + " " + werte1.value);
    let image1 = document.createElement("img");
    image1.setAttribute("src", werte1.image);
    for (let i = 0; i < dealerDraw.length; i++) {
        if (dealerDraw[i].punkte === 11) {
            if (dealerCount <= 10) {
                dealerCount += dealerDraw[i].punkte;
            } else {
                dealerCount++;
            }
        } else {
            dealerCount += dealerDraw[i].punkte;
        }
    }
    card1.appendChild(image1);
    dealerContainer.appendChild(card1);
    if (x === 0) {
        return;
    }
    while (dealerCount < 17) {
        dealerCardsDraw(1);
    }
}
function checkWin(x) {
    if (playerCount > 21 && dealerCount <= 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML += "<p>Dealer Wins!</p>";
        modal.showModal();
    } else if (dealerCount > 21 && playerCount <= 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Playersiege: " + siegePlayer;
        winMessage.innerHTML += "<p>Player Wins!</p>";
        modal.showModal();
    } else if (playerCount === 21 && dealerCount !== 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Playersiege: " + siegePlayer;
        winMessage.innerHTML += "<p>Player Wins!</p>";
        modal.close();
        modal.showModal();
    } else if (dealerCount === 21 && playerCount !== 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML += "<p>Dealer Wins!</p>";
        modal.close();
        modal.showModal();
    } else if (playerCount === 21 && dealerCount === 21) {
        winMessage.innerHTML += "<p>Unentschieden!</p>";
        modal.close();
        modal.showModal();
    } else if (playerCount > 21 && dealerCount > 21) {
        winMessage.innerHTML += "<p>Unentschieden!</p>";
        modal.showModal();
    }
}

function checkWinSplit(x) {
    if (splitCount > 21 && dealerCount <= 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML += "<p>Dealer Wins!</p>";
    } else if (dealerCount > 21 && splitCount <= 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Playersiege: " + siegePlayer;
        winMessage.innerHTML += "<p>Split Wins!</p>";
    } else if (splitCount === 21 && dealerCount !== 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Playersiege: " + siegePlayer;
        winMessage.innerHTML = "<p>Split Wins!</p>";
    } else if (dealerCount === 21 && splitCount !== 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
        winMessage.innerHTML += "<p>Dealer Wins!</p>";
    } else if (splitCount === 21 && dealerCount === 21) {
        winMessage.innerHTML += "<p>Split Unentschieden!</p>";
    } else if (splitCount > 21 && dealerCount > 21) {
        winMessage.innerHTML += "<p>Split Unentschieden!</p>";
    }
}

function checkWinFertig(x, splitToggle) {
    modal.close();
    dealerCardsDraw();
    playerCount = 0;
    dealerCount = 0;
    splitCount = 0;

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
    for (let i = 0; i < splitDraw.length; i++) {
        if (splitDraw[i].punkte === 11) {
            if (splitCount <= 10) {
                splitCount += splitDraw[i].punkte;
            } else {
                splitCount++;
            }
        } else {
            splitCount += splitDraw[i].punkte;
        }
    }
    for (let i = 0; i < dealerDraw.length; i++) {
        if (dealerDraw[i].punkte === 11) {
            if (dealerCount <= 10) {
                dealerCount += dealerDraw[i].punkte;
            } else {
                dealerCount++;
            }
        } else {
            dealerCount += dealerDraw[i].punkte;
        }
    }
    playerPunkte.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
    playerPunkteModal.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
    dealerPunkteModal.innerHTML = "<h3>Punkte Dealer: " + dealerCount + "</h3>";

    if (splitToggle == true) {
        splitPunkteModal.innerHTML =
            "<h3>Punkte Split: " + splitCount + "</h3>";
        if (splitCount < 21 && dealerCount < 21) {
            if (splitCount > dealerCount) {
                siegePlayer += x;
                playerSiege.innerHTML = "Playersiege: " + siegePlayer;
                winMessage.innerHTML += "<p>Split Wins!</p>";
            } else if (dealerCount > splitCount) {
                siegeDealer += x;
                dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
                winMessage.innerHTML += "<p>Dealer Wins!</p>";
            } else if (dealerCount === splitCount) {
                winMessage.innerHTML += "<p>Split Unentschieden!</p>";
            }
        } else {
            checkWinSplit(1);
        }
    }
    if (playerCount < 21 && dealerCount < 21) {
        if (playerCount > dealerCount) {
            siegePlayer += x;
            playerSiege.innerHTML = "Playersiege: " + siegePlayer;
            winMessage.innerHTML += "<p>Player Wins!</p>";
            modal.showModal();
        } else if (dealerCount > playerCount) {
            siegeDealer += x;
            dealerSiege.innerHTML = "Dealersiege: " + siegeDealer;
            winMessage.innerHTML += "<p>Dealer Wins!</p>";
            modal.showModal();
        } else if (dealerCount === playerCount) {
            winMessage.innerHTML += "<p>Unentschieden!</p>";
            modal.showModal();
        }
    } else {
        checkWin(x);
    }
}
