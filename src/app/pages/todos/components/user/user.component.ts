import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
})
export class UserComponent {
  auth = inject(AuthService);
  @Input() username: string | null = null;

  constructor() {
    this.auth
      .getUser()
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.username = user!.displayName;
      });
  }
}
