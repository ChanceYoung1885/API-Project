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

// onmessage = function(event){
//     const deck = event.data
//     splitDeck(deck);
// }

// function splitDeck(deckList) {
//     // Using regular expression to split the string
//     // The pattern looks for a space followed by a digit and 'x'
//     const regex = / (?=\dx)/;
//     const separatedCards = deckList.split(regex);
//     // console.log('separatedCards')
//     // console.log(separatedCards)

//     // Format cards by removing quantity of cards and cmdr tag if necessary
//     const formattedCards = separatedCards.map(element => {
//         const pieces = element.split(' '); // Splits each card element into pieces
//         // console.log('pieces');
//         // console.log(pieces);
//         pieces.shift(); // Remove quantity
//         if(pieces[pieces.length - 1] == '*CMDR*') {
//             pieces.pop(); // If the card is a commander it will remove the commander tag
//         }
//         const joinedParts =  pieces.join(' ');
//         // console.log('joinedParts');
//         // console.log(joinedParts);
//         const nameAndCode = joinedParts.split('('); // Splitting by '('
//         nameAndCode[1] = nameAndCode[1].slice(0, -1); // Removing the closing ')'
//         return [nameAndCode[0].trim(), nameAndCode[1].trim()];
//     });
//     // console.log('formattedCards');
//     console.log(formattedCards);

//     // Adding keys to make them easier to refer to
//     const keyedArray = formattedCards.map(subArray => ({
//         name: subArray[0],
//         set: subArray[1]
//     }));
//     // console.log('keyedArray');
//     console.log(keyedArray);

//     const cardPromises = keyedArray.map(card => fetchCard(card.name, card.set));
//     Promise.all(cardPromises)
//     .then(results => {
//         // results.forEach(result => cardList.push(result));
//         console.log(cardList);
//         postMessage(cardList);
//     })
// }

// function fetchCard(cardName, setCode) {
//     if(setCode.match(/:/)) {
//         console.log(setCode)
//         const specCard = setCode.split(':')
//         console.log(specCard);
//         const newSet = {
//             set: specCard[0],
//             cardNum: specCard[1]
//         }
//         console.log(newSet);
//         fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&set=${encodeURIComponent(newSet.set)}&collector_number=${encodeURIComponent(newSet.cardNum)}`)
//         .then(response => {
//             if (!response.ok) {
//             throw new Error(`Error fetching card: ${cardName} from set: ${setCode}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const cardInfo = [data.image_uris.normal, data.name, (data.set).toUpperCase()];
//             // console.log('cardInfo');
//             // console.log(cardInfo);
//             return cardInfo;
//         })
//         .then(data => {
//             cardList.push(data);
//         })
        
//         // console.log(specCard);
//     } else {
//         fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&set=${encodeURIComponent(setCode)}`)
//         .then(response => {
//             if (!response.ok) {
//             throw new Error(`Error fetching card: ${cardName} from set: ${setCode}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const cardInfo = [data.image_uris.normal, data.name, (data.set).toUpperCase()];
//             // console.log('cardInfo');
//             // console.log(cardInfo);
//             return cardInfo;
//         })
//         .then(data => {
//             cardList.push(data);
//         })
//     }
// }
