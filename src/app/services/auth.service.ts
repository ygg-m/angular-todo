import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { env } from '../enviroments/enviroment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase_client: SupabaseClient;
  private firebase_client: FirebaseApp;
  private auth;
  private currentUser: BehaviorSubject<User | null>;

  constructor() {
    this.supabase_client = createClient(env.supabase.url, env.supabase.key);
    this.firebase_client = initializeApp(env.firebase);
    this.auth = getAuth();
    this.currentUser = new BehaviorSubject<User | null>(null);
    this.initAuthStateListener();
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  recoverPassword(email: string) {}

  signOut() {
    return signOut(this.auth);
  }

  // confirmPasswordValidator(originalPasswordControlName: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const originalPassword = control.root.get(
  //       originalPasswordControlName,
  //     )?.value;
  //     const confirmedPassword = control.value;

  //     // Check if passwords match
  //     if (originalPassword !== confirmedPassword) {
  //       return { confirmPassword: true };
  //     }

  //     return null;
  //   };
  // }

  getFirebaseErrorMessage(error: string): string {
    switch (error) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use. Please use a different email address.';
      // Add more cases for other error codes as needed
      default:
        return 'An error occurred. Please try again later.';
    }
  }

  private initAuthStateListener(): void {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.next(user);
    });
  }

  getUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  checkToken(): boolean {
    // find if there's an auth-token in local storage
    let keyFound = false;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.includes('auth-token')) {
        keyFound = true;
        break;
      }
    }

    if (keyFound) return true;
    else return false;
  }

  updateEmail(email: string) {
    return this.supabase_client.auth.updateUser({
      email: email,
    });
  }

  updatePassword(password: string) {
    return this.supabase_client.auth.updateUser({
      password: password,
    });
  }

  updateUsername(username: string) {
    // supabase
    // return this.supabase_client.auth.updateUser({
    //   data: { first_name: username },
    // });

    // firebase
    return updateProfile(this.auth.currentUser!, { displayName: username });
  }
}
