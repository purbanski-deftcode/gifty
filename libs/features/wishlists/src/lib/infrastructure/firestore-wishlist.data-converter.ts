import {
  FirestoreDataConverter,
  QueryDocumentSnapshot, Timestamp
} from 'firebase-admin/firestore';
import { Wishlist } from '../domain/entities/wishlist.entity';
import { WishlistFirebaseRecord } from './firestore-wishlist.record';

export class FirestoreWishlistDataConverter implements FirestoreDataConverter<Wishlist, WishlistFirebaseRecord> {
  public toFirestore(wishlist: Wishlist): WishlistFirebaseRecord {
    return {
      createdAt: Timestamp.fromDate(wishlist.createdAt),
      name: wishlist.name,
      ownerId: wishlist.ownerId,
    }
  }

  public fromFirestore(snapshot: QueryDocumentSnapshot<WishlistFirebaseRecord>): Wishlist {
    const data = snapshot.data();

    return new Wishlist(
      data.name,
      data.ownerId,
      snapshot.id,
      data.createdAt.toDate(),
    );
  }
}
