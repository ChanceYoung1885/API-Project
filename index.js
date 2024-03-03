const cardList = [];

onmessage = function(event){
    const deck = event.data
    splitDeck(deck);
}

function splitDeck(deckList) {
    // Using regular expression to split the string
    // The pattern looks for a space followed by a digit and 'x'
    const regex = / (?=\dx)/;
    const separatedCards = deckList.split(regex);
    // console.log(separatedCards)

    // Format cards by removing quantity of cards and cmdr tag if necessary
    const formattedCards = separatedCards.map(element => {
        const pieces = element.split(' '); // Splits each card element into pieces
        // console.log(pieces);
        pieces.shift(); // Remove quantity
        if(pieces[pieces.length - 1] == '*CMDR*') {
            pieces.pop(); // If the card is a commander it will remove the commander tag
        }
        const joinedParts =  pieces.join(' ');
        // console.log(joinedParts);
        const nameAndCode = joinedParts.split('('); // Splitting by '('
        nameAndCode[1] = nameAndCode[1].slice(0, -1); // Removing the closing ')'
        return [nameAndCode[0].trim(), nameAndCode[1].trim()];
    });
    // console.log(formattedCards);

    // Adding keys to make them easier to refer to
    const keyedArray = formattedCards.map(subArray => ({
        name: subArray[0],
        set: subArray[1]
    }));
    // console.log(keyedArray);

    const cardPromises = keyedArray.map(card => fetchCard(card.name, card.set));
    Promise.all(cardPromises)
    .then(results => {
        console.log(cardList);
        postMessage(cardList);
    })
}

function fetchCard(cardName, setCode) {
    if(setCode.match(/:/)) {
        // console.log(setCode)
        const specCard = setCode.split(':')
        // console.log(specCard);
        // console.log(specCard);
        specCard.map(setCodes => ({
            set: setCodes[0],
            cardNum: setCodes[1]
        }))
        // console.log(specCard);
    } else {
        fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&set=${encodeURIComponent(setCode)}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error fetching card: ${cardName} from set: ${setCode}`);
            }
            return response.json();
        })
        .then(data => {
            const cardInfo = [];
            cardInfo.push(data.image_uris.normal)
            cardInfo.push(data.name);
            cardInfo.push((data.set).toUpperCase());
            return cardInfo;
        })
        .then(data => {
            cardList.push(data)
            console.log(data)
            return data;
        })
    }
}

function displayDeck() {

}
