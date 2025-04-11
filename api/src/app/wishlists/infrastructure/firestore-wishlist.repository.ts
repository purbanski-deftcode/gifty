import { Wishlist } from '../domain/entities/wishlist.entity';
import { IWishlistRepository } from '../domain/repositories/wishlist.repository';
import { FirestoreService } from '../../shared/firestore/firestore.service';
import { Injectable } from '@nestjs/common';
import { query, where } from 'firebase/firestore';
import { FirestoreCollection } from '../../shared/firestore/firestore-collection';
import { WishlistFirebaseRecord } from './firestore-wishlist.record';
import { FirestoreWishlistDataConverter } from './firestore-wishlist.data-converter';

@Injectable()
export class FirestoreWishlistRepository implements IWishlistRepository {
  private readonly collection: FirestoreCollection<Wishlist, WishlistFirebaseRecord>;

  public constructor(private readonly firebase: FirestoreService) {
    this.collection = this.firebase.getCollection('wishlists', new FirestoreWishlistDataConverter());
  }

  public async create(wishlist: Wishlist): Promise<Wishlist> {
    const docRef = await this.collection.create(wishlist);

    return this.collection.getById(docRef.id);
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
