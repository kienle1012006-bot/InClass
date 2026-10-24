import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-property-component',
  standalone: false,
  templateUrl: './binding-property-component.html',
  styleUrl: './binding-property-component.css',
})
export class BindingPropertyComponent {
  public name:string="Lê Đức Vũ Kiên"
  public email:string="kienldvk24411@uel.edu.vn"
  public nameid:string="kien1012006"
  public emailid:string="kienle1012006@gmaiil.com"
  public isDisabled:boolean=true
  public hello:string="Hey! how is going?"
}

