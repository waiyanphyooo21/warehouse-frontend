import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-buton-demo',
  imports: [ButtonModule, InputTextModule, FloatLabelModule, FormsModule],
  templateUrl: './buton-demo.html',
  styleUrl: './buton-demo.scss'
})
export class ButonDemo {

 value1: string = '';
  value2: string = '';
  value3: string = '';

  darkMode: boolean = false;
  toggleDarkMode() {
    const element = document.querySelector('html') || null;
    if(element){
        element.classList.toggle('my-app-dark');
    }
    
}
}
