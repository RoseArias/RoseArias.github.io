document.querySelector("#author-id").addEventListener("click", displayAuthorBio);


//set background image from api
//displayBackground();
displayRandomQuote();
async function displayBackground() {
  let background = document.querySelector('#background');

  let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers";
  let response = await fetch(url);
  let data = await response.json();
  if (!data) {
    return;
  }

  //picks random background
  let image = _.shuffle(data.hits);
  background.style.backgroundImage = `url("${image[0].largeImageURL}")`;
}

async function displayRandomQuote(){
  let quote = document.querySelector('#main-qoute');
  let author = document.querySelector('#main-author');
  let bio = document.querySelector('#bio-div');
  bio.setAttribute('style', 'display: none !important');


  let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
  let response = await fetch(url);
  let data = await response.json();
  if (!data) {
    return;
  }
  quote.innerHTML = `"${data.quoteText}"`;
  author.innerHTML = `- ${data.firstName} ${data.lastName}`

  bio.innerHTML = `<div><p> ${data.bio} </p></div><div><img src="${data.picture}" width=200px hight=300px></div>`


}

//global var to track if element is shown or not.
let shown = false;
async function displayAuthorBio(){
  let bio = document.querySelector('#bio-div');
  console.log(shown);
  if(shown){
    bio.setAttribute('style', 'display: none !important');
    shown = false;
  }else{
    bio.setAttribute('style', '');
    shown = true;
  }
}