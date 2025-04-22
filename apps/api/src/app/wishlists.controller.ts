import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateWishlistDto, WishlistService } from '@gifty/wishlists';
import { AddGiftToWishlistDto, GiftsService } from '@gifty/gifts';
import { AuthGuard } from './guards/auth.guard';

// TODO: move to proper file
interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
  };
}

@Controller('wishlists')
export class WishlistsController {
  public constructor(
    private readonly wishlistService: WishlistService,
    private readonly giftsService: GiftsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  public async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateWishlistDto
  ) {
    return this.wishlistService.createWishlist(req.user.uid, dto);
  }

  @Post('/:wishlistId/gifts')
  public async addGiftToWishlist(
    @Param('wishlistId') wishlistId: string,
    @Body() dto: AddGiftToWishlistDto
  ) {
    return this.giftsService.addGiftToWishlist(wishlistId, dto);
  }
}
