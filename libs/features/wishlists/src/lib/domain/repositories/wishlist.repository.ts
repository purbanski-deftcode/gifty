import { Wishlist } from '../entities/wishlist.entity';

export interface IWishlistRepository {
  findById(id: string): Promise<Wishlist | null>;
  findByOwnerId(ownerId: string): Promise<Wishlist[]>;
  create(wishlist: Wishlist): Promise<Wishlist>;
  update(wishlist: Wishlist): Promise<Wishlist>;
  delete(id: string): Promise<void>;
}

export const WISHLIST_REPOSITORY = Symbol('WISHLIST_REPOSITORY');
