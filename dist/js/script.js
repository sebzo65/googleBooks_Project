const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1";

//Async/Await function with fetch that tells JS that the data will be retrieved to be rendered on the webpage,
//but that there is no guarantee that it will arrive, or set time in which it will arrive
const getBooks = async (searchTerm) => {
  const response = await fetch(
    `${GOOGLE_BOOKS_URL}/volumes?q=${searchTerm}&maxResults=3`
  );
  const data = await response.json();
  return data.items; //.items refers to name of the object holding the data in the API
};
//Add EventListener for the button which will trigger the API & return search results
const searchButton = document.querySelector(".searchForm__searchButton");
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
  const bookSearchItems = booksArr.map((book) => {
    const bookObject = {
      title:
        book.volumeInfo?.title ??
        "You sure you got the right title there buddy?",
      authors:
        book.volumeInfo?.authors ??
        "Either you don't know what you're typing or I ain't a good searchbar. Author unknown",
      description:
        book.volumeInfo?.description ??
        "I literally have no words (and no description) for this book",
      img:
        book.volumeInfo.imageLinks?.thumbnail ?? "../img/default-bookCover.jpg",
    };
    //Creating div element that will hold all of the Google Books data user needs
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("bookContainer");
    let bookContainerContent = document.createTextNode(
      `Title: ${bookObject.title}
      Author/s: ${bookObject.authors}`
    );

    bookContainer.appendChild(bookContainerContent);

    let imageElement = document.createElement("img");
    imageElement.src = bookObject.img;
    bookContainer.appendChild(imageElement);

    let bookDesc = document.createElement("div");
    let bookDescText = document.createTextNode(
      `Description: ${bookObject.description}`
    );
    bookDesc.appendChild(bookDescText);
    bookContainer.appendChild(bookDesc);

    return bookContainer;
  });

  let bookGridItems = document.querySelector(".container__bookGrid__items");
  // const append = (parent) => (child) => parent.appendChild(child);
  bookSearchItems.forEach((div) => {
    bookGridItems.appendChild(div);
  });
  console.log(bookSearchItems);
});

clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
  searchInput.value = null;
  location.reload();
});
