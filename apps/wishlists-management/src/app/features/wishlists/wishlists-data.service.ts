import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IWishlistResponse } from './wishlists.types';
import { CreateWishlistDto } from '@gifty/wishlists';

@Injectable({
  providedIn: 'root',
})
export class WishlistsDataService {
  private readonly http = inject(HttpClient);

  public createWishlist(payload: CreateWishlistDto) {
    return this.http.post<IWishlistResponse>('/api/wishlists', payload);
  }
}
