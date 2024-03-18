import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase_client: SupabaseClient;

  constructor() {
    this.supabase_client = createClient(
      environment.supabase.url,
      environment.supabase.key,
    );
  }

  // Register
  signUp(email: string, password: string) {
    return this.supabase_client.auth.signUp({ email, password });
  }

  // Login
  signIn(email: string, password: string) {
    return this.supabase_client.auth.signInWithPassword({ email, password });
  }
}
