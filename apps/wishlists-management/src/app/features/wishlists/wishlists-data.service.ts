import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IWishlist, IWishlistResponse } from './wishlists.types';
import { CreateWishlistDto, UpdateWishlistDto } from '@gifty/wishlists';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistsDataService {
  private readonly http = inject(HttpClient);

  public createWishlist(payload: CreateWishlistDto) {
    return this.http.post<IWishlistResponse>('/api/wishlists', payload);
  }


  public updateWishlist(wishlistId: string, payload: UpdateWishlistDto) {
    return this.http.patch<IWishlistResponse>(`/api/wishlists/${wishlistId}`, payload);
  }

  public getWishlistById(wishlistId: string): Observable<IWishlist> {
    return this.http.get<IWishlistResponse>(`/api/wishlists/${wishlistId}`).pipe(
      map(wishlist => ({
        ...wishlist,
        createdAt: new Date(wishlist.createdAt),
      }))
    );
  }
}
