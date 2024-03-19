import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {
  countdown: number = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    const countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(countdownInterval);
        this.redirectToMainPage();
      }
    }, 1000);
  }

  redirectToMainPage(): void {
    this.router.navigate(['/auth/login']);
  }
}
