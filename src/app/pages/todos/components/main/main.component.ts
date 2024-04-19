import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TodoComponent } from '@app/pages/todos/components/todo/todo.component';
import { MainService } from '@app/services/main.service';
import { FilterEnum } from '@app/types/todo/filter.enum';
import { TodoInterface } from '@app/types/todo/interface';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  visibleTodos$: Observable<TodoInterface[]>;
  todoService = inject(MainService);
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;
  markAllAsCompletedText: string = 'Mark all as Completed';

  ngOnInit(): void {
    this.loadTodoList();
  }

  constructor() {
    // select all todos
    this.isAllTodosSelected$ = this.todoService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted)),
    );

    // change mark all todos as completed text
    this.isAllTodosSelected$.subscribe((isAllSelected) => {
      this.markAllAsCompletedText = isAllSelected
        ? 'Unmark all Todos'
        : 'Mark all Todos as completed';
    });

    // hide todos
    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0),
    );

    // filters
    this.visibleTodos$ = combineLatest([
      this.todoService.todos$,
      this.todoService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        switch (filter) {
          case FilterEnum.active:
            return todos.filter((todo) => !todo.isCompleted);
          case FilterEnum.completed:
            return todos.filter((todo) => todo.isCompleted);
          case FilterEnum.all:
            return todos;
          default:
            return todos;
        }
      }),
    );
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  loadTodoList(): void {
    this.todoService.getTodoList();
  }
}
