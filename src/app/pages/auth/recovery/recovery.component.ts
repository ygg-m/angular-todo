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
  selector: 'app-recovery',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './recovery.component.html',
})
export class RecoveryComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  emailSent: boolean = false;

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      await this.auth.recoverPassword(this.form.value.email!);
      this.emailSent = true;
    } else this.form.markAsTouched();
  }
}
