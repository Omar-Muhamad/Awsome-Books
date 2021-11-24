class Book {
  constructor(title, author, id = Math.floor(Math.random() * 10000)) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  add() {
    const booksCont = document.getElementById('booksCont');
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.id = `book-${this.id}`;
    const bookElement = `
        <h4 class="bookTitle">${this.title}</h4>
        <p class="bookAuthor">${this.author}</p>
        <button class="removeBtn">Remove</button>
        <hr>
      `;
    bookDiv.innerHTML += bookElement;
    const inputData = {
      title: this.title,
      author: this.author,
      id: this.id,
    };
    const storedData = JSON.parse(localStorage.getItem('storedData'));
    storedData.push(inputData);
    localStorage.setItem('storedData', JSON.stringify(storedData));
    bookDiv.querySelector('.removeBtn').addEventListener('click', () => {
      this.remove();
    });
    booksCont.append(bookDiv);
  }

  remove() {
    const bookDiv = document.getElementById(`book-${this.id}`);
    bookDiv.parentElement.removeChild(bookDiv);
    let storedData = JSON.parse(localStorage.getItem('storedData'));
    storedData = storedData.filter((bookobj) => {
      if (bookobj.id === this.id) {
        return false;
      }
      return true;
    });
    localStorage.setItem('storedData', JSON.stringify(storedData));
  }
}

const initialLoad = () => {
  const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
  if (storedData) {
    storedData.forEach((book) => {
      const newBook = new Book(book.title, book.author, book.id);
      newBook.add();
    });
  }
  localStorage.setItem('storedData', JSON.stringify(storedData));

  const addBtn = document.getElementById('addBtn');
  addBtn.addEventListener('click', () => {
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const book = new Book(bookTitle, bookAuthor);
    book.add();
  });
};

initialLoad();