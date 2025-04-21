import {
  FirestoreDataConverter,
  QueryDocumentSnapshot, Timestamp
} from 'firebase-admin/firestore';
import { Gift } from '../domain/entities/gift.entity';
import {
  GiftFirebaseRecord,
  GiftProposalFirebaseRecord,
  GiftClaimFirebaseRecord,
  GiftContributorFirebaseRecord
} from './firestore-gifts.record';
import { GiftProposal } from '../domain/entities/value-objects/gift-proposal';
import { GiftContributor } from '../domain/entities/value-objects/gift-contributor';

export class FirestoreGiftsDataConverter implements FirestoreDataConverter<Gift, GiftFirebaseRecord> {
  public toFirestore(gift: Gift): GiftFirebaseRecord {
    const proposals: GiftProposalFirebaseRecord[] = gift['proposals'].map(proposal => ({
      id: proposal.id,
      name: proposal.name,
      comment: proposal.comment,
      price: proposal.price,
      url: proposal.url,
      createdAt: Timestamp.fromDate(proposal.createdAt)
    }));

    let claim: GiftClaimFirebaseRecord | null = null;

    if (gift.isClaimed()) {
      const giftClaim = gift.getClaim();

      if (!giftClaim) {
        throw new Error('Gift is claimed but claim is null');
      }

      const contributors: GiftContributorFirebaseRecord[] = giftClaim.getGiftContributors().map(contributor => ({
        contributorId: contributor.contributorId,
        contributionAmount: contributor.contributionAmount
      }));

      claim = {
        claimerId: giftClaim.claimerId,
        claimedAt: Timestamp.fromDate(giftClaim.claimedAt),
        contributors
      };
    }

    return {
      name: gift.name,
      description: gift.description,
      createdAt: Timestamp.fromDate(gift.createdAt),
      claim,
      proposals
    };
  }

  public fromFirestore(snapshot: QueryDocumentSnapshot<GiftFirebaseRecord>): Gift {
    const data = snapshot.data();

    const gift = new Gift(
      snapshot.id,
      data.name,
      data.description
    );

    if (data.proposals && data.proposals.length > 0) {
      data.proposals.forEach(proposal => {
        gift.addProposal(new GiftProposal(
          proposal.name,
          proposal.comment,
          proposal.price,
          proposal.url,
          proposal.id,
          proposal.createdAt.toDate()
        ));
      });
    }

    if (data.claim) {
      gift.claimGift(data.claim.claimerId, data.claim.claimedAt.toDate());

      if (data.claim.contributors && data.claim.contributors.length > 0) {
        data.claim.contributors.forEach(contributor => {
          gift.addContributor(new GiftContributor(
            contributor.contributorId,
            contributor.contributionAmount
          ));
        });
      }
    }

    return gift;
  }
}
