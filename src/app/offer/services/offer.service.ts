import { MatSort } from '@angular/material/sort';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private _afs: AngularFirestore) {}

  get(id: string) {
    return this._afs.doc<Offer>(id).valueChanges();
  }
  getAll(offset: number, fetch: number, orderBy: string, order: string) {
    return this._afs
      .collection<Offer>('offers', (ref) =>
        ref
          .orderBy('createdDate', order == 'desc' ? 'desc' : 'asc')
          .startAt(offset)
          .limit(fetch)
      )
      .valueChanges();
  }
  post(offer: Offer) {
    offer.id = this._afs.createId();
    offer.createdBy = 'Tanu';
    return this._afs.collection<Offer>('offers').add({ ...offer });
  }
  update(offer: Offer) {
    return this._afs.doc<Offer>('/offers/' + offer.id).update({ ...offer });
  }
  delete(offer: Offer) {
    return this._afs.doc<Offer>('/offers/' + offer.id).delete();
  }
}
