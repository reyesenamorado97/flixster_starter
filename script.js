// Confirm that page has loaded properly
console.log("Page Loaded")
console.log(`homePageIsLoaded =  ${homePageIsLoaded}`)

const apiKey = "efb912c896a5b0234aa26ee9ab09ff8e"
const limit = 9 // max number of objects to return


// Variable Declaration
var collections = 0; // Set of 9 gifs loaded for an instance
var pages = 1;
var homePageIsLoaded = false;
var text = document.getElementById("modal-text");

console.log(`homePageIsLoaded =  ${homePageIsLoaded}`)

// DOM References
const form = document.getElementById("form");
const searchText = document.getElementById('search-input');
const gifArea = document.getElementById('movie-area');
const moreButton = document.getElementById('load-more-movies-btn');
const gallery = document.querySelector(".gallery");
const movieContents = document.querySelector(".movie-contents");
const movieImage = document.querySelector(".pic")
const clearButton = document.querySelector("#close-search-btn")

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
moreButton.addEventListener('click', displayMoreResults);
clearButton.addEventListener('click', clearSearch);

async function clearSearch () {

    location.reload()
}

  function displayResults(movies) {

    movies.forEach(function(element) {

        console.log(homePageIsLoaded)
        if (homePageIsLoaded == true){
            gallery.innerHTML += generateHTML(element,element.id)
        }
        else if (homePageIsLoaded == false) {
            gallery.innerHTML += generateHTML(element,element.id)
        }
    });
}

function generateHTML(element, id) {

    return ` <div class = "movie-card popup zoom" onclick="displayInfo(${id})">
          <img  id="movie-poster" class="movie-poster" src = "https://image.tmdb.org/t/p/w500/${element.poster_path}" alt = "Poster for ${element.original_title}" class = "movie-img">
          <div id="movie-title" class="movie-info"> 
            <p>
            <span class="thin">⭐&nbsp;${element.vote_average} / 10</span>
                 <br>
                ${element.title} </p>
                
            </div>
            <br><br>
          </div>`;
  }

// Get the modal
var modal = document.getElementsByClassName("modal-content");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    console.log("Closing")
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    console.log("Closing")

    modal.style.display = "none";
  }
}

  function displayInfo(id) {


    console.log("Pressed movie ID:" + id)
    modal.style.display = 'block';

  }


async function handleFormSubmit(evt) {

    // Required to update the page with API results
    evt.preventDefault();

    console.log("Preparing handling...")

    // Catch invalid input
    if ( searchText.value == '') {
        alert("Invalid Request!")
    }
    else{

        homePageIsLoaded = false;
    const data = await getResults(searchText.value);

    gallery.innerHTML = ``

    displayResults(data);

    collections++;
    }
}

async function displayMoreResults(evt) {

    evt.preventDefault();

    if (homePageIsLoaded == false){
    // Call getResults to pull more gifs
    const data = await getResults(searchText.value);

    // Display those new gifs
    displayResults(data);
    }

    else {
        pages+=1;
// Switch URL to pull trending results
const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`);
const responseData = await response.json();

// Confirm that we have pulled some object from API
console.log(`${responseData.results}`)

displayResults(responseData.results)    }
    console.log(searchText.value)
    
    collections++;
}

// Use API to pull results from search
async function getResults(searchTerm) {

    const offset = collections * limit;

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`);
    const responseData = await response.json();

    // Confirm that we have pulled some object from API
    console.log(`${responseData.results}`)

    return responseData.results;
}

// Executes when page is first loaded
window.onload = async function home () {

    homePageIsLoaded = true
    // execute your functions here to make sure they run as soon as the page loads
    const offset = collections * limit;

    // Switch URL to pull trending results
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`);
    const responseData = await response.json();

    // Confirm that we have pulled some object from API
    console.log(`${responseData.results}`)

    displayResults(responseData.results)
  }