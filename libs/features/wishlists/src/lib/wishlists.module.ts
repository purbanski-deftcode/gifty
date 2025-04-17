import { Module } from '@nestjs/common';
import { WISHLIST_REPOSITORY } from './domain/repositories/wishlist.repository';
import { WishlistService } from './application/wishlist.service';
import { FirestoreWishlistRepository } from './infrastructure/firestore-wishlist.repository';
import { FirestoreModule } from '@gifty/infrastructure';

@Module({
  providers: [
    WishlistService,
    {
      provide: WISHLIST_REPOSITORY,
      useClass: FirestoreWishlistRepository,
    }
  ],
  imports: [FirestoreModule],
  exports: [WishlistService],
})
export class WishlistsModule {}
