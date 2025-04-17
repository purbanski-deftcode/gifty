import { Injectable } from '@nestjs/common';
import { FirestoreCollection, FirestoreService } from '@gifty/infrastructure';
import { IGiftsRepository } from '../domain/repositories/gifts.repository';
import { GiftFirebaseRecord } from './firestore-gifts.record';
import { Gift } from '../domain/entities/gift.entity';
import { FirestoreGiftsDataConverter } from './firestore-gifts.data-converter';

@Injectable()
export class FirestoreGiftsRepository implements IGiftsRepository {
  private readonly dataConverter: FirestoreGiftsDataConverter;

  public constructor(private readonly firebase: FirestoreService) {
    this.dataConverter = new FirestoreGiftsDataConverter();
  }

  public async create(wishlistId:string, gift: Gift): Promise<Gift> {
    const giftsCollection = this.getGiftsCollection(wishlistId);
    const docRef = await giftsCollection.create(gift);
    const createdGift = await giftsCollection.getById(docRef.id);

    if (createdGift === null) {
      throw new Error('Failed to create gift'); // TODO: is this the best place and way?
    }

    return createdGift;
  }

  public async findById(wishlistId:string, giftId: string): Promise<Gift | null> {
    return this.getGiftsCollection(wishlistId).getById(giftId);
  }

  public async update(wishlistId:string, gift: Gift): Promise<Gift> {
    await this.getGiftsCollection(wishlistId).update(gift.id, gift);

    return gift;
  }

  public async delete(wishlistId: string, giftId: string): Promise<void> {
    await this.getGiftsCollection(wishlistId).delete(giftId);
  }

  private getGiftsCollection(wishlistId: string): FirestoreCollection<Gift, GiftFirebaseRecord> {
    return this.firebase.getCollection(`wishlists/${wishlistId}/gifts`, this.dataConverter);
  }
}
