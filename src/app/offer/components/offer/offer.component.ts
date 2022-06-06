import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'od-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  defaultValidity: Date = new Date();
  headerForm!: FormGroup;
  customerForm!: FormGroup;
  productForm!: FormGroup;
  isLinear: boolean = true;
  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

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
      email: ['', [Validators.required, Validators.email]],
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
      code: ['', Validators.required],
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
  }
}
