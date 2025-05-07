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
import { Router } from '@angular/router';

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
  private readonly router = inject(Router);

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

  public async createNewWishlist(): Promise<void> {
    await this.router.navigate(['wishlists', 'editor', 'new']);
  }

  public async onWishlistEdit(id: string): Promise<void> {
    await this.router.navigate(['wishlists', 'editor', id]);
  }

  public onWishlistDelete(wishlist: IWishlist): void {
    const snackBarRef = this.snackBar.open(
      `Czy na pewno chcesz usunąć listę "${wishlist.name}"?`,
      'Usuń',
      {
        duration: 5000,
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.wishlistsService.deleteWishlist(wishlist.id).subscribe({
        next: () => {
          this.wishlists.set(
            this.wishlists().filter((item) => item.id !== wishlist.id)
          );
          this.snackBar.open('Lista życzeń została usunięta', 'Zamknij', {
            duration: 5000,
          });
        },
        error: () => {
          this.snackBar.open('Nie udało się usunąć listy życzeń', 'Zamknij', {
            duration: 5000,
          });
        },
      });
    });
  }
}
