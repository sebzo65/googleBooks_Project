// const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1";
// // const API_KEY = "AIzaSyAMEi906J-DHStLcqJiufqDca-ln-G9sSo";

// //Async/Await function with fetch that tells JS that the data will be retrieved to be rendered on the webpage,
// //but that there is no guarantee that it will arrive, or set time in which it will arrive
// const getBooks = async (titleBook) => {
//   const response = await fetch(`${GOOGLE_BOOKS_URL}/volumes?q=${titleBook}`);
//   const data = await response.json();
//   return data.items; //.items refers to name of the object holding the data in the API
// };

// //Add EventListener for the button which will trigger the API & return search results
// const searchButton = document.querySelector(".searchForm__button");
// searchButton.addEventListener("click", async (e) => {
//   const searchInput = document.querySelector(".searchForm__input");
//   const titleBook = searchInput.value; //Here the input value (book title)
//   //typed by the user will be appended to API URL in order to find search results
//   if (typeof titleBook === "") {
//     //If no user input then alert
//     alert("Please enter a valid book title");
//     return;
//   }

//   let list = await getBooks(titleBook);

// const getChildElements = booksArr((book) => {
//     for (i=0; i < 8; i++) {
//         return book.volumeInfo.title;
//     }
// })

function limitDesc() {
    let desc = book.volumeInfo.description; 
    maxLength(desc) === 50;
