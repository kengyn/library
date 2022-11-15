import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGxGCxfJN1YNj74DpHoBaqk1lBncXA-tU",
  authDomain: "library-fbfa2.firebaseapp.com",
  projectId: "library-fbfa2",
  storageBucket: "library-fbfa2.appspot.com",
  messagingSenderId: "120582080353",
  appId: "1:120582080353:web:0e2f68673ccfb78a9de720",
};

initializeApp(firebaseConfig);
const db = getFirestore();

let bookTitle = document.querySelector("#book");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let readStatus = document.querySelector("#read");
let btn = document.querySelector(".submit");
let shelf = document.querySelector(".shelfMain");

document.addEventListener("click", (e) => deleteListener(e));

async function deleteListener(e) {
  let element = e.target;
  if (element.classList.contains("deleteBtn")) {
    const docRef = doc(db, "books", element.parentNode.id);
    await deleteDoc(docRef);
    shelf.innerHTML = "";
    loadBooks();
  }
}

btn.addEventListener("click", () => {
  if (bookTitle.value == "" || author.value == "" || pages.value == "") {
    alert("one of the values is empty");
  } else {
    addBookToLibrary(
      bookTitle.value,
      author.value,
      pages.value,
      readStatus.value
    );
    shelf.innerHTML = "";
    loadBooks();
  }
});

let myLibrary = [];

async function loadBooks() {
  myLibrary.splice(0, myLibrary.length);
  const colRef = collection(db, "books");
  const docSnap = await getDocs(colRef);
  docSnap.forEach((doc) => {
    myLibrary.push({ id: doc.id, ...doc.data() });
  });
  addToShelf();
}

async function addBookToLibrary(bookTitle, author, pages, readStatus) {
  try {
    await addDoc(collection(getFirestore(), "books"), {
      title: bookTitle,
      author: author,
      pages: pages,
      read: readStatus,
    });
  } catch (e) {
    console.error("mf uh: ", e);
  }
}

function addToShelf() {
  for (let book of myLibrary) {
    let titleEl = document.createElement("p");
    let authorEl = document.createElement("p");
    let pageEl = document.createElement("p");
    let readEl = document.createElement("button");
    let deleteEl = document.createElement("button");
    readEl.classList.add("readBtn");
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
    }
    let newBook = document.createElement("div");
    newBook.dataset.num = myLibrary.indexOf(book);
    newBook.classList.add("bookObj");
    newBook.setAttribute("id", book.id);
    newBook.appendChild(titleEl);
    newBook.appendChild(authorEl);
    newBook.appendChild(pageEl);
    newBook.appendChild(readEl);
    newBook.appendChild(deleteEl);
    shelf.appendChild(newBook);
  }
}

document.addEventListener("click", readListener);

async function readListener(e) {
  let element = e.target;
  if (element.classList.contains("readBtn")) {
    if (element.innerText == "READ") {
      const docRef = doc(db, "books", element.parentNode.id);
      await updateDoc(docRef, { read: "UNREAD" });
      element.innerText = "UNREAD";
    } else {
      const docRef = doc(db, "books", element.parentNode.id);
      await updateDoc(docRef, { read: "READ" });
      element.innerText = "READ";
    }
  }
}

loadBooks();
