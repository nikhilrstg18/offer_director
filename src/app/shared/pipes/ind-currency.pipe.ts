import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indCurrency',
})
export class IndCurrencyPipe implements PipeTransform {
  transform(val: string) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(Number(val));
  }
}
