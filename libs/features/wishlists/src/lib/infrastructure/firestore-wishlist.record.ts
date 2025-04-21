import { Timestamp } from 'firebase-admin/firestore';

export interface WishlistFirebaseRecord {
  name: string;
  ownerId: string;
  createdAt: Timestamp;
}
