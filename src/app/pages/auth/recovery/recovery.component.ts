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
  private main = inject(MainService);

  emailSent: boolean = false;

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      await this.main.recoverPassword(this.form.value.email!);
      this.emailSent = true;
    } else this.form.markAsTouched();
  }
}
