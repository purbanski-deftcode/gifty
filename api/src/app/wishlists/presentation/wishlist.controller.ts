import { Body, Controller, Post } from '@nestjs/common';
import { WishlistService } from '../application/wishlist.service';
import { CreateWishlistDto } from '../domain/dto/create-wishlist.dto';
import { Wishlist } from '../domain/entities/wishlist.entity';

@Controller('wishlist')
export class WishlistController {
  public constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  public async create(@Body() dto: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistService.createWishlist(dto);
  }
}
