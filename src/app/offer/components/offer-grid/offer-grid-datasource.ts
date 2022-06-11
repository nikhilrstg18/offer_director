import { Offer } from './../../models/offer';
import { OfferService } from './../../services/offer.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  of,
} from 'rxjs';

// TODO: Replace this with your own data model type
export interface OfferGridItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: OfferGridItem[] = [
  { id: 1, name: 'Hydrogen' },
  { id: 2, name: 'Helium' },
  { id: 3, name: 'Lithium' },
  { id: 4, name: 'Beryllium' },
  { id: 5, name: 'Boron' },
  { id: 6, name: 'Carbon' },
  { id: 7, name: 'Nitrogen' },
  { id: 8, name: 'Oxygen' },
  { id: 9, name: 'Fluorine' },
  { id: 10, name: 'Neon' },
  { id: 11, name: 'Sodium' },
  { id: 12, name: 'Magnesium' },
  { id: 13, name: 'Aluminum' },
  { id: 14, name: 'Silicon' },
  { id: 15, name: 'Phosphorus' },
  { id: 16, name: 'Sulfur' },
  { id: 17, name: 'Chlorine' },
  { id: 18, name: 'Argon' },
  { id: 19, name: 'Potassium' },
  { id: 20, name: 'Calcium' },
];

/**
 * Data source for the OfferGrid view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OfferGridDataSource extends DataSource<Offer> {
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  private offersSubject = new BehaviorSubject<Offer[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public offers$ = this.offersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private _offerService: OfferService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Offer[]> {
    return this.offers$;
    // if (this.paginator && this.sort) {
    //   // Combine everything that affects the rendered data into one update
    //   // stream for the data-table to consume.
    //   this._offerService.getAll(
    //     this.paginator.pageIndex * this.paginator.pageSize,
    //     this.paginator.pageSize,
    //     this.sort.active,
    //     this.sort.direction)
    //   return combin(
    //     ,
    //     this.paginator.page,
    //     this.sort.sortChange
    //   ).pipe(
    //     map(() => {
    //       return this.getPagedData(this.getSortedData([...this.data]));
    //     })
    //   );
    // } else {
    //   throw Error(
    //     'Please set the paginator and sort on the data source before connecting.'
    //   );
    // }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.offersSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: Offer[]): Offer[] {
  //   if (this.paginator) {
  //     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //     return data.splice(startIndex, this.paginator.pageSize);
  //   } else {
  //     return data;
  //   }
  // }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  loadOffers(
    filter: string,
    sortBy = '',
    sortDirection = 'asc',
    pageIndex = 0,
    pageSize = 3
  ) {
    this.loadingSubject.next(true);

    this._offerService
      .getAll(filter, pageIndex * pageSize, pageSize, sortBy, sortDirection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((offers) => {
        this.loadingSubject.next(false);
        this.offersSubject.next(offers);
      });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
