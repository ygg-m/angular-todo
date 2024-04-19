import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MainService } from '@app/services/main.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  main = inject(MainService);
  router = inject(Router);

  ngOnInit(): void {
    this.main.getUser().subscribe((user) => {
      if (user) this.router.navigate(['/todo']);
    });
  }
}
