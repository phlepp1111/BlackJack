<h2 style="text-align: center;">BlackJack</h2>

---

Das Projekt ist ein SinglePlayer BackJack-Spiel bei dem ein Spieler gegen einen Dealer spielt und probiert durch ziehen von Karten auf oder möglichst nah an 21 Punkte heranzukommen ohne diese zu überschreiten.

Der Spieler startet mit 2 Karten und kann sich entscheiden noch mehr Karten zu ziehen oder das Spiel zu beenden ("stand") und die Punkte auszuzählen. Nachdem der Spieler sich entschieden hat Spiel zu beenden, zieht der Dealer seine Karten um möglichst nah an 21 Punkte heranzukommen. Dieser zieht so lange neue Karten bis er mindestens einen Punktewert von 16 erreicht hat. Ab diesem Punkt zieht er keine weitere Karte.

Im Anschluss werden die Punkte des Spielers und die des Dealers jeweils zusammen gezählt und je nachdem, wer näher an den 21 Punkten ist, ohne diese zu überschreiten, hat gewonnen.

Wenn der Punktestand gleich ist, oder beide Spieler über 21 Punkte kommen, gilt das Spiel als unentschieden.

Der Spieler hat die Möglichkeit, anstatt einfach eine weitere Karte zu ziehen, die DoubleDown-Funktion zu wählen, bei welcher er noch exakt eine Karte zieht und anschließend direkt zum Punktezählen übergeht. Wenn er gewinnt, bekommt er in dieser Variante die doppelte Punktzahl, wenn er verliert, bekommt der Dealer die doppelte Puntzahl.

Wenn die ersten beiden, vom Spieler gezogenen, Karten den selben Wert haben (z.B. 2 Buben oder 2 7-er), gibt es die Möglichkeit zu splitten und der Spieler spielt mit 2 Kartendecks gegen den Dealer. In diesem Fall werden die beiden Karten auf die beiden neu entstandenen Stapel aufgeteilt und jeweils eine weitere Karte dazu gezogen, damit man wieder auf 2 Anfangskarten kommt. Wurde bereits eine weitere Karte gezogen, bereits ein Split durchgeführt oder die doubleDown-Funktion gewählt ist kein weiterer Split möglich. Die Siege und Niederlagen des durch das Splitten entstandenen neuen Spielers werden ganz normal als Siege oder Niederlage des Spielers gewertet.

Gewonnen hat am Schluss wer die meisten Siege erreicht hat.

---

Das Spiel wurde in Vanilla JavaScript, HTML und CSS geschrieben.

Karten-Grafiken von Byron Knoll, [Vector Playing Cards](https://code.google.com/archive/p/vector-playing-cards/)
