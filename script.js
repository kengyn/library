let bookTitle = document.querySelector("#book");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let readStatus = document.querySelector("#read");
let btn = document.querySelector(".submit");

btn.addEventListener("click", () => {
  if (book.value == "" || author.value == "" || pages.value == "") {
    alert("empty");
  } else {
    addBookToLibrary(
      bookTitle.value,
      author.value,
      pages.value,
      readStatus.value
    );
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
