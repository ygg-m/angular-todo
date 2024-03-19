import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    UserComponent,
    CommonModule,
  ],
  templateUrl: './todos.component.html',
})
export class TodosComponent {
  isGuest: boolean = true;
}
