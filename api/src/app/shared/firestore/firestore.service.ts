import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import { Firestore, FirestoreDataConverter, getFirestore } from 'firebase/firestore';
import { FirestoreCollection } from './firestore-collection';

@Injectable()
export class FirestoreService {
  private readonly db: Firestore;

  public constructor(private readonly config: ConfigService) {
    const app = initializeApp({
      apiKey: this.config.get<string>('FIREBASE_API_KEY'),
      projectId: this.config.get<string>('FIREBASE_PROJECT_ID'),
    });

    this.db = getFirestore(app);
  }

  public getCollection<AppModel, FirestoreData>(collectionName: string, converter: FirestoreDataConverter<AppModel, FirestoreData>): FirestoreCollection<AppModel,FirestoreData> {
    return new FirestoreCollection(this.db, collectionName, converter);
  }
}
