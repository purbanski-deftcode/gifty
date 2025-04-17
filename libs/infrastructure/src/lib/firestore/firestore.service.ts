import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { Firestore, FirestoreDataConverter, getFirestore, DocumentData } from 'firebase/firestore';
import { FirestoreCollection } from './firestore-collection';
import { AppConfigService } from '@gifty/config';

@Injectable()
export class FirestoreService {
  private readonly db: Firestore;

  public constructor(private readonly config: AppConfigService) {
    const app = initializeApp({
      apiKey: this.config.firestoreApiKey,
      projectId: this.config.firestoreProjectId,
    });

    this.db = getFirestore(app);
  }

  public getCollection<AppModel, FirestoreData extends DocumentData>(collectionPath: string, converter?: FirestoreDataConverter<AppModel, FirestoreData>): FirestoreCollection<AppModel, FirestoreData> {
    return new FirestoreCollection({
      db: this.db,
      collectionPath,
      converter,
    });
  }
}
