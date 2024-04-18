import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnChanges {
  haveToken: boolean = false;
  auth = inject(AuthService);
  // @Input() userData!: User | null;
  username: string = 'baseUsername';

  ngOnChanges(): void {
    // if (this.auth.checkToken()) {
    // this.haveToken = true;
    // this.updateUsername();
    // console.log('user', this.userData);
    // }
  }

  // private updateUsername(): void {
  //   if (this.userData && this.userData.user_metadata) {
  //     this.username = this.userData.user_metadata.first_name;
  //   }
  // }
}
