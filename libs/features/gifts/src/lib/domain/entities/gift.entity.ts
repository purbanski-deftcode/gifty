import { GiftClaim } from './value-objects/gift-claim';
import { GiftProposal } from './value-objects/gift-proposal';
import { GiftContributor } from './value-objects/gift-contributor';

export class Gift {
  private claim: GiftClaim | null = null;
  private readonly proposals: GiftProposal[] = [];

  constructor(
    public readonly id: string = crypto.randomUUID(),
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date = new Date(),
  ) {}

  public isClaimed(): boolean {
    return !!this.claim;
  }

  public getClaim(): GiftClaim | null {
    return this.claim;
  }

  public addProposal(proposal: GiftProposal): void {
    this.proposals.push(proposal);
  }

  public removeProposal(proposalId: string): void {
    const idx = this.proposals.findIndex(p => p.id === proposalId);

    if (idx === -1) {
      throw new Error('Proposal not found');
    }

    this.proposals.splice(idx, 1);
  }

  public claimGift(claimerId: string, claimedAt: Date = new Date()): void {
    this.claim = new GiftClaim(claimerId, claimedAt);
  }

  public unclaimGift(): void {
    this.claim = null;
  }

  public addContributor(giftContributor: GiftContributor): void {
    if (!this.claim) {
      throw new Error('Gift is not claimed');
    }

    this.claim.addContributor(giftContributor);
  }
}
