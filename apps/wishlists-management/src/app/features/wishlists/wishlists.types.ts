export interface IWishlistResponse {
  name: string;
  ownerId: string;
  id: string;
  createdAt: string;
}

export interface IWishlist extends Readonly<Omit<IWishlistResponse, 'createdAt'>> {
  readonly createdAt: Date;
}
