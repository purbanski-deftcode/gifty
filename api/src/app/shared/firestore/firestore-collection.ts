import { addDoc, collection, CollectionReference, Firestore, FirestoreDataConverter, doc, getDoc, deleteDoc, setDoc, Query, getDocs } from 'firebase/firestore';

export class FirestoreCollection<TAppModel, TFirestoreModel> {
  private readonly collection: CollectionReference<TAppModel, TFirestoreModel>;

  public constructor(
    db: Firestore,
    collectionName: string,
    converter: FirestoreDataConverter<TAppModel>
  ) {
    this.collection = collection(db, collectionName).withConverter(converter) as CollectionReference<TAppModel, TFirestoreModel>;
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
