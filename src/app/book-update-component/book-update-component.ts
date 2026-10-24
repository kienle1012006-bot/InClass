import { Component, signal } from '@angular/core';
import { Book, IBook } from '../classes/Book';
import { BookAPIService } from '../services/book-apiservice';

@Component({
  selector: 'app-book-update-component',
  standalone: false,
  templateUrl: './book-update-component.html',
  styleUrl: './book-update-component.css',
})
export class BookUpdateComponent {
  books = signal<IBook[]>([]);
  book = new Book();
  errMessage = signal('');
  message = signal('');
  imagePreview = signal('');
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

  selectBook(book: IBook) {
    this.book = new Book(book);
    this.book.ImageBase64 = '';
    this.imagePreview.set('');
    this.message.set('');
    this.errMessage.set('');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.book.ImageBase64 = result;
      this.imagePreview.set(result);
    };
    reader.readAsDataURL(file);
  }

  updateBook() {
    this.errMessage.set('');
    this.message.set('');

    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.books.set(data);
        this.message.set('Update book successfully');
        this.imagePreview.set('');
      },
      error: (err) => {
        this.errMessage.set(err);
      },
    });
  }
}
