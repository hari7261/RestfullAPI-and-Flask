interface Book {
  id: number;
  title: string;
  author: string;
}

class BookService {
  private apiUrl = 'http://localhost:5000';

  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${this.apiUrl}/books`);
    return response.json();
  }

  async getBook(id: number): Promise<Book> {
    const response = await fetch(`${this.apiUrl}/books/${id}`);
    return response.json();
  }

  async createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const response = await fetch(`${this.apiUrl}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    return response.json();
  }

  async updateBook(id: number, book: Partial<Book>): Promise<Book> {
    const response = await fetch(`${this.apiUrl}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    return response.json();
  }

  async deleteBook(id: number): Promise<void> {
    await fetch(`${this.apiUrl}/books/${id}`, { method: 'DELETE' });
  }
}

// Usage example
async function main() {
  const bookService = new BookService();

  // Get all books
  const books = await bookService.getBooks();
  console.log('All books:', books);

  // Create a new book
  const newBook = await bookService.createBook({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' });
  console.log('New book created:', newBook);

  // Get a specific book
  const book = await bookService.getBook(newBook.id);
  console.log('Retrieved book:', book);

  // Update a book
  const updatedBook = await bookService.updateBook(newBook.id, { title: 'The Great Gatsby (Updated)' });
  console.log('Updated book:', updatedBook);

  // Delete a book
  await bookService.deleteBook(newBook.id);
  console.log('Book deleted');

  // Get all books again to confirm changes
  const updatedBooks = await bookService.getBooks();
  console.log('Updated book list:', updatedBooks);
}

main().catch(console.error);
