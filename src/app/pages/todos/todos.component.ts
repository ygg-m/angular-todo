import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { User } from '@supabase/supabase-js';
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
  userData!: User;

  async ngOnInit(): Promise<void> {
    if (this.auth.checkToken()) {
      const {
        data: { user },
      } = await this.auth.getUser();

      if (user) this.userData = user;
    } else this.isGuest = true;
  }

  logOut() {
    this.auth.signOut().then(() => this.router.navigate(['/auth/login']));
  }
}
