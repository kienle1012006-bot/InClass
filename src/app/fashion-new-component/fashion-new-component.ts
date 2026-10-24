import { Component, signal } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-new-component',
  standalone: false,
  templateUrl: './fashion-new-component.html',
  styleUrl: './fashion-new-component.css',
})
export class FashionNewComponent {
  fashion = new Fashion();
  createdFashion = signal<Fashion | null>(null);
  errMessage = signal('');
  isSubmitting = signal(false);
  isReadingImage = signal(false);

  constructor(private readonly fashionService: FashionAPIService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.errMessage.set('Chọn một file hình ảnh.');
      input.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      this.errMessage.set('Ảnh phải nhỏ hơn 10 MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    this.isReadingImage.set(true);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.fashion.fashion_image = reader.result;
        this.errMessage.set('');
      }
      this.isReadingImage.set(false);
    };
    reader.onerror = () => {
      this.errMessage.set('Không đọc được file ảnh.');
      this.isReadingImage.set(false);
    };
    reader.readAsDataURL(file);
  }

  postFashion(): void {
    if (this.isSubmitting()) return;

    this.errMessage.set('');
    this.createdFashion.set(null);
    this.isSubmitting.set(true);

    this.fashionService.postFashion(this.fashion).subscribe({
      next: (data) => {
        this.createdFashion.set(Object.assign(new Fashion(), data));
        this.fashion = new Fashion();
        this.isSubmitting.set(false);
      },
      error: (error: Error) => {
        this.errMessage.set(error.message);
        this.isSubmitting.set(false);
      },
    });
  }
}
