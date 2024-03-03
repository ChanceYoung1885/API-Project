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
    console.log(fullDeck);
    displayCmdrDeck(fullDeck);
}

function displayCmdrDeck(deck) {
    // Clear previous results
    results.innerHTML = '';
    deck.forEach(card => {
        url = card[4];
        fetch(url)
        .then(response => {
            if (!response.ok){
                window.alert("Looks like there's no match to your search.")
            };
            return response.json();
        })
        .then(data => {

            // If the card is a commander
            if (card[3]) {
                // console.log(result);
                const imageURI = data.image_uris.normal
                console.log(imageURI)
    
                // Create a div element for it
                const div = document.createElement('div');
                div.id = 'commander-card';

                // Create the necessary elements
                const cardImg = document.createElement('img');
                cardImg.id = 'commander-image';
                cardImg.src = imageURI;
                cardImg.alt = card[1];

                const cardName = document.createElement('p');
                cardName.id = 'commander-name'
                cardName.textContent = card[1];

                const cardSet = document.createElement('p');
                cardSet.id = 'commander-set'
                cardSet.textContent = (card[2]).toUpperCase();

                div.appendChild(cardImg);
                div.appendChild(cardName);
                div.appendChild(cardSet);

                results.appendChild(div);
            } else {
                // console.log(result);
                const imageURI = data.image_uris.normal
                console.log(imageURI)
    
                // Create a div element for it
                const div = document.createElement('div');
                div.id = 'card';

                // Create the necessary elements
                const cardImg = document.createElement('img');
                cardImg.id = 'card-image';
                cardImg.src = imageURI;
                cardImg.alt = card[1];

                const cardName = document.createElement('p');
                cardName.id = 'card-name'
                cardName.textContent = card[1];

                const cardSet = document.createElement('p');
                cardSet.id = 'card-set'
                cardSet.textContent = (card[2]).toUpperCase();

                div.appendChild(cardImg);
                div.appendChild(cardName);
                div.appendChild(cardSet);

                results.appendChild(div);
            }
            
        })
    });
}
