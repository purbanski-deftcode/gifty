import { Injectable } from '@nestjs/common';
import { initializeApp, cert, App } from 'firebase-admin/app';
import { Firestore, FirestoreDataConverter, getFirestore, DocumentData } from 'firebase-admin/firestore';
import { FirestoreCollection } from './firestore-collection';
import { AppConfigService } from '@gifty/config';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { Auth, DecodedIdToken, getAuth } from 'firebase-admin/auth';

// TODO: change name to firebase related
@Injectable()
export class FirestoreService {
  private db!: Firestore;
  private auth!: Auth;

  private static readonly FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  private static readonly FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  private static readonly SERVICE_ACCOUNT_PATH = '../../../service-account.json';

  public constructor(private readonly config: AppConfigService) {
    const isDevelopmentEnvironment = process.env['NODE_ENV'] === 'development';

    const app = isDevelopmentEnvironment
      ? this.initializeFirebaseForDevelopment()
      : this.initializeFirebaseForProduction();

    this.initializeFirebaseServices(app);
  }

  private initializeFirebaseForDevelopment(): App {
    process.env['FIRESTORE_EMULATOR_HOST'] = FirestoreService.FIRESTORE_EMULATOR_HOST;
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = FirestoreService.FIREBASE_AUTH_EMULATOR_HOST;

    const app = initializeApp({ projectId: this.config.firestoreProjectId });
    console.log('🔥 Firebase Admin initialized with emulators');

    return app;
  }

  private initializeFirebaseForProduction(): App {
    const serviceAccountPath = join(__dirname, FirestoreService.SERVICE_ACCOUNT_PATH);
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

    return initializeApp({ credential: cert(serviceAccount) });
  }

  private initializeFirebaseServices(app: App): void {
    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }

  public getCollection<AppModel, FirestoreData extends DocumentData>(collectionPath: string, converter?: FirestoreDataConverter<AppModel, FirestoreData>): FirestoreCollection<AppModel, FirestoreData> {
    return new FirestoreCollection({
      db: this.db,
      collectionPath,
      converter
    });
  }

  public verifyToken(token: string): Promise<DecodedIdToken> {
    return this.auth.verifyIdToken(token);
  }
}
