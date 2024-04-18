import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
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
  auth = inject(AuthService);
  router = inject(Router);
  currentUser$ = Observable<User | null>;

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      // this.currentUser$ = user;
    });
  }

  logOut() {
    this.auth.signOut().then(() => this.router.navigate(['/auth/login']));
  }
}
