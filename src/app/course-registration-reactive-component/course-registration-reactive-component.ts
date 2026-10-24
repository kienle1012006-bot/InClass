import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

function customNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (!value) {
    return null;
  }

  const validName = /^[a-zA-ZÀ-ỹ\s]+$/.test(value);
  return validName ? null : { invalidName: true };
}

function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (!value) {
    return null;
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(value);
  const isStrong = hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;

  return isStrong ? null : { weakPassword: true };
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPass = control.get('confirmPass')?.value;

  if (!password || !confirmPass) {
    return null;
  }

  return password === confirmPass ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: false,
  templateUrl: './course-registration-reactive-component.html',
  styleUrl: './course-registration-reactive-component.css',
})
export class CourseRegistrationReactiveComponent {
  public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Trần Duy Thanh', [
        Validators.required,
        Validators.minLength(3),
        customNameValidator,
      ]),
      email: new FormControl('thanhtd@uel.edu.vn', [Validators.required, Validators.email]),
      password: new FormControl('Abc@123', [
        Validators.required,
        Validators.minLength(6),
        strongPasswordValidator,
      ]),
      confirmPass: new FormControl('Abc@123', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  get name(): AbstractControl | null {
    return this.regForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.regForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.regForm.get('password');
  }

  get confirmPass(): AbstractControl | null {
    return this.regForm.get('confirmPass');
  }

  setDefaultValues(): void {
    this.regForm.patchValue({
      name: 'Trần Duy Thanh',
      email: 'thanhtd@uel.edu.vn',
      password: 'Abc@123',
      confirmPass: 'Abc@123',
    });
  }

  onSubmit(): void {
    if (this.regForm.valid) {
      console.log('Dữ liệu gửi đi:', this.regForm.value);
      const infor = JSON.stringify(this.regForm.value);
      alert('Xử lý dữ liệu:\n' + infor);
    }
  }
}
