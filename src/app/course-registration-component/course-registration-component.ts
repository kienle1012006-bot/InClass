import { Component } from '@angular/core';
import { CourseRegistration } from '../classes/CourseRegistration';

@Component({
  selector: 'app-course-registration-component',
  standalone: false,
  templateUrl: './course-registration-component.html',
  styleUrl: './course-registration-component.css',
})
export class CourseRegistrationComponent {
  courseModel = new CourseRegistration();

  onSubmit(): void {
    alert('Xử lý dữ liệu:\n' + this.courseModel.getInfor());
  }
}
