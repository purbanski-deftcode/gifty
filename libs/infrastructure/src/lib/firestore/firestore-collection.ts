import { addDoc, collection, CollectionReference, doc, getDoc, deleteDoc, setDoc, Query, getDocs, DocumentData } from 'firebase/firestore';
import { IFirestoreCollectionInitConfig } from './firestore.types';

export class FirestoreCollection<TAppModel, TFirestoreModel extends DocumentData = DocumentData> {
  private readonly collection: CollectionReference<TAppModel, TFirestoreModel>;

  public constructor(config: IFirestoreCollectionInitConfig<TAppModel, TFirestoreModel>) {
    this.collection = collection(config.db, config.collectionPath) as CollectionReference<TAppModel, TFirestoreModel>;

    if (config.converter) {
      this.collection = this.collection.withConverter(config.converter);
    }
  }

  public async create(model: TAppModel) {
    return await addDoc(this.collection, model);
  }

  public async getById(id: string): Promise<TAppModel | null> {
    const document = await getDoc(doc(this.collection, id));

    return document.exists() ? document.data() : null;
  }

  public async update(id: string, model: TAppModel): Promise<void> {
    await setDoc(doc(this.collection, id), model);
  }

  public async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.collection, id));
  }

  public async findByQuery(queryBuilder: (col: CollectionReference<TAppModel, TFirestoreModel>) => Query<TAppModel, TFirestoreModel>): Promise<TAppModel[]> {
    const queryRef = queryBuilder(this.collection);
    const snapshot = await getDocs(queryRef);
    return snapshot.docs.map(doc => doc.data());
  }
}
