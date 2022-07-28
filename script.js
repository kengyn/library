let bookTitle = document.querySelector("#book");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let readStatus = document.querySelector("#read");
let btn = document.querySelector(".submit");
let shelf = document.querySelector(".shelfMain");

document.addEventListener("click", deleteListener);

function deleteListener(e) {
  let element = e.target;
  if (element.classList.contains("deleteBtn")) {
    myLibrary.splice(e.composedPath()[1].dataset.num, 1);
    shelf.innerHTML = "";
    addToShelf();
  }
}

btn.addEventListener("click", () => {
  if (book.value == "" || author.value == "" || pages.value == "") {
    alert("empty");
  } else {
    shelf.innerHTML = "";
    addBookToLibrary(
      bookTitle.value,
      author.value,
      pages.value,
      readStatus.value
    );
    addToShelf();
  }
});

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(bookTitle, author, pages, readStatus) {
  let newBook = new Book(bookTitle, author, pages, readStatus);
  myLibrary.push(newBook);
}

function addToShelf() {
  for (let book of myLibrary) {
    let titleEl = document.createElement("p");
    let authorEl = document.createElement("p");
    let pageEl = document.createElement("p");
    let readEl = document.createElement("button");
    let deleteEl = document.createElement("button");
    deleteEl.classList.add("deleteBtn");
    deleteEl.textContent += "DELETE";
    for (let label in book) {
      if (label == "title") {
        titleEl.textContent += book[label];
      } else if (label == "author") {
        authorEl.textContent += book[label];
      } else if (label == "pages") {
        pageEl.textContent += book[label];
      } else if (label == "read") {
        readEl.textContent += book[label];
      }
      //   console.log(`${label}: ${book[label]}`);
    }
    let newBook = document.createElement("div");
    newBook.dataset.num = myLibrary.indexOf(book);
    newBook.classList.add("bookObj");
    newBook.appendChild(titleEl);
    newBook.appendChild(authorEl);
    newBook.appendChild(pageEl);
    newBook.appendChild(readEl);
    newBook.appendChild(deleteEl);
    shelf.appendChild(newBook);
  }
}
