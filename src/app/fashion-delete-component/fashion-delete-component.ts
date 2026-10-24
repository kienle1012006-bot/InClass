import { Component, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-delete-component',
  standalone: false,
  templateUrl: './fashion-delete-component.html',
  styleUrl: './fashion-delete-component.css',
})
export class FashionDeleteComponent implements OnInit {
  fashions = signal<Fashion[]>([]);
  errMessage = signal('');
  isLoading = signal(true);
  deletingId = signal<string | null>(null);

  constructor(private readonly fashionService: FashionAPIService) {}

  ngOnInit(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions.set(data.map((item) => Object.assign(new Fashion(), item)));
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.errMessage.set(this.describeError(error));
        this.isLoading.set(false);
      },
    });
  }

  deleteFashion(id: string | null): void {
    if (!id || this.deletingId()) return;
    if (!window.confirm('Bạn có chắc muốn xóa Fashion này không?')) return;

    this.errMessage.set('');
    this.deletingId.set(id);
    this.fashionService.deleteFashion(id).subscribe({
      next: () => {
        this.fashions.update((items) => items.filter((item) => item._id !== id));
        this.deletingId.set(null);
      },
      error: (error: HttpErrorResponse) => {
        this.errMessage.set(this.describeError(error));
        this.deletingId.set(null);
      },
    });
  }

  private describeError(error: HttpErrorResponse): string {
    const serverMessage = error.error?.message;
    if (typeof serverMessage === 'string') return serverMessage;
    if (error.status === 404) {
      return 'API hoặc Fashion không tồn tại. Hãy khởi động lại my-server rồi tải lại trang.';
    }
    return error.message;
  }
}
