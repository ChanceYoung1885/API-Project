const cardList = [];

onmessage = function(event) {
    const deck = event.data;
    // console.log(deck);
    const test = fetchDeck(deck);
    console.log(test);
    this.postMessage(test);
}

function fetchDeck(deckList) {
    // Split the list into an array with each card acting as a component
    const lines = deckList.trim().split('\n');
    console.log(lines);

    const fullDeck = [];

    // Function to set the API url
    function createScryfallURL(name, set) {
        const encodedName = encodeURIComponent(name);
        const encodedSet = encodeURIComponent(set);
        return `https://api.scryfall.com/cards/named?exact=${encodedName}&set%3A${encodedSet}`;
    }
    // Regular expression to make 3 groups (quantity, name, and set code)
        // (\d+)            - This grabs the numbers at the beginning and captures it as a group using the parentheses
        // x\s+             - This grabs the x after the quantity and any blank spaces
        // (.*?)            - This grabs any number of the characters following the previous grab and captures it as another group
        // \s+\((.*?)\)     - This grabs the parentheses and everything in it but only captures the set code inside the parentheses
    
    const regex = /(\d+)x\s+(.*?)\s+\((.*?)\)/;

    // Processing each card
    lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
            // Taking the necessary components from each card
            const quantity = parseInt(match[1], 10);
            const name = match[2];
            const set = match[3] || ''; // Setting the default to blank if there isn't one provided

            // Check if it is a commander card (True/False)
            const isCmdr = line.toLowerCase().includes('*cmdr*');

            const url = createScryfallURL(name, set)

            fullDeck.push([quantity, name, set, isCmdr, url])
        }
    });

    return fullDeck;
}
