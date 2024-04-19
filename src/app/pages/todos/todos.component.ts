import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '@app/services/main.service';
import { User } from 'firebase/auth';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  isGuest: boolean = false;
  main = inject(MainService);
  router = inject(Router);
  currentUser$: User | null | undefined;

  constructor() {
    this.main
      .getUser()
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.currentUser$ = user;
      });
  }

  logOut() {
    this.main.signOut().then(() => this.router.navigate(['/auth/login']));
  }
}
