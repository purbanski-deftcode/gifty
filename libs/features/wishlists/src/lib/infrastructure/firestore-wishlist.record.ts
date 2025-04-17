import { Timestamp } from 'firebase/firestore';

export interface WishlistFirebaseRecord {
  name: string;
  ownerId: string;
  createdAt: Timestamp;
}
