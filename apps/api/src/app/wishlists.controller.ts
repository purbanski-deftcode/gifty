import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateWishlistDto, UpdateWishlistDto, WishlistService } from '@gifty/wishlists';
import { AddGiftToWishlistDto, GiftsService } from '@gifty/gifts';
import { AuthGuard } from './guards/auth.guard';

// TODO: move to proper file
interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
  };
}

@UseGuards(AuthGuard)
@Controller('wishlists')
export class WishlistsController {
  public constructor(
    private readonly wishlistService: WishlistService,
    private readonly giftsService: GiftsService
  ) {}

  @Get()
  public getWishlists(@Req() req: AuthenticatedRequest) {
    return this.wishlistService.getWishlists(req.user.uid);
  }

  @Get('/:wishlistId')
  public getOne(
    @Req() req: AuthenticatedRequest,
    @Param('wishlistId') wishlistId: string
  ) {
    return this.wishlistService.getWishlistById(req.user.uid, wishlistId);
  }

  @Post()
  public async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateWishlistDto
  ) {
    return this.wishlistService.createWishlist(req.user.uid, dto);
  }

  @Patch('/:wishlistId')
  public async update(
    @Param('wishlistId') wishlistId: string,
    @Body() dto: UpdateWishlistDto
  ) {
    return this.wishlistService.updateWishlist(wishlistId, dto);
  }

  @Post('/:wishlistId/gifts')
  public async addGiftToWishlist(
    @Param('wishlistId') wishlistId: string,
    @Body() dto: AddGiftToWishlistDto
  ) {
    return this.giftsService.addGiftToWishlist(wishlistId, dto);
  }
}
