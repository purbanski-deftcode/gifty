import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  IWishlistRepository,
  WISHLIST_REPOSITORY,
} from '../domain/repositories/wishlist.repository';
import { Wishlist } from '../domain/entities/wishlist.entity';
import { CreateWishlistDto, UpdateWishlistDto } from './dto';

@Injectable()
export class WishlistService {
  public constructor(
    @Inject(WISHLIST_REPOSITORY) public repository: IWishlistRepository
  ) {}

  public async getWishlistById(
    userId: string,
    wishlistId: string
  ): Promise<Wishlist> {
    const targetWishlist = await this.repository.findById(wishlistId);

    if (targetWishlist === null) {
      throw new NotFoundException('Wishlist not found');
    }

    if (targetWishlist.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return targetWishlist;
  }

  public async getWishlists(userId: string): Promise<Wishlist[]> {
    return this.repository.findByOwnerId(userId);
  }

  public async createWishlist(
    userId: string,
    dto: CreateWishlistDto
  ): Promise<Wishlist> {
    const wishlist = new Wishlist(dto.name, userId);

    return this.repository.create(wishlist);
  }

  public async updateWishlist(
    wishlistId: string,
    dto: UpdateWishlistDto
  ): Promise<Wishlist> {
    const targetWishlist = await this.repository.findById(wishlistId);

    if (targetWishlist === null) {
      throw new NotFoundException('Wishlist not found');
    }

    const wishlist = new Wishlist(
      dto.name,
      targetWishlist.ownerId,
      targetWishlist.id,
      targetWishlist.createdAt
    );

    return this.repository.update(wishlist);
  }
}
