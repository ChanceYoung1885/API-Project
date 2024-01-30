// Setting constants for html elements
    // Search button
const search = document.getElementById('search-button');
    // Main image
const mainImg = document.getElementById('main-image');
    // Results div
const results = document.getElementById('results');
    // Search input
const cardInput = document.getElementById('card-name');
    // Set
const setInput = document.getElementById('set-code');
    // CMC
// const cmc = document.getElementById('mana-cost');
    // Order of results
const listInput = document.getElementById('order');
// Setting changing variables
    // API endpoint w/final input variable
var url = '';
    // Final API input
var endpoint = '';


    // Possible search functions
        // Function to search by card name
function newCard() {
    // Set a cardName variable to the value of the card name input
    cardName = (cardInput).value;
};
        // Function to search by set
function newSet() {
    // Set a setCode variable to the value of the set code input
    setCode = (setInput).value;
};
        // Function for ordering the results
function setOrder() {
    // Set a list order variable to the value of the order input
    listOrder = (listInput).value;
};


cardInput.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        displayResults();
    }
})

setInput.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        displayResults();
    }
})

search.onclick = function() {
    displayResults();
};

    // Function to set the endpoint
function setEndpoint() {
        //  Update input values
    newCard();
    newSet();
    setOrder();
        // Check if anything was empty
    if (!cardName) {
        if (!setCode) {
            window.alert('Please enter a card name or set.');
            endpoint = '';
        } else {
            endpoint = `${listOrder + '&q=e%3A' + setCode}`;
        };
    } else {
        if (!setCode) {
            endpoint = `${listOrder + '&q=' + cardName}`;
        } else {
            endpoint = `${listOrder + '&q=' + cardName + '+s%3A' + setCode}`;
        };
    };
    url = `https://api.scryfall.com/cards/search?order=${endpoint}`;
};

// Function to display list of cards that fit the search in the results div
function displayResults() {
    // Set endpoint function
    setEndpoint();
    // Quick if else to do nothing but log in the console if there was no input
    if(!endpoint) {
        console.log('no input');
    } else {
        // Fetch the url for the search
        fetch(url)
            // Then turn that response into json
            .then(response => {
                if (!response.ok){
                    window.alert("Looks like there's no match to your search.")
                };
                return response.json();
            })
            // Then use that data, or list of cards in json format, and use a for each loop to grab the necessary info (name, set, small image)
            .then(data => {
                console.log(data);
                const resultsData = JSON.parse(JSON.stringify(data.data));
                // Remove all previous results
                results.innerHTML = '';
                // For each result, create a div with a set id for automatic styling
                resultsData.forEach(element => {
                    if(resultsData.indexOf(element)<42) {
                        if(!element.image_uris){
                            console.log('result skipped')
                        } else {

                            // Create div element in the results div
                            const div = document.createElement('div');
                            div.id = 'result-item';
                            div.addEventListener('click' , function() {
                                setMainImage(element.image_uris.normal);
                            })
                            // Create elements for the following; image(onclick function?), name, set
                            const resultImg = document.createElement('img');
                            resultImg.id = 'result-image';
                            resultImg.src = element.image_uris.normal;
                            resultImg.alt = element.name;

                            const resultName = document.createElement('p');
                            resultName.id = 'result-name';
                            resultName.textContent = element.name;

                            const resultSet = document.createElement('p');
                            resultSet.id = 'result-set';
                            resultSet.textContent = (element.set).toUpperCase();

                            div.appendChild(resultImg);
                            div.appendChild(resultName);
                            div.appendChild(resultSet);

                            results.appendChild(div);
                        };
                    };
                });
            })
            .catch(error => {
                console.error('Fetch error:' , error);
            });
            // Maybe stop after 20?
        // Finally run that info through a function to put it into the results div
    }
}

// Function to change the display image to the card selected from the table
function setMainImage(srcUrl) {
    // Set the src attribute for the main image to a url variable 
    mainImg.src = srcUrl;
}