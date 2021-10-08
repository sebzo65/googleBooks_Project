//Creating a webpage that will generate search results using the
//Google Books API. Search bar allows you to input name of book
//title and generate related results
const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1";
// const API_KEY = "AIzaSyAMEi906J-DHStLcqJiufqDca-ln-G9sSo";

//Async/Await function with fetch that tells JS that the data will be retrieved to be rendered on the webpage,
//but that there is no guarantee that it will arrive, or set time in which it will arrive
const getBooks = async (searchTerm) => {
  const response = await fetch(`${GOOGLE_BOOKS_URL}/volumes?q=${searchTerm}`);
  const data = await response.json();
  console.log(data);
  return data.items; //.items refers to name of the object holding the data in the API
};

//Add EventListener for the button which will trigger the API & return search results
const searchButton = document.querySelector(".searchForm__button");
searchButton.addEventListener("click", async (e) => {
  const searchInput = document.querySelector(".searchForm__input");
  const searchTerm = searchInput.value; //Here the input value (book title)
  //typed by the user will be appended to API URL in order to find search results
  if (searchTerm === "") {
    //If no user input then alert
    alert("Please enter a valid book title");
    return;
  }

  const booksArr = await getBooks(searchTerm);
  //Create h2 element for titles of each book and render them in their respective grids
  const bookSearchItems = booksArr.map((book) => {
    //Creating div element that will hold all of the Google Books data user needs
    const bookContainer = document.createElement("div");

    //Creating heading that will contain title of books
    const titleElement = document.createElement("h2");
    const titleText = `${book.volumeInfo.title}`;
    const titleTextNode = document.createTextNode(titleText);

    //Creating smaller heading that will contain name of author for each book
    const authorElement = document.createElement("h4");
    const authorText = `${book.volumeInfo.authors}`;
    const authorTextNode = document.createTextNode(authorText);

    //Creating img tag that will contain image for each book
    const imageElement = document.createElement("img");
    imageElement.src = `${book.volumeInfo.imageLinks.thumbnail}`;

    //Creating paragraph that will contain description for each book
    const descriptionElement = document.createElement("p");
    const descriptionText = `${book.volumeInfo.authors}`;
    const descriptionTextNode = document.createTextNode(descriptionText);
    console.log(book);

    //Appending text elements to their parent HTML holder
    titleElement.appendChild(titleTextNode);
    authorElement.appendChild(authorTextNode);
    descriptionElement.appendChild(descriptionTextNode);

    //Appending the individual elements(text, author, description, image) to a parent container
    bookContainer.appendChild(titleElement);
    bookContainer.appendChild(authorElement);
    bookContainer.appendChild(descriptionElement);
    bookContainer.appendChild(imageElement);
    return bookContainer;
  });
  const bookGridItems = document.querySelector(".container__bookGrid");
  const append = (parent) => (child) => parent.appendChild(child);
  bookSearchItems.forEach(append(bookGridItems));
});

// const getBooks = async (searchTerm) => {
//   const infoArr = info.map((n) => {
//     const bookObject = {
//       title:
//         n.volumeInfo?.title ?? "You sure you got the right title there buddy?",
//       author:
//         n.volumeInfo?.author ??
//         "Either you don't know what you're typing or I ain't a good searchbar. Author unknown",
//       description:
//         n.volumeInfo?.description ??
//         "I literally have no words (and no description) for this book",
//       img: n.volumeInfo.imageLinks?.thumbnail ?? "../img/default-bookCover.jpg",
//     };
//     return bookObject;
//   });
//   return infoArr;
// };

const getTitle = (data) => {
  const bookTitle = data.items[0].volumeInfo.title;
  console.log(bookTitle);
  console.log(data.items.length);
  return bookTitle;
};
