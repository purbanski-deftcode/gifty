export class GiftProposal {
  public constructor(
    public readonly name: string,
    public readonly comment: string | null,
    public readonly price: number | null,
    public readonly url: string | null,
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
  ) {}
}
