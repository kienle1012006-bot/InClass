import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-event-component',
  standalone: false,
  templateUrl: './binding-event-component.html',
  styleUrl: './binding-event-component.css',
})
export class BindingEventComponent {
  public hsa: number = 5;
  public hsb: number = 8;
  public ketQua: string = '';

  giaiPt() {
    let a=parseFloat(this.hsa.toString())
    let b=parseFloat(this.hsb.toString())

    if (a === 0 && b === 0) {
      this.ketQua = 'Vô số nghiệm';
    } else if (a === 0 && b !== 0) {
      this.ketQua = 'Vô nghiệm';
    } else {
      this.ketQua = 'x = ' + (-b / a);
    }
  }

  reset() {
    this.hsa = 0;
    this.hsb = 0;
    this.ketQua = '';
  }
}