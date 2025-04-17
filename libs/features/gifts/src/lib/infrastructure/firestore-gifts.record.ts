import { Timestamp } from 'firebase/firestore';

export interface GiftProposalFirebaseRecord {
  id: string;
  name: string;
  comment: string | null;
  price: number | null;
  url: string | null;
  createdAt: Timestamp;
}

export interface GiftContributorFirebaseRecord {
  contributorId: string;
  contributionAmount: number;
}

export interface GiftClaimFirebaseRecord {
  claimerId: string;
  claimedAt: Timestamp;
  contributors: GiftContributorFirebaseRecord[];
}

export interface GiftFirebaseRecord {
  name: string;
  description: string;
  createdAt: Timestamp;
  claim: GiftClaimFirebaseRecord | null;
  proposals: GiftProposalFirebaseRecord[];
}
