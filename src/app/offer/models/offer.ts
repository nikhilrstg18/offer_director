import { AfsDate } from './asf-date';
import { Customer } from './customer';
import { Product } from './product';
import { QuoteHeader } from './quote-header';

export class Offer {
  public modifiedDate: Date | AfsDate;
  constructor(
    public id: string = '',
    public customer: Customer = new Customer(),
    public products: Product[] = [],
    public quoteHeader: QuoteHeader = new QuoteHeader(),
    public createdBy: string = '',
    public createdDate: Date | AfsDate = new Date(),
    public modifiedBy: string = ''
  ) {
    this.modifiedDate = this.createdDate;
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}
