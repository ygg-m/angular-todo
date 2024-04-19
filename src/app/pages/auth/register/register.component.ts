import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  registerComplete: boolean = false;
  errorMessage: string | unknown = '';

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        const data = await this.auth.signUp(
          this.form.value.email!,
          this.form.value.password!,
        );

        if (data.user !== null) {
          this.auth.updateUsername(this.form.value.username!).then(() => {
            this.router.navigate(['/todo']);
          });
        }
      } catch (err: any) {
        this.errorMessage = this.auth.getFirebaseErrorMessage(err.code);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
