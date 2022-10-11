import { MatSort, SortDirection } from '@angular/material/sort';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Offer } from '../models/offer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private dbPath: string = 'offers';
  private offersCollection!: AngularFirestoreCollection<Offer>;
  constructor(private _afs: AngularFirestore) {
    this.offersCollection = _afs.collection(this.dbPath);
  }

  get(id: string) {
    return this.offersCollection
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((o) => {
          const offer = o.payload.data() || new Offer();
          offer.id = o.payload.id;
          return offer;
        })
      );
  }
  getAll(
    filter: string,
    offset: number,
    fetch: number,
    orderBy: string,
    order: string
  ) {
    return this._afs
      .collection<Offer>('offers', (ref) =>
        ref
          .orderBy(
            orderBy == '' ? 'createdDate' : orderBy,
            order == 'desc' ? 'desc' : 'asc'
          )
          .startAt(offset)
          .limit(fetch)
      )
      .snapshotChanges()
      .pipe(
        map((offers) =>
          offers.map((o) => {
            let offer = o.payload.doc.data();
            offer.id = o.payload.doc.id;
            return offer;
          })
        )
      );
    // .valueChanges();
  }
  post(offer: Offer) {
    offer.id = this._afs.createId();
    offer.createdBy = 'Tanu';
    offer.createdDate = new Date();

    return this._afs.collection<Offer>('offers').add({ ...offer });
  }
  update(offer: Offer, existing: Offer | undefined) {
    offer.createdDate = existing!.createdDate;
    offer.createdBy = existing!.createdBy;
    offer.modifiedDate = new Date();
    offer.modifiedBy = 'Tanu';
    return this._afs.doc<Offer>('/offers/' + offer.id).update({ ...offer });
  }
  delete(id: string) {
    return this.offersCollection.doc(id).delete();
  }
}

interface AfsDate {
  seconds: number;
}
