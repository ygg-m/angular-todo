import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '@app/services/main.service';
import { User } from 'firebase/auth';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';

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
export class TodosComponent implements OnInit {
  isGuest: boolean = false;
  main = inject(MainService);
  router = inject(Router);
  currentUser$: User | null | undefined;

  constructor() {
    this.main.getUser().subscribe((user) => {
      this.currentUser$ = user;
    });
  }

  ngOnInit(): void {}

  logOut() {
    this.main.signOut().then(() => this.router.navigate(['/auth/login']));
  }
}
