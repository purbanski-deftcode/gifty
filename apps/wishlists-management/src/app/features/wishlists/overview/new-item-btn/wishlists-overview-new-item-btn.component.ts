import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-wishlists-overview-new-item-btn',
  imports: [CommonModule, MatCard, MatCardContent, MatIcon],
  templateUrl: './wishlists-overview-new-item-btn.component.html',
  styleUrl: './wishlists-overview-new-item-btn.component.scss',
})
export class WishlistsOverviewNewItemBtnComponent {

}
