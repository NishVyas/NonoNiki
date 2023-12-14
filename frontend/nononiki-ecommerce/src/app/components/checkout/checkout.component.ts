import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NonoNikiShopFormService } from 'src/app/services/nono-niki-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private nonoNikiShopFormService: NonoNikiShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    });

    // Populate Credit Card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);
    this.nonoNikiShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved Credit Card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    // Populate Credit Card years
    this.nonoNikiShopFormService.getCreditCardYears().subscribe(
      data=> {
        console.log("Retrieved Credit Card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log("Handling the submit button.");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is: " + this.checkoutFormGroup.get('customer').value.email);
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // If the current year equals the selected year, then start with the current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.nonoNikiShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved Credit Card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }
}
