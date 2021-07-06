// ES5 Example

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = (book) => {
  const bookList = document.querySelector("#book-list");

  // Create tr Element

  const row = document.createElement("tr");

  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  bookList.appendChild(row);
};

UI.prototype.deleteBook = (target) => {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = () => {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

UI.prototype.showAlert = (message, className) => {
  // Create div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  // Get parent
  const container = document.querySelector(".container");

  // Get Form
  const form = document.querySelector("#book-form");

  // Insert Alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Event Listeners for Add Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get Form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  //Instantiating book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    ui.showAlert("Book added succesfully", "success");

    // Clear fields
    ui.clearFields();
  }
});

// Event Listener for delete
document.querySelector("#book-list").addEventListener("click", (e) => {
  e.preventDefault();

  //Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show Alert
  ui.showAlert("Book deleted succesfully", "success");
});
