import { DocumentData, Firestore, FirestoreDataConverter } from 'firebase/firestore';

export interface IFirestoreCollectionInitConfig<TAppModel, TFirestoreModel extends DocumentData> {
  db: Firestore;
  collectionPath: string;
  converter?: FirestoreDataConverter<TAppModel, TFirestoreModel>
}
