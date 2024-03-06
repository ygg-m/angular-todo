import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.sass',
})
export class DefaultComponent {}
