import { Component, signal } from '@angular/core';
import { Book } from '../classes/Book';
import { BookAPIService } from '../services/book-apiservice';

@Component({
  selector: 'app-book-new-component',
  standalone: false,
  templateUrl: './book-new-component.html',
  styleUrl: './book-new-component.css',
})
export class BookNewComponent {
  book = new Book();
  errMessage = signal('');
  message = signal('');
  imagePreview = signal('');

  constructor(private _service: BookAPIService) {}

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

  saveBook() {
    this.errMessage.set('');
    this.message.set('');

    this._service.postBook(this.book).subscribe({
      next: () => {
        this.message.set('Add book successfully');
        this.book = new Book();
        this.imagePreview.set('');
      },
      error: (err) => {
        this.errMessage.set(err);
      },
    });
  }
}
