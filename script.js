class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.floor(Math.random() * 10000);
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
    bookDiv.querySelector('.removeBtn').addEventListener('click', () => {
      this.remove();
    });
    booksCont.append(bookDiv);
  }

  remove() {
    const bookDiv = document.getElementById(`book-${this.id}`);
    bookDiv.parentElement.removeChild(bookDiv);
  }
}

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const book = new Book(bookTitle, bookAuthor);
  book.add();
});