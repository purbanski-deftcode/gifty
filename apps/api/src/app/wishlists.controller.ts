import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateWishlistDto, WishlistService } from '@gifty/wishlists';
import { AddGiftToWishlistDto, GiftsService } from '@gifty/gifts';

@Controller('wishlists')
export class WishlistsController {
  public constructor(
    private readonly wishlistService: WishlistService,
    private readonly giftsService: GiftsService,
  ) {}

  @Post()
  public async create(@Body() dto: CreateWishlistDto) {
    return this.wishlistService.createWishlist(dto);
  }

  @Post('/:wishlistId/gifts')
  public async addGiftToWishlist(
    @Param('wishlistId') wishlistId: string,
    @Body() dto: AddGiftToWishlistDto
  ) {
    return this.giftsService.addGiftToWishlist(wishlistId, dto);
  }
}
