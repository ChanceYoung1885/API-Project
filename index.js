// const apiEndpoint = "https://api.scryfall.com"
const search = document.getElementById('search-button')
const newImage = document.getElementById('result-image')

// function changeImage(newUrl) {
//     newImage.src = newUrl;
// }

function changeImage() {
    let urlString = imageUrl; // Example URL with extra quotation marks
    urlString = urlString.replace(/"/g, ''); // Removes all instances of the quotation mark
    newImage.src = urlString;
}

// Replace 'CardName' with the actual name of the card you're searching for

function newCard() {
    cardName = (document.getElementById('card-name')).value; 
    url = `https://api.scryfall.com/cards/search?q=${cardName}`;
}

// On click function for grabbing an image from a single card
search.onclick = function() {
    cardSearch();
};
function cardSearch() {
    newCard();
    if(!cardName){
        console.log('sorry no card')
    } else {
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            const stringData = data;
            const list = JSON.parse(JSON.stringify(stringData.data));
            console.log(list)
            // Separating them into individual items
            list.forEach(element => {
                if(list.indexOf(element)<20){
                    // For the first 20 it'll run the code below
                    // This just console logs the name of the card
             const name = JSON.parse(JSON.stringify(element.name))
             console.log(name);   
                    // Gotta change it to the whole table thing
                }
            });
    
            
            // const image = newResults.image_uris;
            // imageUrl = JSON.stringify(image.normal);
            // console.log(imageUrl);
            // changeImage(imageUrl);
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
        
    }
}

