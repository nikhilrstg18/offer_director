import { OfferService } from './../../services/offer.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OfferGridDataSource, OfferGridItem } from './offer-grid-datasource';
import { Offer } from '../../models/offer';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'od-offer-grid',
  templateUrl: './offer-grid.component.html',
  styleUrls: ['./offer-grid.component.scss'],
})
export class OfferGridComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Offer>;
  dataSource: OfferGridDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['quote#', 'quoteDesc', 'createdOn'];

  constructor(private _offerService: OfferService) {
    this.dataSource = new OfferGridDataSource(this._offerService);
  }
  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    return this.dataSource.loadOffers(
      this.sort?.active,
      this.sort?.direction,
      this.paginator?.pageIndex,
      this.paginator?.pageSize
    );
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadOffers()))
      .subscribe();
  }
}
