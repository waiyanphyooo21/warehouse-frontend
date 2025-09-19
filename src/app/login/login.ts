import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CardModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private auth = inject(AuthService);
  error=  signal('');
  loading = signal(false);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  returnUrl = signal('/');
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  submit(){
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    const { username, password } = this.form.getRawValue();

    this.auth.login(username, password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl(this.returnUrl());
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Invalid credentials');
      }
    });
  }

}
