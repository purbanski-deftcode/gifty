import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import { AppConfigModule } from '@gifty/config';

@Module({
  imports: [AppConfigModule],
  providers: [FirestoreService],
  exports: [FirestoreService],
})
export class FirestoreModule {}
