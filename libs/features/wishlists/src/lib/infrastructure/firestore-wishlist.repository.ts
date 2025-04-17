import { Wishlist } from '../domain/entities/wishlist.entity';
import { IWishlistRepository } from '../domain/repositories/wishlist.repository';
import { Injectable } from '@nestjs/common';
import { query, where } from 'firebase/firestore';
import { WishlistFirebaseRecord } from './firestore-wishlist.record';
import { FirestoreWishlistDataConverter } from './firestore-wishlist.data-converter';
import { FirestoreCollection, FirestoreService } from '@gifty/infrastructure';

@Injectable()
export class FirestoreWishlistRepository implements IWishlistRepository {
  private readonly collection: FirestoreCollection<Wishlist, WishlistFirebaseRecord>;

  public constructor(private readonly firebase: FirestoreService) {
    this.collection = this.firebase.getCollection('wishlists', new FirestoreWishlistDataConverter());
  }

  public async create(wishlist: Wishlist): Promise<Wishlist> {
    const docRef = await this.collection.create(wishlist);
    const createdWishlist = await this.collection.getById(docRef.id);

    if (createdWishlist === null) {
      throw new Error('Failed to create wishlist'); // TODO: is this the best place and way?
    }

    return createdWishlist;
  }

  public async findById(id: string): Promise<Wishlist | null> {
    return this.collection.getById(id);
  }

  public async findByOwnerId(ownerId: string): Promise<Wishlist[]> {
    return this.collection.findByQuery((col) => query(
      col,
      where('ownerId', '==', ownerId)
    ));
  }

  public async update(wishlist: Wishlist): Promise<Wishlist> {
    await this.collection.update(wishlist.id, wishlist);

    return wishlist;
  }

  public async delete(id: string): Promise<void> {
    await this.collection.delete(id);
  }
}
