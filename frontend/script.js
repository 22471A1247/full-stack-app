const apiUrl = 'http://localhost:8070/api/books'; // Update with your backend URL

// Fetch and display all books
async function fetchBooks() {
    const response = await fetch(apiUrl);
    const books = await response.json();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent =`${book.id}: ${book.title} by ${book.author}`;
        bookList.appendChild(li);
    });
}

// Add a new book
document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        description: document.getElementById('description').value,
        genre: document.getElementById('genre').value
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    });

    fetchBooks(); // Refresh the book list
    document.getElementById('bookForm').reset(); // Clear the form
});

// Fetch all books on button click
document.getElementById('fetchAllBooksButton').addEventListener('click', fetchBooks);

// Fetch a book by ID
document.getElementById('fetchBookButton').addEventListener('click', async () => {
    const id = document.getElementById('fetchId').value;
    const response = await fetch(`${apiUrl}/${id}`);
    const book = await response.json();
    const fetchedBookDiv = document.getElementById('fetchedBook');
    fetchedBookDiv.innerHTML = '';

    if (book) {
        fetchedBookDiv.innerHTML =`<p>${book.id}: ${book.title} by ${book.author}</p>`;
    } else {
        fetchedBookDiv.innerHTML =`<p>Book not found.</p>`;
    }
});

// Update a book
document.getElementById('updateButton').addEventListener('click', async () => {
    const id = document.getElementById('updateId').value;
    const updatedBook = {
        title: document.getElementById('updateTitle').value,
        author: document.getElementById('updateAuthor').value,
        description: document.getElementById('updateDescription').value,
        genre: document.getElementById('updateGenre').value
    };

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBook)
    });

    fetchBooks(); // Refresh the book list
});

// Delete a book
document.getElementById('deleteButton').addEventListener('click', async () => {
    const id = document.getElementById('deleteId').value;

    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    fetchBooks(); // Refresh the book list
});

// Initial fetch of books
fetchBooks();