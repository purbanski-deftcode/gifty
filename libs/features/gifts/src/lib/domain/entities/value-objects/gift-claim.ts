import { GiftContributor } from './gift-contributor';

export class GiftClaim {
  private readonly giftContributors: GiftContributor[] = [];

  public constructor(
    public readonly claimerId: string,
    public readonly claimedAt: Date = new Date(),
  ) {}

  public getGiftContributors(): GiftContributor[] {
    return this.giftContributors;
  }

  public addContributor(contributor: GiftContributor): void {
    this.giftContributors.push(contributor);
  }

  public removeContributor(contributorId: string): void {
    const idx = this.giftContributors.findIndex(c => c.contributorId === contributorId);

    if (idx === -1) {
      throw new Error('Contributor not found');
    }

    this.giftContributors.splice(idx, 1);
  }
}
