import { Module } from '@nestjs/common';
import { FirestoreModule } from '@gifty/infrastructure';
import { GiftsService } from './application/gifts.service';
import { GIFTS_REPOSITORY } from './domain/repositories/gifts.repository';
import { FirestoreGiftsRepository } from './infrastructure/firestore-gifts.repository';

@Module({
  providers: [
    GiftsService,
    {
      provide: GIFTS_REPOSITORY,
      useClass: FirestoreGiftsRepository,
    }
  ],
  imports: [FirestoreModule],
  exports: [GiftsService],
})
export class GiftsModule {}
