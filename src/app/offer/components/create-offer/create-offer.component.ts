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
        margin: [15, 0, 15, -20],
        columns: [
          {
            alignment: 'left',
            layout: 'headerLineOnly', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [140, 'auto', 100, '*'],

              body: [
                [{ text: 'Registerd Office:', bold: true }],
                ['B-522, Brij Vihar,'],
                ['Sahibabad, Ghaziabad 20101,'],
                ['(UP) INDIA)'],
              ],
            },
          },
          {
            alignment: 'left',
            layout: 'headerLineOnly', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [140, 'auto', 100, '*'],

              body: [
                [{ text: 'Corporate Office:', bold: true }],
                ['Office No. 412, 4th floor,'],
                ['Devika Tower, Chander Nagar,'],
                ['Ghaziabad 20101, (UP) INDIA)'],
              ],
            },
          },
          {
            alignment: 'left',
            layout: 'headerLineOnly', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [160, 'auto', 100, '*'],

              body: [
                [{ text: 'Contact:', bold: true }],
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
        style: 'font20',
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
          columns: [
            [
              {
                text: 'this is a test',
                style: 'sectionHeader',
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
      defaultStyle: {},
      styles: {
        font20: {
          fontSize: 9,
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };
    pdfMake.createPdf(dd as any).open();
  }
}
