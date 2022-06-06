import { OfferComponent } from './../offer/offer.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
}
