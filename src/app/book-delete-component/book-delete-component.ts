import { Component, signal } from '@angular/core';
import { IBook } from '../classes/Book';
import { BookAPIService } from '../services/book-apiservice';

@Component({
  selector: 'app-book-delete-component',
  standalone: false,
  templateUrl: './book-delete-component.html',
  styleUrl: './book-delete-component.css',
})
export class BookDeleteComponent {
  books = signal<IBook[]>([]);
  errMessage = signal('');
  server_images_link = 'http://localhost:3000/images/';

  constructor(private _service: BookAPIService) {
    this.loadBooks();
  }

  loadBooks() {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books.set(data);
      },
      error: (err) => {
        this.errMessage.set(err);
      },
    });
  }

  deleteBook(bookId: string) {
    if (!confirm('Are you sure to delete this book?')) {
      return;
    }

    this._service.deleteBook(bookId).subscribe({
      next: (data) => {
        this.books.set(data);
      },
      error: (err) => {
        this.errMessage.set(err);
      },
    });
  }
}
