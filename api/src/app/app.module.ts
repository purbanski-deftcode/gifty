import { Module } from '@nestjs/common';
import { WishlistsModule } from './wishlists/wishlists.module';
import { ConfigModule } from '@nestjs/config';
import { FirestoreModule } from './shared/firestore/firestore.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WishlistsModule,
    FirestoreModule,
  ],
})
export class AppModule {}
