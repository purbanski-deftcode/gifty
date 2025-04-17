import { Gift } from '../entities/gift.entity';

export interface IGiftsRepository {
  findById(wishlistId:string, giftId: string): Promise<Gift | null>;
  create(wishlistId: string, gift: Gift): Promise<Gift>;
  update(wishlistId:string, gift: Gift): Promise<Gift>;
  delete(wishlistId:string, giftId: string): Promise<void>;

  // addProposal(giftId: string, proposal: GiftProposal): Promise<void>;
  // removeProposal(giftId: string, proposalId: string): Promise<void>;
  //
  // claimGift(giftId: string, claimerId: string): Promise<void>;
  // unclaimGift(giftId: string): Promise<void>;
  //
  // addContributor(giftId: string, contributorId: string, amount: number): Promise<void>;
  // removeContributor(giftId: string, contributorId: string): Promise<void>;
}

export const GIFTS_REPOSITORY = Symbol('GIFTS_REPOSITORY');
