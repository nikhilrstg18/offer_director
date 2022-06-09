import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
declare var require: any;

const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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
export class QuoteHeader {
  constructor(
    public contactPerson: string = 'Tanu Rustagi',
    public contactEmail: string = 'tanu@atsfoodequipment.com',
    public contactPhone: string = '9818995569',
    public quoteNumber: number = 0,
    public quoteDescription = '',
    public brandName: string = 'ATS Food Equipment (India) Pvt Ltd',
    public validity: Date = new Date()
  ) {}
}
export class Offer {
  constructor(
    public customer: Customer = new Customer(),
    public products: Product[] = [],
    public quoteHeader: QuoteHeader = new QuoteHeader()
  ) {
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}
@Component({
  selector: 'od-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent implements OnInit {
  defaultValidity: Date = new Date();
  headerForm!: FormGroup;
  customerForm!: FormGroup;
  productForm!: FormGroup;
  isLinear: boolean = false;
  form!: FormGroup;
  isDisabled: boolean = true;
  durationInSeconds: number = 5;
  invoice: Offer = new Offer();

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let offer = new Offer();
    this.defaultValidity.setDate(this.defaultValidity.getDate() + 15);
    this.headerForm = this._formBuilder.group({
      quoteNumber: ['', Validators.required],
      quoteDescription: ['', Validators.required],
      contactPerson: [offer.quoteHeader.contactPerson],
      contactPhone: [offer.quoteHeader.contactPhone],
      contactEmail: [offer.quoteHeader.contactEmail],
      validity: [this.defaultValidity, Validators.required],
    });
    this.customerForm = this._formBuilder.group({
      name: ['', Validators.required],
      orgName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      add1: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      add2: ['', Validators.maxLength(100)],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
    });
    this.productForm = this._formBuilder.group({
      products: this._formBuilder.array([this.getProductGroup()]),
    });
    this.form = this._formBuilder.group({
      headers: this.headerForm,
      customer: this.customerForm,
      products: this.products,
    });
  }

  get products() {
    return this.productForm.get('products') as FormArray;
  }

  getProductGroup(): FormGroup {
    return this._formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      make: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  addProduct(): void {
    this.products.push(this.getProductGroup());
  }
  removeProduct(index: number) {
    this.products.removeAt(index);
  }
  downloadOffer(action: string) {
    if (
      this.headerForm.valid &&
      this.customerForm.valid &&
      this.products.valid
    ) {
      let offer: Offer = new Offer();
      for (let prop of Object.keys(this.headerForm.controls)) {
        offer.quoteHeader = {
          ...offer.quoteHeader,
          ...{ [prop]: this.headerForm.controls[prop].value },
        };
      }
      for (let prop of Object.keys(this.customerForm.controls)) {
        offer.customer = {
          ...offer.customer,
          ...{ [prop]: this.customerForm.controls[prop].value },
        };
      }
      for (let product of this.products.value) {
        offer.products.push({ ...product });
      }
      offer.products = offer.products.splice(1, offer.products.length - 1);

      this._snackBar.open('Form Generated', 'Console', {
        duration: this.durationInSeconds * 1000,
      });
      this.downloadAsPDF(action, offer);
    } else {
      this._snackBar.open('Please fix validations', 'Invalid', {
        duration: this.durationInSeconds * 1000,
      });
    }
  }
  public downloadAsPDF(action: string, offer: Offer) {
    let today = new Date();

    let dd = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [60, 100, 60, 100],
      footer: {
        margin: [15, 0],
        columns: [
          {
            alignment: 'left',
            layout: 'headerLineOnly',
            table: {
              headerRows: 1,
              widths: ['*'],
              alignment: 'center',
              body: [
                [
                  {
                    text: offer.quoteHeader.brandName.toUpperCase(),
                    bold: true,
                    alignment: 'center',
                    margin: [0, 5],
                    style: 'font10',
                    color: '#006ab2',
                  },
                ],
                [
                  {
                    columns: [
                      {
                        alignment: 'left',
                        layout: 'noBorders',
                        table: {
                          headerRows: 1,
                          widths: [160, 'auto', 100, '*'],

                          body: [
                            [
                              {
                                text: 'Registerd Office:',
                                bold: true,
                                color: '#006ab2',
                              },
                            ],
                            ['B-522, Brij Vihar,'],
                            ['Sahibabad, Ghaziabad 201001,'],
                            ['(UP) INDIA'],
                          ],
                        },
                      },
                      {
                        alignment: 'left',
                        layout: 'noBorders',
                        table: {
                          headerRows: 1,
                          widths: [160, 'auto', 100, '*'],

                          body: [
                            [
                              {
                                border: [true, false, false, false],
                                text: 'Corporate Office:',
                                bold: true,
                                color: '#006ab2',
                              },
                            ],
                            [
                              {
                                text: 'Office No. 412, 4th floor,',
                                border: [true, false, false, false],
                              },
                            ],
                            [
                              {
                                text: 'Devika Tower, Chander Nagar,',
                                border: [true, false, false, false],
                              },
                            ],
                            [
                              {
                                text: 'Ghaziabad 201011, (UP) INDIA',
                                border: [true, false, false, false],
                              },
                            ],
                          ],
                        },
                      },
                      {
                        alignment: 'left',
                        layout: 'noBorders',
                        table: {
                          headerRows: 1,
                          widths: [185, 'auto', 100, '*'],

                          body: [
                            [
                              {
                                border: [true, false, false, false],
                                text: 'Contact:',
                                bold: true,
                                color: '#006ab2',
                              },
                            ],
                            [
                              {
                                text: '+91 120 4223815, 9818995569, 9911421085',
                                border: [true, false, false, false],
                              },
                            ],
                            [
                              {
                                text: [
                                  { text: 'Web: ', bold: true },
                                  'www.atsfoodequipment.com',
                                ],
                                border: [true, false, false, false],
                              },
                            ],
                            [
                              {
                                text: [
                                  { text: 'Email: ', bold: true },
                                  'info@atsfoodequipment.com',
                                ],
                                border: [true, false, false, false],
                              },
                            ],
                          ],
                        },
                      },
                    ],
                  },
                ],
                ['Sahibabad, Ghaziabad 20101,'],
                ['(UP) INDIA)'],
              ],
            },
          },
        ],

        style: 'font9',
      },
      header: {
        margin: [15, 0, 15, -20],
        columns: [
          {
            image: 'logo',
            width: 150,
            height: 70,
            margin: [0, 20, 0, 0],
          },
          {
            text: '',
            margin: [20, 30],
            alignment: 'center',
          },
          {
            image: 'quality',
            width: 70,
            height: 90,
            alignment: 'right',
            margin: [0],
          },
        ],
      },
      content: [
        {
          layout: 'noBorders',
          style: 'font9',
          margin: [0, 5],
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],

            body: [
              ['', '', '', ''],
              [
                { text: 'Date: ', bold: true },
                new Date().toLocaleDateString(),
                { text: 'Ref No: ', bold: true },
                `ATS/${offer.quoteHeader.contactPerson
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}/${offer.quoteHeader.quoteNumber}/${today
                  .getFullYear()
                  .toString()
                  .replace('20', '')}-${(today.getFullYear() + 1)
                  .toString()
                  .replace('20', '')}`,
              ],
              [
                { text: 'Quote# : ', bold: true },
                offer.quoteHeader.quoteNumber,
                { text: 'Validity: ', bold: true },
                `${Math.ceil(
                  (this.defaultValidity.getTime() - today.getTime()) /
                    (1000 * 3600 * 24)
                )} Days`,
              ],
            ],
          },
        },
        {
          layout: 'noBorders',
          style: 'font9',
          margin: [0, 5],
          table: {
            headerRows: 1,
            margin: [0, 5],
            widths: ['*'],
            body: [
              [
                {
                  columns: [
                    {
                      layout: 'noBorders',
                      table: {
                        headerRows: 1,
                        widths: ['*'],

                        body: [
                          [{ text: 'Customer:', bold: true, color: '#006ab2' }],
                          [{ text: offer.customer.name, bold: true }],
                          [
                            {
                              text: [
                                { text: 'M/s ', bold: true },
                                offer.customer.orgName,
                              ],
                            },
                          ],
                          [
                            {
                              text: [
                                { text: 'Add.: ', bold: true },
                                `${[
                                  offer.customer.add1,
                                  offer.customer.add2,
                                  offer.customer.city,
                                  offer.customer.state,
                                ].join(', ')}-${offer.customer.pinCode}`,
                              ],
                            },
                          ],
                          [
                            {
                              text: [
                                { text: 'Mob.: ', bold: true },
                                `+91 ${offer.customer.phone}`,
                              ],
                            },
                          ],
                        ],
                      },
                    },
                    {
                      layout: 'noBorders',
                      table: {
                        headerRows: 1,
                        widths: ['*'],

                        body: [
                          [
                            {
                              text: 'Quote/Project Description:',
                              bold: true,
                              color: '#006ab2',
                            },
                          ],
                          [
                            {
                              text: offer.quoteHeader.quoteDescription,
                              bold: false,
                            },
                          ],
                          [
                            {
                              layout: 'noBorders',
                              table: {
                                headerRows: 1,
                                widths: ['*'],

                                body: [
                                  [
                                    {
                                      text: 'Contact:',
                                      bold: true,
                                      color: '#006ab2',
                                    },
                                  ],
                                  [
                                    {
                                      text: [
                                        {
                                          text: 'Person: ',
                                          bold: true,
                                        },
                                        offer.quoteHeader.contactPerson,
                                      ],
                                    },
                                  ],
                                  [
                                    {
                                      text: [
                                        {
                                          text: 'Mob: ',
                                          bold: true,
                                        },
                                        `+91 ${offer.quoteHeader.contactPhone}`,
                                      ],
                                    },
                                  ],
                                  [
                                    {
                                      text: [
                                        { text: 'Email: ', bold: true },
                                        offer.quoteHeader.contactEmail,
                                      ],
                                    },
                                  ],
                                ],
                              },
                            },
                          ],
                        ],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        {
          text: 'Items',
          style: 'sectionHeader',
          color: '#006ab2',
        },
        {
          style: 'font9',
          margin: [0, 5],
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Name', bold: true },
                { text: 'Feature', bold: true },
                { text: 'Make', bold: true },
                { text: 'Price', bold: true },
                { text: 'Quantity', bold: true },
                { text: 'Amount', bold: true },
              ],
              ...offer.products.map((p) => [
                p.name,
                p.description,
                p.make,
                { text: `${p.price}`, alignment: 'right' },
                { text: `${p.quantity}`, alignment: 'right' },
                {
                  text: `${(p.price * p.quantity).toFixed(2)}`,
                  alignment: 'right',
                },
              ]),
              [
                { text: 'Total Amount', colSpan: 5, bold: true },
                {},
                {},
                {},
                {},
                {
                  text: `${offer.products
                    .reduce((sum, p) => sum + p.quantity * p.price, 0)
                    .toFixed(2)}`,
                  alignment: 'right',
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          style: 'font9',
          margin: [0, 5],
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [
              [{ text: 'Terms & Condition', bold: true, color: '#006ab2' }],
              [
                {
                  style: 'font9',
                  layout: 'noBorders',
                  table: {
                    headerRows: 0,
                    widths: ['auto', '*'],
                    body: [
                      ['Price', 'Ex-Ghazibaad(custom cleared, duty paid)'],
                      [
                        'Payment terms',
                        '100 % advance along with purchase order',
                      ],
                      ['GST & Freight', 'Extra at actual'],
                      [
                        'Delivery',
                        '2 to 3 weeks tentatively from the date of receipt of order and advance',
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  style: 'font9',
                  layout: 'noBorders',
                  table: {
                    headerRows: 0,
                    widths: ['auto', '*'],
                    body: [
                      [
                        { text: 'Note', bold: true },
                        {
                          ol: [
                            'The calculations made are as per current exchange rate. Any fluctuation in the exchange rate will affect the price.',
                            'Price variation on account of statutory changes in rates of taxes and duties namely Excise duty, Custom Duty, GST, Works Contract Tax, levies charge, octroi charge, etc. shall be payable if it comes into force due to government notification.',
                            'Due to current scenario, delivery schedule may differ. Due to this Supplier will not be responsible for delay in delivery.',
                            'Order once placed, cannot be canceled.',
                          ],
                          fillColor: '#f9d776',
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          },
        },
        {
          margin: [0, 25],
          columns: [
            [
              {
                qr: `https://www.atsfoodequipment.com/`,
                fit: '50',
              },
            ],
            [
              {
                style: 'font9',
                text: [
                  `for `,
                  {
                    text: offer.quoteHeader.brandName,
                    color: '#006ab2',
                  },
                ],
                alignment: 'right',
              },
            ],
          ],
        },
      ],
      images: {
        logo: 'https://nikhilrstg18.github.io/offer_director/assets/logo.png',
        quality:
          'https://nikhilrstg18.github.io/offer_director/assets/quality.png',
      },
      styles: {
        font9: {
          fontSize: 9,
        },
        font10: {
          fontSize: 10,
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 9,
          margin: [0, 5],
        },
      },
      // watermark: {
      //   text: offer.quoteHeader.brandName,
      //   color: '#006ab2',
      //   opacity: 0.1,
      //   bold: true,
      //   italics: true,
      // },
    };
    switch (action) {
      case 'view':
        pdfMake.createPdf(dd as any).open();
        break;
      case 'download':
        pdfMake.createPdf(dd as any).download();
        break;
      case 'print':
        pdfMake.createPdf(dd as any).print();
        break;
    }
  }
}
