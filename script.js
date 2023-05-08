import newDeck from "./deck.json" assert { type: "json" };

let dealerContainer = document.getElementById("dealerContainer");
let playerContainer = document.getElementById("playerContainer");
let dealerPunkte = document.getElementById("dealerPunkte");
let playerPunkte = document.getElementById("playerPunkte");

document.getElementById("hitMe").addEventListener("click", draw);
document.getElementById("startGame").addEventListener("click", newGame);

let deck = [...newDeck];
Shuffle(deck);

let dealerCount = 0;
let playerCount = 0;

export function newGame() {
    dealerContainer.innerHTML = "";
    playerContainer.innerHTML = "";
    dealerPunkte.innerHTML = "";
    playerPunkte.innerHTML = "";
    dealerCount = 0;
    playerCount = 0;
    deck = [...newDeck];
    Shuffle(deck);
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
    card1.innerHTML = werte1.suit + " " + werte1.value;
    dealerCount += werte1.punkte;
    console.log(werte1.punkte);
    dealerContainer.appendChild(card1);
    dealerPunkte.innerHTML = dealerCount;

    let werte2 = deck.splice(0, 1)[0];
    let card2 = document.createElement("div");
    card2.setAttribute("class", "card ");
    playerCount += werte2.punkte;
    console.log(werte2.punkte);
    card2.innerHTML = werte2.suit + " " + werte2.value;
    playerContainer.appendChild(card2);
    playerPunkte.innerHTML = playerCount;

    checkWin();
}

function checkWin() {
    if (playerCount > 21 && dealerCount <= 21) {
        alert("Dealer Win!");
    } else if (dealerCount > 21 && playerCount <= 21) {
        alert("Player Win!");
    } else if (playerCount === 21 && dealerCount !== 21) {
        alert("Player Win!");
    } else if (dealerCount === 21 && playerCount !== 21) {
        alert("Dealer Win!");
    } else if (playerCount === 21 && dealerCount === 21) {
        alert("Unentschieden!");
    } else {
    }
}
