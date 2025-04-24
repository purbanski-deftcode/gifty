import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-empty-gifts-info',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './empty-gifts-info.component.html',
  styleUrl: './empty-gifts-info.component.scss',
})
export class EmptyGiftsInfoComponent {
  public readonly width = input<string>('100%');
  public readonly text = input.required<string>();
}
