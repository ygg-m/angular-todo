import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '@app/services/main.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
})
export class UserComponent {
  main = inject(MainService);
  @Input() username: string | null | undefined = null;

  constructor() {
    this.main
      .getUser()
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.username = user?.displayName;
      });
  }
}
