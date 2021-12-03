// ################ Book class with Add and Remove Methods ################

class Book {
  constructor(title, author, id = Math.floor(Math.random() * 10000)) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  add() {
    const wraper = document.getElementById("wraper");
    const booksCont = document.getElementById("booksCont");
    booksCont.style.display = "block";
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.id = `book-${this.id}`;
    const bookElement = `
        <h4 class="bookTitle">"${this.title}"</h4>
        <p class="bookAuthor">By: ${this.author}</p>
        <button class="removeBtn">Remove</button>
      `;
    bookDiv.innerHTML += bookElement;
    const inputData = {
      title: this.title,
      author: this.author,
      id: this.id,
    };
    const storedData = JSON.parse(localStorage.getItem("storedData"));
    storedData.push(inputData);
    localStorage.setItem("storedData", JSON.stringify(storedData));
    bookDiv.querySelector(".removeBtn").addEventListener("click", () => {
      this.remove();
    });
    booksCont.append(bookDiv);
  }

  remove() {
   
    const bookDiv = document.getElementById(`book-${this.id}`);
    bookDiv.parentElement.removeChild(bookDiv);
    let storedData = JSON.parse(localStorage.getItem("storedData"));
    storedData = storedData.filter((bookobj) => {
      if (bookobj.id === this.id) {
        return false;
      }
      return true;
    });
    localStorage.setItem("storedData", JSON.stringify(storedData));
  }
}

// ################ Function To load initial book Data   ################

const initialLoad = () => {
  const storedData = JSON.parse(localStorage.getItem("storedData")) || [];
  if (storedData) {
    storedData.forEach((book) => {
      const newBook = new Book(book.title, book.author, book.id);
      newBook.add();
    });
  }

  localStorage.setItem("storedData", JSON.stringify(storedData));

  const addBtn = document.getElementById("addBtn");
  addBtn.addEventListener("click", (event) => {
    
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const book = new Book(bookTitle, bookAuthor);
    book.add();
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    event.preventDefault();
  });
};

initialLoad();

// ################ Make the website SPA ################

const bookListBtn = document.getElementById("bookListBtn");
const bookList = document.getElementById("bookList");
const addBookBtn = document.getElementById("addBookBtn");
const addBook = document.getElementById("addBook");
const contactBtn = document.getElementById("contactBtn");
const contact = document.getElementById("contact");
const seeBookList = document.getElementById("seeBookList");
const addNewBtn = document.getElementById("addNewBtn");

bookListBtn.addEventListener("click", () => {
  bookList.style.display = "block";
  addBook.style.display = "none";
  contact.style.display = "none";
});
addBookBtn.addEventListener("click", () => {
  addBook.style.display = "block";
  bookList.style.display = "none";
  contact.style.display = "none";
});
contactBtn.addEventListener("click", () => {
  contact.style.display = "block";
  bookList.style.display = "none";
  addBook.style.display = "none";
});
seeBookList.addEventListener("click", () => {
  bookList.style.display = "block";
  addBook.style.display = "none";
});
addNewBtn.addEventListener("click", () => {
  addBook.style.display = "block";
  bookList.style.display = "none";
});

// ################ Add Date and Time to the page  ################

const dateAndTime = document.getElementById("dateAndTime");
const setTime = function () {
  dateAndTime.innerHTML =
  window.luxon.DateTime.local().toFormat("dd LLL, yyyy | t");
}

setTime();

setInterval(function(){setTime();},1000);

