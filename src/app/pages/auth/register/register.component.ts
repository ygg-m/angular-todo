import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  registerComplete: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });

    this.registerComplete = false;
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { data, error } = await this.auth.signUp(
        this.registerForm.value.email,
        this.registerForm.value.password
      );

      if (data.user != null) {
        if (data.user!.role === 'authenticated') {
          this.router.navigate(['todo']);
        } else {
          this.registerComplete = true;
        }
      }

      this.auth
        .signUp(this.registerForm.value.email, this.registerForm.value.password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
