import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  User,
} from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { env } from '../enviroments/enviroment.development';
import { TodoInterface } from '@app/types/todo/interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebase_client: FirebaseApp;
  private auth;
  private currentUser: BehaviorSubject<User | null>;
  private database;
  private colRef;

  constructor() {
    this.firebase_client = initializeApp(env.firebase);
    this.auth = getAuth();
    this.currentUser = new BehaviorSubject<User | null>(null);
    this.initAuthStateListener();
    this.database = getFirestore();
    this.colRef = collection(this.database, 'Users');
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

  getFirebaseErrorMessage(error: string): string {
    switch (error) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use. Please use a different email address.';
      default:
        return 'An error occurred. Please try again later.';
    }
  }

  private initAuthStateListener(): void {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.next(user);
      this.getUserTodos(user?.uid!).then((res) => console.log(res?.data()));
    });
  }

  getUser(): Observable<User | null> {
    return this.currentUser.asObservable().pipe(takeUntilDestroyed());
  }

  updateEmail(email: string) {
    return updateEmail(this.auth.currentUser!, email);
  }

  updatePassword(password: string) {
    return updatePassword(this.auth.currentUser!, password);
  }

  updateUsername(username: string) {
    return updateProfile(this.auth.currentUser!, { displayName: username });
  }

  getUserTodos(uid: string) {
    return getDocs(this.colRef).then((snapshot) => {
      return snapshot.docs.find((e) => e.id.includes(uid));
    });
  }
}
