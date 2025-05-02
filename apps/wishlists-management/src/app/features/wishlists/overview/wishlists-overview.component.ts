import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../../ui/container/container.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistsDataService } from '../wishlists-data.service';
import { IWishlist } from '../wishlists.types';
import { signal } from '@angular/core';
import { WishlistsOverviewItemComponent } from './item/wishlists-overview-item.component';
import { WishlistsOverviewNewItemBtnComponent } from './new-item-btn/wishlists-overview-new-item-btn.component';

@Component({
  selector: 'app-wishlists-overview',
  imports: [
    CommonModule,
    ContainerComponent,
    MatProgressSpinner,
    WishlistsOverviewItemComponent,
    WishlistsOverviewNewItemBtnComponent,
  ],
  templateUrl: './wishlists-overview.component.html',
  styleUrl: './wishlists-overview.component.scss',
})
export class WishlistsOverviewComponent implements OnInit {
  private readonly wishlistsService = inject(WishlistsDataService);
  private readonly snackBar = inject(MatSnackBar);

  public readonly isLoading = signal(true);
  public readonly wishlists = signal<IWishlist[]>([]);

  public ngOnInit(): void {
    this.fetchWishlists();
  }

  private fetchWishlists(): void {
    this.wishlistsService.getWishlists().subscribe({
      next: (wishlists) => {
        this.wishlists.set(wishlists);
        this.isLoading.set(false);
      },
      error: () => {
        this.snackBar.open('Nie udało się pobrać list życzeń', 'Zamknij', {
          duration: 5000,
        });

        this.isLoading.set(false);
      },
    });
  }
}
