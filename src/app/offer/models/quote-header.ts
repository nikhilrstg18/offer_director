import { AfsDate } from './asf-date';

export class QuoteHeader {
  constructor(
    public contactPerson: string = 'Tanu Rustagi',
    public contactEmail: string = 'tanu@atsfoodequipment.com',
    public contactPhone: string = '9818995569',
    public quoteNumber: number = 0,
    public quoteDescription = '',
    public brandName: string = 'ATS Food Equipment (India) Pvt Ltd',
    public validity: Date | AfsDate = new Date()
  ) {}
}
