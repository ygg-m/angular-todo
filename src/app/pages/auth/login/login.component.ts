import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MainService } from '@app/services/main.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private main = inject(MainService);

  errorMessage: string = '';

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    const user = this.main.getUser();
    if (user) this.router.navigate(['/todo']);
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        const data = await this.main.signIn(
          this.form.value.email!,
          this.form.value.password!,
        );

        if (data.user !== null) {
          this.router.navigate(['/todo']);
        }
      } catch (err: any) {
        this.errorMessage = this.main.getFirebaseErrorMessage(err.code);
      }
    }
  }
}
