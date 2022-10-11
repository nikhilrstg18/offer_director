import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  tap,
} from 'rxjs';
import { ConfirmDialogModel } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Offer } from '../../models/offer';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { OfferService } from './../../services/offer.service';
import { OfferGridDataSource } from './offer-grid-datasource';

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
  startDate = new Date();
  durationInSeconds: number = 5;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'quoteNumber',
    'quoteDescription',
    'createdBy',
    'createdDate',
    'validity',
    'id',
  ];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];

  constructor(
    private _offerService: OfferService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.dataSource = new OfferGridDataSource(this._offerService);
  }
  ngOnInit() {
    this.loadOffers();
  }
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input?.nativeElement, 'keyup')
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
  remove(id: string, quoteNumber: string) {
    const message = `You want to delete offer with quote # ${quoteNumber}?`;
    const dialogData = new ConfirmDialogModel('Are you sure', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '80%',
      minWidth: '30%',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this._offerService
          .delete(id)
          .then(() => {
            this._snackBar.open(
              `Offer with quote # ${quoteNumber} deleted`,
              'Info',
              {
                duration: this.durationInSeconds * 1000,
              }
            );
          })
          .catch((t) => console.error('Error while delete'));
      }
    });
  }
}
