import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsModule } from '@gifty/wishlists';
import { GiftsModule } from '@gifty/gifts';
import { FirestoreModule } from '@gifty/infrastructure';

@Module({
  imports: [WishlistsModule, GiftsModule, FirestoreModule],
  controllers: [WishlistsController],
})
export class AppModule {}
