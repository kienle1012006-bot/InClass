import { Component } from '@angular/core';
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  user = new UserLogin();

  onLogin(): void {
    alert('Đăng nhập thành công:\n' + JSON.stringify(this.user, null, 2));
  }
}
