import { Inject, Injectable } from '@nestjs/common';
import { IWishlistRepository, WISHLIST_REPOSITORY } from '../domain/repositories/wishlist.repository';
import { Wishlist } from '../domain/entities/wishlist.entity';
import { randomUUID } from 'node:crypto';
import { CreateWishlistDto } from './dto';

@Injectable()
export class WishlistService {
  public constructor(
    @Inject(WISHLIST_REPOSITORY) public repository: IWishlistRepository,
  ) {}

  public async createWishlist(dto: CreateWishlistDto): Promise<Wishlist> {
    const wishlist = new Wishlist(
      randomUUID(), // ignored by persistence layer
      dto.name,
      '999',
    );

    return this.repository.create(wishlist);
  }
}
