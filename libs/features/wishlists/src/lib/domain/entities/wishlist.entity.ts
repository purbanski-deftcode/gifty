export class Wishlist {
  public constructor(
    public readonly name: string,
    public readonly ownerId: string,
    public readonly id: string = crypto.randomUUID(),
    public readonly createdAt: Date = new Date(),
  ) {}
}
