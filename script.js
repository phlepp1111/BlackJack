import newDeck from "./deck.json" assert { type: "json" }; //einlesen der Karten aus json-file

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

newGame();

function doubleDown() {
    draw();
    checkWinFertig(2); //double down führt die draw-Funktion einmal aus und überigbt eine 2 für doppelte Punktzahl an die Überprüfungsfunktion
}
function newGame() {
    //setzt alle Punkte und Anzeigen zurück auf default
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
    splitPunkteModal.innerHTML = "";
    dealerCount = 0;
    playerCount = 0;
    splitToggle = false;
    splitBtn.style.display = "block";
    document.getElementById("doubleDown").style.display = "block";
    splitContainer.style.display = "none";
    splitContainer.style.display = "none";
    deck = [
        //laden von 6 Kartendecks in den Kartenstapel
        ...newDeck,
        ...newDeck,
        ...newDeck,
        ...newDeck,
        ...newDeck,
        ...newDeck,
    ];
    Shuffle(deck); //Mischen der Karten
    draw(); //2x Draw Funktion für die beiden Anfangskarten, die der Spieler erhält
    draw();
    splitCheck(); //Überprüfung ob die beiden Angangskarten den gleichen Wert haben und ob  damit ein Split möglich ist
    dealerCardsDraw(0); //Ziehen der ersten Karte für den Dealer
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
    splitBtn.style.display = "none";
    splitContainer.style.display = "flex";
    splitNewCard.style.display = "block";
    document.getElementById("doubleDown").style.display = "none"; //doubledown button verstecken, da split und doubleDown nicht gleichzeitig erlaubt sind
    splitToggle = true;
    playerContainer.removeChild(playerContainer.children[0]); //eine Karte vom Spieler (optisch)entfernen
    let splitCard = playerDraw.splice(0, 1)[0]; //hier diese Karte auch aus dem logischen Teil vom Spieler entfernen und dem Split-Stapel hinzufügen
    splitDraw.push(splitCard);
    let card = document.createElement("div");
    card.setAttribute("class", "card ");
    let image = document.createElement("img");
    image.setAttribute("src", splitDraw[0].image);
    card.appendChild(image);
    splitContainer.appendChild(card);
    draw(); //noch eine 2te Karte für den Standard-Spieler ziehen
    splitCardsDraw(); // eine 2te Karte für den Split-Spieler ziehen
}
function splitCheck() {
    splitBtn.style.display = "none";
    splitNewCard.style.display = "none";
    if (playerDraw[0].value === playerDraw[1].value) {
        splitBtn.style.display = "block";
    }
}
function draw() {
    splitBtn.style.display = "none"; //verstecken des Split-Buttons, da man keinen Split mehr ausführen darf, sobald man weitere arten gezogen hat
    playerCount = 0;
    let werte = deck.splice(0, 1)[0]; //eine Karte aus dem Kartenstapel "ziehen" und dem Spielerstapel hinzufügen
    playerDraw.push(werte);
    playerDraw.sort((a, b) => a.punkte - b.punkte); //Spielerstapel-Karten nach Werthöhe sortieren, damit zum Schluss die Asse richtig berechnet werden können
    let card = document.createElement("div");
    card.setAttribute("class", "card ");
    let image = document.createElement("img");
    image.setAttribute("src", werte.image);
    for (let i = 0; i < playerDraw.length; i++) {
        //hier die Überprüfung, ob ein Ass 1 oder 11 Punkte bekommt
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
    card.setAttribute = ("name", werte.suit + " " + werte.value);
    card.appendChild(image);
    playerContainer.appendChild(card);
    playerPunkte.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>"; //updaten der Spielerpunkte, die während des Spiels angezeigt werden
    playerPunkteModal.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>"; //updaten der Spielerpunkte, die zum Abschluss des Spiels angezeigt werden
}
function splitCardsDraw() {
    //funktioniert wie die Draw-Funktion, nur für den Split-Spieler
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
    //Draw-Funktion für den Dealer. Wird, bis auf die erste Karte zum Start, erst nachdem der Spieler fertig ist ausgeführt
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
        //wenn der Funktion die 0 mit übergeben wird, soll nur eine Karte gezogen werden und im Anschluss die Funktion beendet werden, ansonsten...
        return;
    }
    while (dealerCount < 17) {
        //...ruft sich die Funktion erneut selber auf bis der Dealer mindestens 16 Punkte hat.
        dealerCardsDraw(1);
    }
}
function checkWin(x) {
    // Funktion zum Überprüfen ob Dealer, Player oder beide über 21 Punkte kommen.
    if (playerCount > 21 && dealerCount <= 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Siege Dealer: " + siegeDealer;
        winMessage.innerHTML += "<p>Dealer Wins!</p>";
        modal.showModal();
    } else if (dealerCount > 21 && playerCount <= 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Siege Player: " + siegePlayer;
        winMessage.innerHTML += "<p>Player Wins!</p>";
        modal.showModal();
    } else if (playerCount === 21 && dealerCount !== 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Siege Player: " + siegePlayer;
        winMessage.innerHTML += "<p>Player Wins!</p>";
        modal.close();
        modal.showModal();
    } else if (dealerCount === 21 && playerCount !== 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Siege Dealer: " + siegeDealer;
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
    //wie CheckWin-Funktion, nur dass sie Split und Dealer vergleicht, statt Player und Dealer
    if (splitCount > 21 && dealerCount <= 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Siege Dealer: " + siegeDealer;
        winMessage.innerHTML += "<p>Dealer Wins!</p>";
    } else if (dealerCount > 21 && splitCount <= 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Siege Player: " + siegePlayer;
        winMessage.innerHTML += "<p>Split Wins!</p>";
    } else if (splitCount === 21 && dealerCount !== 21) {
        siegePlayer += x;
        playerSiege.innerHTML = "Siege Player: " + siegePlayer;
        winMessage.innerHTML = "<p>Split Wins!</p>";
    } else if (dealerCount === 21 && splitCount !== 21) {
        siegeDealer += x;
        dealerSiege.innerHTML = "Siege Dealer: " + siegeDealer;
        winMessage.innerHTML += "<p>Dealer Wins!</p>";
    } else if (splitCount === 21 && dealerCount === 21) {
        winMessage.innerHTML += "<p>Split Unentschieden!</p>";
    } else if (splitCount > 21 && dealerCount > 21) {
        winMessage.innerHTML += "<p>Split Unentschieden!</p>";
    }
}

function checkWinFertig(x, splitToggle) {
    modal.close();
    dealerCardsDraw(); //Player hat seine Spielzüge beendet, jetzt zieht der Dealer seine (restlichen) Karten
    //Da jetzt alle Spielparteien ihre finalen Karten gezogen haben, werden die Punktecounts noch einmal auf null gesetzt und ein letztes mal die genauen Punkte ausgerechnet
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
    playerPunkte.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>"; //Updaten von Punktzahlen auf dem Spielfeld und im anschließenden Modal
    playerPunkteModal.innerHTML = "<h3>Punkte Player: " + playerCount + "</h3>";
    dealerPunkteModal.innerHTML = "<h3>Punkte Dealer: " + dealerCount + "</h3>";

    if (splitToggle == true) {
        //wenn ein Split durchgeführt wurde, werden hier die Splitpunkte mit den Dealerpunkten verglichen
        splitPunkteModal.innerHTML =
            "<h3>Punkte Split: " + splitCount + "</h3>";
        if (splitCount < 21 && dealerCount < 21) {
            if (splitCount > dealerCount) {
                siegePlayer += x;
                playerSiege.innerHTML = "Siege Player: " + siegePlayer;
                winMessage.innerHTML += "<p>Split Wins!</p>";
            } else if (dealerCount > splitCount) {
                siegeDealer += x;
                dealerSiege.innerHTML = "Siege Dealer: " + siegeDealer;
                winMessage.innerHTML += "<p>Dealer Wins!</p>";
            } else if (dealerCount === splitCount) {
                winMessage.innerHTML += "<p>Split Unentschieden!</p>";
            }
        } else {
            checkWinSplit(1);
        }
    }
    if (playerCount < 21 && dealerCount < 21) {
        //vergleichen der Spielerpunkte mit den Dealerpunkten
        if (playerCount > dealerCount) {
            siegePlayer += x;
            playerSiege.innerHTML = "Siege Player: " + siegePlayer;
            winMessage.innerHTML += "<p>Player Wins!</p>";
            modal.showModal();
        } else if (dealerCount > playerCount) {
            siegeDealer += x;
            dealerSiege.innerHTML = "Siege Dealer: " + siegeDealer;
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
