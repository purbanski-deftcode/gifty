import { Module } from '@nestjs/common';
import { WishlistService } from './application/wishlist.service';
import { WishlistController } from './presentation/wishlist.controller';
import { WISHLIST_REPOSITORY } from './domain/repositories/wishlist.repository';
import { FirestoreWishlistRepository } from './infrastructure/firestore-wishlist.repository';
import { FirestoreModule } from '../shared/firestore/firestore.module';

@Module({
  providers: [
    WishlistService,
    {
      provide: WISHLIST_REPOSITORY,
      useClass: FirestoreWishlistRepository,
    }
  ],
  imports: [FirestoreModule],
  controllers: [WishlistController],
})
export class WishlistsModule {}
