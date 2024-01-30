// Establish web worker
const deckDisplay = new Worker("worker.js")
// Setting constants for html elements
    // Search button
const search = document.getElementById('search-button');
    // Results div
const results = document.getElementById('results');
    // Search input
const deckList = document.getElementById('deck-list');
// Setting changing variables
    // API endpoint w/final input variable
var url = '';
    // Final API input
var endpoint = '';

search.onclick =function() {
    deckDisplay.postMessage(deckList.value);
}

deckDisplay.onmessage = (e) => {
    const fullDeck = e.data;
    console.log(fullDeck)
}