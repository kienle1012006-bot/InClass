import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-update-component',
  standalone: false,
  templateUrl: './fashion-update-component.html',
  styleUrl: './fashion-update-component.css',
})
export class FashionUpdateComponent implements OnInit {
  fashion = new Fashion();
  fashionId = '';
  errMessage = signal('');
  statusMessage = signal('');
  isLoading = signal(false);
  isSubmitting = signal(false);
  isReadingImage = signal(false);

  constructor(
    private readonly fashionService: FashionAPIService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fashionId = id;
        this.loadFashion();
      }
    });
  }

  loadFashion(): void {
    const id = this.fashionId.trim();
    this.errMessage.set('');
    this.statusMessage.set('');
    if (!id) {
      this.errMessage.set('Nhập Fashion ID để tải thông tin cần sửa.');
      return;
    }

    this.isLoading.set(true);
    this.fashionService.getFashion(id).subscribe({
      next: (data) => {
        this.fashion = Object.assign(new Fashion(), data);
        this.fashionId = data._id ?? id;
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        this.errMessage.set(error.message);
        this.isLoading.set(false);
      },
    });
  }

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

  updateFashion(): void {
    if (!this.fashion._id || this.isSubmitting() || this.isReadingImage()) return;

    this.errMessage.set('');
    this.statusMessage.set('');
    this.isSubmitting.set(true);
    this.fashionService.putFashion(this.fashion).subscribe({
      next: (data) => {
        this.fashion = Object.assign(new Fashion(), data);
        this.fashionId = data._id ?? this.fashionId;
        this.statusMessage.set('Fashion đã được cập nhật.');
        this.isSubmitting.set(false);
      },
      error: (error: Error) => {
        this.errMessage.set(error.message);
        this.isSubmitting.set(false);
      },
    });
  }
}
