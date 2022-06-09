import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';
declare var require: any;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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
export class Invoice {
  constructor(
    public customerName: string = '',
    public address: string = '',
    public contactNo: number = 0,
    public email: string = '',
    public products: Product[] = [],
    public additionalDetails: string = ''
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
  invoice: Invoice = new Invoice('test');

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.defaultValidity.setDate(this.defaultValidity.getDate() + 15);
    this.headerForm = this._formBuilder.group({
      quoteNumber: ['', Validators.required],
      contactPerson: ['Ms. Tanu Rustagi'],
      contactPhone: ['+91 9818995569'],
      contactEmail: ['tanu@atsfoodequipment.com'],
      validity: [this.defaultValidity, Validators.required],
    });
    this.customerForm = this._formBuilder.group({
      name: ['', Validators.required],
      orgName: ['', Validators.required],
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
    combineLatest([
      this.headerForm.valueChanges,
      this.customerForm.valueChanges,
      this.productForm.valueChanges,
    ]).subscribe((_) => {
      switch (false) {
        case this.headerForm.valid:
        case this.customerForm.valid:
        case this.productForm.valid:
          this.isDisabled = true;
          break;
        default:
          this.isDisabled = false;
      }
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
  downloadOffer() {
    if (
      this.headerForm.valid &&
      this.customerForm.valid &&
      this.products.valid
    ) {
      const form = {
        quoteHeader: {},
        customer: {},
        products: [{}],
      };
      for (let prop of Object.keys(this.headerForm.controls)) {
        form.quoteHeader = {
          ...form.quoteHeader,
          ...{ [prop]: this.headerForm.controls[prop].value },
        };
      }
      for (let prop of Object.keys(this.customerForm.controls)) {
        form.customer = {
          ...form.customer,
          ...{ [prop]: this.customerForm.controls[prop].value },
        };
      }
      for (let product of this.products.value) {
        form.products.push({ ...product });
      }
      form.products = form.products.splice(1, form.products.length - 1);

      this._snackBar.open('Form Generated', 'Console', {
        duration: this.durationInSeconds * 1000,
      });
      console.log(form);
    } else {
      this._snackBar.open('Please fix validations', 'Invalid', {
        duration: this.durationInSeconds * 1000,
      });
    }
  }
  public downloadAsPDF() {
    debugger;
    // const pdfTable = this.pdfTable.nativeElement;
    // var ret = htmlToPdfmake(pdfTable.innerHTML, {
    //   imagesByReference: true,
    // });
    // let dd = { ...ret };

    let dd = {
      // a string or { width: number, height: number }
      pageSize: 'A4',

      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [60, 100, 60, 100],
      footer: {
        margin: [15, 0],
        columns: [
          {
            alignment: 'left',
            layout: 'headerLineOnly', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],
              alignment: 'center',
              body: [
                [
                  {
                    text: 'ATS FOOD EQUIPMENT (INDIA) PVT LTD',
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
                        layout: 'noBorders', // optional
                        table: {
                          // headers are automatically repeated if the table spans over multiple pages
                          // you can declare how many rows should be treated as headers
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
                            ['Sahibabad, Ghaziabad 20101,'],
                            ['(UP) INDIA'],
                          ],
                        },
                      },
                      {
                        alignment: 'left',
                        layout: 'noBorders', // optional
                        table: {
                          // headers are automatically repeated if the table spans over multiple pages
                          // you can declare how many rows should be treated as headers
                          headerRows: 1,
                          widths: [160, 'auto', 100, '*'],

                          body: [
                            [
                              {
                                text: 'Corporate Office:',
                                bold: true,
                                color: '#006ab2',
                              },
                            ],
                            ['Office No. 412, 4th floor,'],
                            ['Devika Tower, Chander Nagar,'],
                            ['Ghaziabad 20101, (UP) INDIA'],
                          ],
                        },
                      },
                      {
                        alignment: 'left',
                        layout: 'noBorders', // optional
                        table: {
                          // headers are automatically repeated if the table spans over multiple pages
                          // you can declare how many rows should be treated as headers
                          headerRows: 1,
                          widths: [185, 'auto', 100, '*'],

                          body: [
                            [
                              {
                                text: 'Contact:',
                                bold: true,
                                color: '#006ab2',
                              },
                            ],
                            ['+91 120 4223815, 9818995569, 9911421085'],
                            [
                              {
                                text: [
                                  { text: 'Web: ', bold: true },
                                  'www.atsfoodequipment.com',
                                ],
                              },
                            ],
                            [
                              {
                                text: [
                                  { text: 'Email: ', bold: true },
                                  'info@atsfoodequipment.com',
                                ],
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
          layout: 'noBorders', // optional
          style: 'font9',
          margin: [0, 5],
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', '*', '*', '*'],

            body: [
              ['', '', '', ''],
              [
                { text: 'Date: ', bold: true },
                new Date().toLocaleDateString(),
                { text: 'Ref No: ', bold: true },
                'ATS/T/22054/22-23',
              ],
              [
                { text: 'Quote# : ', bold: true },
                '22054',
                { text: 'Validity: ', bold: true },
                '15 Days',
              ],
            ],
          },
        },
        {
          layout: 'noBorders', // optional
          style: 'font9',
          margin: [0, 5],
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            margin: [0, 5],
            widths: ['*'],
            body: [
              [
                {
                  columns: [
                    {
                      layout: 'noBorders', // optional
                      table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*'],

                        body: [
                          [{ text: 'Customer:', bold: true, color: '#006ab2' }],
                          [{ text: 'Mr. R.B. Singh', bold: true }],
                          [
                            {
                              text: [
                                { text: 'M/s ', bold: true },
                                'Rai Poultry',
                              ],
                            },
                          ],
                          [
                            {
                              text: [
                                { text: 'Add.: ', bold: true },
                                '112, City Centre, Amritsar, Punjab - 143001',
                              ],
                            },
                          ],
                          [
                            {
                              text: [
                                { text: 'Mob.: ', bold: true },
                                '+91 98103 77627',
                              ],
                            },
                          ],
                        ],
                      },
                    },
                    {
                      layout: 'noBorders', // optional
                      table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
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
                              text: 'Complete Eviscerating Shackle',
                              bold: false,
                            },
                          ],
                          [
                            {
                              layout: 'noBorders', // optional
                              table: {
                                // headers are automatically repeated if the table spans over multiple pages
                                // you can declare how many rows should be treated as headers
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
                                        'Ms. Tanu Rustagi',
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
                                        '+91 98189 95569',
                                      ],
                                    },
                                  ],
                                  [
                                    {
                                      text: [
                                        { text: 'Email: ', bold: true },
                                        'tanu@atsfoodequipment.com',
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
              ['Name', 'Feature', 'Make', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map((p) => [
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
                { text: 'Total Amount', colSpan: 5 },
                {},
                {},
                {},
                {},
                {
                  text: `${this.invoice.products
                    .reduce((sum, p) => sum + p.quantity * p.price, 0)
                    .toFixed(2)}`,
                  alignment: 'right',
                },
              ],
            ],
          },
        },
        {
          style: 'font9',
          margin: [0, 5],
          layout: 'lightHorizontalLines', // optional
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
                      ['Price', 'Ex-Ghaziaad(custom cleared, duty paid)'],
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
      ],
      images: {
        logo: 'https://nikhilrstg18.github.io/offer_director/assets/logo.png',
        quality:
          'https://nikhilrstg18.github.io/offer_director/assets/quality.png',
      },
      defaultStyle: {},
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
    };
    pdfMake.createPdf(dd as any).open();
  }
}
