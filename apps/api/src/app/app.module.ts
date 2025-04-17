import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsModule } from '@gifty/wishlists';
import { GiftsModule } from '@gifty/gifts';

@Module({
  imports: [WishlistsModule, GiftsModule],
  controllers: [WishlistsController],
})
export class AppModule {}
