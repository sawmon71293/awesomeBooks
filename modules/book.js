class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static updateDisplay = () => {
    const bookList = document.getElementById('bookList');
    let books;
    bookList.innerHTML = '';
    const storedBookList = localStorage.getItem('bookList');
    if (storedBookList) {
      books = JSON.parse(storedBookList);
      books.forEach((book, i) => {
        const dataStr = encodeURIComponent(JSON.stringify(book));
        let color;
        if (i % 2 === 0) {
          color = 'bg-light';
        } else {
          color = '';
        }
        const bookElement = `<div class="${color}">
            <div class="d-flex justify-content-between">
              <div>
                <p class="mt-3 ms-3">${book.title} by ${book.author}</p>
              </div>
              <div class="mt-2 me-3"><button class="btn btn-outline-dark" data-book=${dataStr} data-action="remove" >Remove</button></div>
            </div>
          </div> `;
        bookList.innerHTML += bookElement;
      });
    }
    bookList.removeEventListener('click', Book.removeBook);
    bookList.addEventListener('click', Book.removeBook);
  };

  static removeBook = (event) => {
    event.preventDefault();
    if (
      // eslint-disable-next-line operator-linebreak
      event.target.tagName === 'BUTTON' &&
      event.target.dataset.action === 'remove'
    ) {
      const button = event.target;
      const removeBook = JSON.parse(decodeURIComponent(button.dataset.book));
      const bookList = localStorage.getItem('bookList');
      const books = JSON.parse(bookList);
      const filter = books.filter((book) => book.title !== removeBook.title);
      localStorage.setItem('bookList', JSON.stringify(filter));
      Book.updateDisplay();
    }
  };

  static addBook = () => {
    const addBook = document.getElementById('addBook');

    addBook.addEventListener('click', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const book = new Book(title, author);
      const bookArray = localStorage.getItem('bookList');
      let changedArray = JSON.parse(bookArray);
      if (changedArray) {
        changedArray.push(book);
      } else {
        changedArray = [];
        changedArray.push(book);
      }

      localStorage.setItem('bookList', JSON.stringify(changedArray));
      this.updateDisplay();
      document.forms[0].reset();
    });
  };
}

export default Book;
