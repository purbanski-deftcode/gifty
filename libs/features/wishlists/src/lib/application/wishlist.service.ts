import { Inject, Injectable } from '@nestjs/common';
import { IWishlistRepository, WISHLIST_REPOSITORY } from '../domain/repositories/wishlist.repository';
import { Wishlist } from '../domain/entities/wishlist.entity';
import { CreateWishlistDto } from './dto';

@Injectable()
export class WishlistService {
  public constructor(
    @Inject(WISHLIST_REPOSITORY) public repository: IWishlistRepository,
  ) {}

  public async createWishlist(userId: string, dto: CreateWishlistDto): Promise<Wishlist> {
    const wishlist = new Wishlist(
      dto.name,
      userId,
    );

    return this.repository.create(wishlist);
  }
}
