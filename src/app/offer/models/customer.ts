export class Customer {
  constructor(
    public name: string = '',
    public orgName: string = '',
    public email: string = '',
    public add1: string = '',
    public add2: string = '',
    public city: string = '',
    public state: string = '',
    public pinCode: number = 0,
    public phone: number = 0
  ) {}
}
