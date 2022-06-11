import { OfferService } from './../../services/offer.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OfferGridDataSource, OfferGridItem } from './offer-grid-datasource';
import { Offer } from '../../models/offer';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  tap,
} from 'rxjs';

@Component({
  selector: 'od-offer-grid',
  templateUrl: './offer-grid.component.html',
  styleUrls: ['./offer-grid.component.scss'],
})
export class OfferGridComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Offer>;
  @ViewChild('input') input!: ElementRef;
  dataSource: OfferGridDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'quoteNumber',
    'quoteDescription',
    'createdBy',
    'createdDate',
    'validity',
  ];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];

  constructor(private _offerService: OfferService) {
    this.dataSource = new OfferGridDataSource(this._offerService);
  }
  ngOnInit() {
    this.loadOffers();
  }
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadOffers();
        })
      )
      .subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadOffers()))
      .subscribe();
  }

  loadOffers(filter: string = '') {
    return this.dataSource.loadOffers(
      filter,
      this.sort?.active,
      this.sort?.direction,
      this.paginator?.pageIndex,
      this.paginator?.pageSize
    );
  }
}
