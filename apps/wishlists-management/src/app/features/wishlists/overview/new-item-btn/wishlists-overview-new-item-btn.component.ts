import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-wishlists-overview-new-item-btn',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './wishlists-overview-new-item-btn.component.html',
  styleUrl: './wishlists-overview-new-item-btn.component.scss',
})
export class WishlistsOverviewNewItemBtnComponent {}
