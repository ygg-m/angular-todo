import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { FilterEnum } from '../types/todo/filter.enum';
import { TodoInterface } from '../types/todo/interface';
import { AuthService } from '@app/services/auth.service';
import { User } from 'firebase/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  private readonly localStorageKey = 'todoList';
  auth = inject(AuthService);
  currentUser$: User | null | undefined;

  constructor() {
    this.auth.getUser().subscribe((user) => {
      this.currentUser$ = user;
    });
  }

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
    if (this.currentUser$ !== null) {
      // console.log(this.auth.getUserTodos(this.currentUser$?.email!));
    } else {
      const todoListString = localStorage.getItem(this.localStorageKey);
      todoListString ? this.todos$.next(JSON.parse(todoListString)) : null;
    }
  }
}
