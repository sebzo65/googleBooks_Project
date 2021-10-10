//Creating a webpage that will generate search results using the
//Google Books API. Search bar allows you to input name of book
//title and generate related results
const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1";
// const API_KEY = "AIzaSyAMEi906J-DHStLcqJiufqDca-ln-G9sSo";
const gridContainer = document.querySelector(".container__bookGrid");
const gridBox1 = document.querySelector("#container__bookGrid--box1");
const loading = document.querySelector(".loading");

loading.style.display = "none";
//Async/Await function with fetch that tells JS that the data will be retrieved to be rendered on the webpage,
//but that there is no guarantee that it will arrive, or set time in which it will arrive
const getBooks = async (searchTerm) => {
  const response = await fetch(`${GOOGLE_BOOKS_URL}/volumes?q=${searchTerm}`);
  if (!response) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data.items; //.items refers to name of the object holding the data in the API
};

//Get default values when data for book not available
// const getDefault = async (data) => {
//   const info = await getBooks(data);
//   const infoArr = info.map((n) => {
//     const title =
//       n.volumeInfo?.title ?? "You sure you got the right title there buddy?";
//     const authors =
//       n.volumeInfo?.authors ??
//       "Either you don't know what you're typing or I ain't a good searchbar. Author unknown";
//     // const description =
//     //   n.volumeInfo?.description ??
//     //   "I literally have no words (and no description) for this book";
//     const img =
//       n.volumeInfo.imageLinks?.thumbnail ?? "../img/default-bookCover.jpg";
//     const readMore =
//       book.volumeInfo?.previewLink ?? "Sorry, can't take you there buddy";

//Add EventListener for the button which will trigger the API & return search results
const searchButton = document.querySelector(".searchForm__button");
searchButton.addEventListener("click", async (e) => {
  const searchInput = document.querySelector(".searchForm__input");
  const searchTerm = searchInput.value; //Here the input value (book title)
  //typed by the user will be appended to API URL in order to find search results
  if (searchTerm === "" || searchTerm === null) {
    //If no user input then alert
    alert("Please enter a valid book title");
    return;
  }

  const booksArr = await getBooks(searchTerm);
  //Create h2 element for titles of each book and render them in their respective grids
  const bookSearchItems = booksArr.map((book) => {
    gridBox1.innerHTML += `
    <div class="column">
      <div class="card">
         <h2 class="bookTitle" "${book.volumeInfo.title}>
         <h4 class="bookAuthor" "${book.volumeInfo.authors}>
        <div class="card-image">
          <figure class="image">
            <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="Placeholder image">
          </figure>
        </div>
      </div>
    </div>
    `;

    const columnElement = document.createElement("div");
    columnElement.classList.add("column");

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    columnElement.appendChild(cardElement);

    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("bookTitle");
    bookTitle.src = book.volumeInfo.title;
    cardElement.appendChild(bookTitle);

    const bookAuthor = document.createElement("h4");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.src = book.volumeInfo.authors;
    bookTitle.appendChild(bookAuthor);

    const cardImageElement = document.createElement("div");
    cardImageElement.classList.add("card-image");
    bookAuthor.appendChild(cardImageElement);

    const figureElement = document.createElement("figure");
    figureElement.classList.add("image");
    cardImageElement.appendChild(figureElement);

    const imageElement = document.createElement("img");
    imageElement.src = book.volumeInfo.imageLinks.thumbnail;
    figureElement.appendChild(imageElement);

    gridBox1.appendChild(columnElement);
  });
  loading.style.display = "none";
});

//     //Creating div element that will hold all of the Google Books data user needs
//     const bookContainer = document.createElement("div");

//     //Creating heading that will contain title of books
//     const titleElement = document.createElement("h2");
//     const titleText = `${book.volumeInfo.title}`;
//     const titleTextNode = document.createTextNode(titleText);

//     //Creating smaller heading that will contain name of author for each book
//     const authorElement = document.createElement("h4");
//     const authorText = `${book.volumeInfo.authors}`;
//     const authorTextNode = document.createTextNode(authorText);

//     //Creating img tag that will contain image for each book
//     const imageElement = document.createElement("img");
//     imageElement.src = `${book.volumeInfo.imageLinks.thumbnail}`;

//     //Creating paragraph that will contain description for each book
//     const descriptionElement = document.createElement("p");
//     const descriptionText = `${book.volumeInfo.description}`;
//     const descriptionTextNode = document.createTextNode(descriptionText);
//     console.log(book);

//     //Appending text elements to their parent HTML holder
//     titleElement.appendChild(titleTextNode);
//     authorElement.appendChild(authorTextNode);
//     descriptionElement.appendChild(descriptionTextNode);
//     //Appending the individual elements(text, author, description, image) to a parent container
//     bookContainer.appendChild(titleElement);
//     bookContainer.appendChild(authorElement);
//     bookContainer.appendChild(descriptionElement);
//     bookContainer.appendChild(imageElement);
//     return bookContainer;
//   });
//   const append = (parent) => (child) => parent.appendChild(child);
//   bookSearchItems.forEach(append(gridContainer));
// });

// const getTitle = (data) => {
//   const bookTitle = data.items[0].volumeInfo.title;
//   console.log(bookTitle);
//   console.log(data.items.length);
//   return bookTitle;
// };
