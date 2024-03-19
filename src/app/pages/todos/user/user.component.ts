import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
})
export class UserComponent {
  isGuest: boolean = false;
  guestName: string = 'Ygg';
}
