import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MainService } from '../../../services/main.service';

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
  private main = inject(MainService);
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
        const data = await this.main.signUp(
          this.form.value.email!,
          this.form.value.password!,
        );

        if (data.user !== null) {
          await this.main.updateUsername(this.form.value.username!);
          this.router.navigate(['/todo']);
        }
      } catch (err: any) {
        this.errorMessage = this.main.getFirebaseErrorMessage(err.code);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
