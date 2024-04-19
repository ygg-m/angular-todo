import { Component, inject } from '@angular/core';
import { TodoService } from '../../../../services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  text: string = '';
  todoService = inject(TodoService);

  constructor() {
    this.todoService.todos$.subscribe((todos) => {});
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
