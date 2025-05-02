import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWishlist } from '../../wishlists.types';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-wishlists-overview-item',
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
  ],
  templateUrl: './wishlists-overview-item.component.html',
  styleUrl: './wishlists-overview-item.component.scss',
})
export class WishlistsOverviewItemComponent {
  public readonly wishlist = input.required<IWishlist>();
}
