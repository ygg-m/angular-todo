import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { TodoInterface } from '../../../../types/todo/interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps: boolean = false;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  @ViewChild('textInput') textInput!: ElementRef;
  editingText: string = '';

  todoService = inject(TodoService);

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isEditingProps.currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
