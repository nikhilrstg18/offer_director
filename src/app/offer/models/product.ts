export class Product {
  constructor(
    public code: string = '',
    public name: string = '',
    public description: string = '',
    public make: string = '',
    public price: number = 0,
    public quantity: number = 0
  ) {}
}
