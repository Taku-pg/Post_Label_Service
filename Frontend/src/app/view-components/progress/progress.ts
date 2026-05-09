import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-progress',
  imports: [NgClass],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress {
  isTarget=input<number>();
}
