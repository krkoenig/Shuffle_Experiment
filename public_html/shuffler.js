// Shuffles the deck array into piles then rebuilds the deck.
// The shuffle uses the following order.
// 1st : pile 1 -> 2nd : pile 2 -> ... -> numPiles : pile numPiles 
// -> numPiles + 1 : pile numPiles + 1 -> ... repeat until deck is empty.
// Once empty, pile 1 goes on top of pile 2, and pile 1+2 goes on top
// of pile 3, etc.
// The algorithm performs in O(n^m) where n is the deck size and m is the pile size.
// While this algorithm is quite slow, efficiency isn't the goal. The algorithm
// replicates the process of pile shuffling a deck of cards which takes a number of actions
// equal to the algorithm's run time.
function pileShuffle(deck, numPiles) {
    if (arguments.length == 1) {
        var numPiles = parseInt(document.getElementById("numPiles").value);
        if (isNaN(numPiles) || numPiles <= 0) {
            var shuffleText = document.getElementById("shuffleText");
            shuffleText.innerHTML = "The number of piles entered is not a number greater than 0!";
            return;
        }
    }


    var piles = [];

    for (var i = 0; i < numPiles; i++) {
        piles.push([]);
    }

    var pileCounter = 0;

    // Sort into piles
    for (var i = 0; i < deck.length; i++) {
        if (pileCounter === numPiles) {
            pileCounter = 0;
        }
        piles[pileCounter].unshift(deck[i]);
        pileCounter++;
    }

    deck = [];

    // Combine piles 
    for (var i = 0; i < numPiles; i++) {
        for (var j = 0; j < piles[i].length; j++) {
            deck.push(piles[i][j]);
        }
    }

    return deck;
}

function idealPileShuffle() {
    var deckSize = parseInt(document.getElementById("deckSize").value);
    var shuffleText = document.getElementById("shuffleText");
    if (isNaN(deckSize) || deckSize <= 0) {
        shuffleText.innerHTML = "The size of the deck entered isn't a number greater than 0!";
        return;
    }

    var deck = [];

    for (var i = 0; i < deckSize; i++) {
        deck.push(i);
    }

    var counter = 0;
    var bestNumPiles = 0;
    var bestCounter = 9999;

    // Only check for up to the number of cards in the deck as
    // piles = deck size will always be 1.
    for (var i = 2; i < deckSize; i++) {
        do {
            deck = pileShuffle(deck, i);
            counter++;
        } while (!sorted(deck));

        if (counter < bestCounter) {
            bestNumPiles = i;
            bestCounter = counter;
        }
        counter = 0;
    }

    shuffleText.innerHTML = "Using " + bestNumPiles + " piles, repeating the pile shuffle ";
    shuffleText.innerHTML += bestCounter;
    shuffleText.innerHTML += " times will result in a deck identical to the starting deck.";
}

// Shuffles the deck array using a top-bottom-top shuffling technique.
// The first card is placed into a pile. The second card goes to the top of the stack.
// The third to the bottom. And so on and so forth. 
// The algorithm runs in O(n) time.
function topBottomTopShuffle(deck) {
    var pile = [];
    var front = true;

    pile.unshift(deck[0]);

    for (var i = 1; i < deck.length; i++) {
        if (front) {
            pile.unshift(deck[i]);
        } else {
            pile.push(deck[i]);
        }

        front = !front;
    }

    deck = pile;

    return deck;
}

// The central loop for the experiment when using a non-pile shuffle.
// Recieves the shuffle type as a parameter and runs
// it based on the size of the deck inputted by the user.
function shuffleLoop(shuffleFunction) {
    var deckSize = parseInt(document.getElementById("deckSize").value);
    var shuffleText = document.getElementById("shuffleText");
    if (isNaN(deckSize) || deckSize <= 0) {
        shuffleText.innerHTML = "The size of the deck entered isn't a number greater than 0!";
        return;
    }

    var deck = [];

    for (var i = 0; i < deckSize; i++) {
        deck.push(i);
    }

    var counter = 0;

    do {
        deck = shuffleFunction(deck);
        counter++;
    } while (!sorted(deck));

    switch (shuffleFunction) {
        case topBottomTopShuffle:
            shuffleText.innerHTML = "Using the the Top-Bottom-Top shuffle, after ";
            shuffleText.innerHTML += counter;
            shuffleText.innerHTML += " complete repitions, the deck will be identical to the starting deck";
            break;
        case pileShuffle:
            var numPiles = parseInt(document.getElementById("numPiles").value);
            shuffleText.innerHTML = "Using " + numPiles + " piles, repeating the pile shuffle ";
            shuffleText.innerHTML += counter;
            shuffleText.innerHTML += " times will result in a deck identical to the starting deck.";
            break;
    }

}

// Checks to see if the deck is sorted.
function sorted(deck) {
    for (var i = 0; i < deck.length; i++)
    {
        if (deck[i] > deck[i + 1]) {
            return false;
        }
    }

    return true;
}
