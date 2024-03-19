import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { env } from '../enviroments/enviroment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase_client: SupabaseClient;

  constructor() {
    this.supabase_client = createClient(env.supabase.url, env.supabase.key);
  }

  signUp(email: string, password: string) {
    return this.supabase_client.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return this.supabase_client.auth.signInWithPassword({ email, password });
  }

  recoverPassword(email: string) {
    return this.supabase_client.auth.resetPasswordForEmail(email);
  }

  signOut() {
    return this.supabase_client.auth.signOut();
  }

  confirmPasswordValidator(originalPasswordControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const originalPassword = control.root.get(
        originalPasswordControlName,
      )?.value;
      const confirmedPassword = control.value;

      // Check if passwords match
      if (originalPassword !== confirmedPassword) {
        return { confirmPassword: true };
      }

      return null;
    };
  }

  getUser() {
    return this.supabase_client.auth.getUser();
  }
}
