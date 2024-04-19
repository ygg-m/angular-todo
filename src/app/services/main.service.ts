import { Injectable, inject } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
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
import { FilterEnum } from '@app/types/todo/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private firebase_client: FirebaseApp;
  private auth;
  private currentUser: BehaviorSubject<User | null>;
  private colRef;

  // Todo Variables
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  private readonly localStorageKey = 'todoList';

  constructor() {
    this.firebase_client = initializeApp(env.firebase);
    this.auth = getAuth();
    this.currentUser = new BehaviorSubject<User | null>(null);
    this.initAuthStateListener();
    this.colRef = collection(getFirestore(), 'Users');
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
      this.getUserTodos(user?.uid!).then((res) => {
        if (res) this.addFetchToCurrentList(res.data().todoList);
      });
    });
  }

  getUser(): Observable<User | null> {
    return this.currentUser.asObservable();
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

  async getUserTodos(uid: string) {
    return getDocs(this.colRef).then((snapshot) => {
      return snapshot.docs.find((e) => e.id.includes(uid));
    });
  }

  saveTodosToFirebase() {
    addDoc(this.colRef, this.todos$.value);
  }

  //
  // Todo Functions
  //
  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: uuid(),
    };

    if (text !== '') {
      const updatedTodos = [...this.todos$.getValue(), newTodo];
      this.todos$.next(updatedTodos);
      this.saveTodoList(this.todos$.value);
    }
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
    this.saveTodoList(this.todos$.value);
  }

  changeFilter(filter: FilterEnum): void {
    this.filter$.next(filter);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }

      return todo;
    });
    this.todos$.next(updatedTodos);
    this.saveTodoList(this.todos$.value);
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
    this.saveTodoList(this.todos$.value);
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
    this.saveTodoList(this.todos$.value);
  }

  saveTodoList(todoList: TodoInterface[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todoList));
  }

  getTodoList(): void {
    const todoListString = localStorage.getItem(this.localStorageKey);
    todoListString ? this.todos$.next(JSON.parse(todoListString)) : null;
  }

  addFetchToCurrentList(list: TodoInterface[]): void {
    const newList = [
      ...list,
      ...this.todos$.getValue().filter((e) => list.some((j) => j.id !== e.id)),
    ];

    this.todos$.next(newList);
    this.saveTodoList(newList);
  }
}
