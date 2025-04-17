import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AddGiftToWishlistDto } from './dto';
import { GIFTS_REPOSITORY, IGiftsRepository } from '../domain/repositories/gifts.repository';
import { Gift } from '../domain/entities/gift.entity';

@Injectable()
export class GiftsService {
  public constructor(
    @Inject(GIFTS_REPOSITORY) public repository: IGiftsRepository,
  ) {}

  public async addGiftToWishlist(wishlistId: string, dto: AddGiftToWishlistDto): Promise<Gift> {
    const gift = new Gift(
      randomUUID(), // ignored by persistence layer
      dto.name,
      dto.description,
    );

    return this.repository.create(wishlistId, gift);
  }
}
