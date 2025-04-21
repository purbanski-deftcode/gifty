import { CollectionReference, Query, DocumentData } from 'firebase-admin/firestore';
import { IFirestoreCollectionInitConfig } from './firestore.types';

export class FirestoreCollection<TAppModel, TFirestoreModel extends DocumentData = DocumentData> {
  private readonly collection: CollectionReference<TAppModel, TFirestoreModel>;

  public constructor(config: IFirestoreCollectionInitConfig<TAppModel, TFirestoreModel>) {
    this.collection = config.db.collection(config.collectionPath) as CollectionReference<TAppModel, TFirestoreModel>;

    if (config.converter) {
      this.collection = this.collection.withConverter(config.converter);
    }
  }

  public async create(model: TAppModel) {
    return await this.collection.add(model);
  }

  public async getById(id: string): Promise<TAppModel | null> {
    const document = await this.collection.doc(id).get();

    return (document.exists && document.data()) || null;
  }

  public async update(id: string, model: TAppModel): Promise<void> {
    await this.collection.doc(id).set(model);
  }

  public async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  public async findByQuery(queryBuilder: (col: CollectionReference<TAppModel, TFirestoreModel>) => Query<TAppModel, TFirestoreModel>): Promise<TAppModel[]> {
    const queryRef = queryBuilder(this.collection);
    const snapshot = await queryRef.get();

    return snapshot.docs.map(doc => doc.data());
  }
}
