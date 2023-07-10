import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../models/custom-validators';
import { Country } from '../models/country';
import { firstValueFrom } from 'rxjs';
import { LocationService } from '../services/location.service';
import { State } from '../models/state';
import { User } from '../models/user';
import { BeforeLeavingComponent } from '../utils/form-guard';
import { environment } from 'src/environments/environment.development';
import { PaymentIntent } from '../models/payment-intent';
import { PaymentService } from '../services/payment.service';
import { Donation } from '../models/donation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
})
export class DonationFormComponent implements OnInit, BeforeLeavingComponent {
  form!: FormGroup;
  loading: boolean = true;
  countries: Country[] = [];
  states: State[] = [];
  storage: Storage = sessionStorage;
  currentCountryCode!: string;
  stripe = Stripe(environment.stripePublishableKey); // initialize Stripe API
  payment: PaymentIntent = new PaymentIntent(0, 'USD', ''); // initialize a new payment
  cardElement: any; // render in #card-element template
  creditCardErrors: any = ''; // render in #card-errors template
  isCreditCardProcessing: boolean = false;
  transactionId: string = '';
  WISHLIST_MAX_CHAR_LENGTH = 1000;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // initialize form group
    this.form = this.createForm();
    this.setupStripeFormFields();

    // get list of all countries (for dropdown list of select options in billing address)
    firstValueFrom(this.locationService.getCountries()).then(
      (countries: Country[]) => {
        this.countries = countries;
      }
    );

    // get the client's current country location to autopopulate the form initially
    // then get the list of states applicable to the particular country
    this.locationService.getCurrentCountryCode().subscribe((countryCode) => {
      this.currentCountryCode = countryCode;
      this.form.get(['billingAddress', 'country'])?.setValue(countryCode);
      this.locationService
        .getStatesByCountryCode(countryCode)
        .subscribe((states) => {
          this.states = states;
          this.loading = false;
        });
    });

    this.autopopulateFormFields();
    // this.setupStripeFormFields();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      userDetails: this.fb.group({
        firstName: new FormControl<string>('', [
          Validators.required,
          CustomValidators.whiteSpaceCheck,
        ]),
        lastName: new FormControl<string>('', [
          Validators.required,
          CustomValidators.whiteSpaceCheck,
        ]),
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
      }),
      billingAddress: this.fb.group({
        country: new FormControl<string>('', [Validators.required]),
        address: new FormControl<string>('', [
          Validators.required,
          CustomValidators.whiteSpaceCheck,
        ]),
        city: new FormControl<string>('', [
          Validators.required,
          CustomValidators.whiteSpaceCheck,
        ]),
        state: new FormControl<string>(''),
        zipCode: new FormControl<string>('', [
          Validators.required,
          CustomValidators.whiteSpaceCheck,
        ]),
      }),
      amount: new FormControl<number>(5, [
        Validators.required,
        Validators.min(1),
      ]),
      creditCardDetails: this.fb.group({}), // managed by stripe API
      wishlist: new FormControl<string>('', [
        Validators.maxLength(this.WISHLIST_MAX_CHAR_LENGTH),
      ]),
    });
  }

  private setupStripeFormFields() {
    // get handle to stripe library's elements
    var elements = this.stripe.elements();

    // style the stripe card element
    var cardStyle = {
      base: {
        backgroundColor: '#000000',
        iconColor: '#c4f0ff',
        color: '#ffffff',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#ffffff',
        },
      },
      complete: {
        iconColor: '#28B463',
        color: '#28B463',
      },
      invalid: {
        iconColor: '#E50914',
        color: '#E50914',
      },
    };

    // create a card element from handle
    this.cardElement = elements.create('card', {
      hidePostalCode: true,
      style: cardStyle,
    });

    // inject created card element into template
    this.cardElement.mount('#card-element');

    // listen for change events and display credit card validation errors in template if any
    this.cardElement.on('change', (event: any) => {
      this.creditCardErrors = document.getElementById('card-errors');
      if (event.complete) {
        this.creditCardErrors.textContent = ''; // no errors to display
      } else if (event.error) {
        this.creditCardErrors.textContent = event.error.message;
      }
    });
  }

  private autopopulateFormFields(): void {
    const donor = this.storage.getItem('user');
    if (!!donor) {
      const user: User = JSON.parse(donor);
      this.form.get(['userDetails', 'email'])?.setValue(user.email);
      this.form.get(['userDetails', 'firstName'])?.setValue(user.firstName);
      this.form.get(['userDetails', 'lastName'])?.setValue(user.lastName);
    }
  }

  getStatesForSelectedCountry($event: any): void {
    // user selected a new country, refresh the list of states
    this.form.get(['billingAddress', 'state'])?.reset();
    this.states = [];
    firstValueFrom(this.locationService.getStatesByCountryCode($event.value))
      .then((states) => {
        this.states = states;
      })
      .catch((err: any) => {
        alert(err);
        console.info(err);
      });
  }

  handlePayment() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return; // do nothing and display all error messages if form is still invalid
    }

    const formFields: FormFields = this.form.getRawValue();

    // set up payment object for posting to back end
    this.payment.receiptEmail = formFields.userDetails.email;
    this.payment.amount = Math.round(formFields.amount * 100); // payment amount is in cents

    // set up donation object for posting to back end
    const donation: Donation = {
      donor: formFields.userDetails,
      amount: formFields.amount,
      wishlist: formFields.wishlist,
    };

    // post to backend if form has no errors
    if (!this.form.invalid && this.creditCardErrors.textContent === '') {
      this.isCreditCardProcessing = true;
      this.paymentService
        .createPaymentIntent(this.payment)
        .subscribe((response) => {
          this.transactionId = response.id;
          this.stripe
            .confirmCardPayment(
              response.client_secret,
              {
                payment_method: {
                  card: this.cardElement,
                  billing_details: {
                    email: donation.donor.email,
                    name: `${donation.donor.firstName} ${donation.donor.lastName}`,
                    address: {
                      line1: formFields.billingAddress.address,
                      city: formFields.billingAddress.city,
                      state: formFields.billingAddress.state,
                      postal_code: formFields.billingAddress.zipCode,
                      country: formFields.billingAddress.country,
                    },
                  },
                },
              },
              { handleActions: false }
            )
            .then((result: any) => {
              if (result.error) {
                // stripe transaction was not successful
                alert(`Error: ${result.error.message}`);
                this.isCreditCardProcessing = false;
              } else {
                // stripe transaction was successful
                donation.transaction_id = this.transactionId;
                this.paymentService.saveDonation(donation).subscribe({
                  next: (response) => {
                    alert(
                      `Thank you for your kind donation!\nOur developers will do their best to make your wishlist come true 🫰\nTransaction id: ${donation.transaction_id}`
                    );
                    this.form = this.createForm();
                    this.router.navigate(['/movies']);
                    this.isCreditCardProcessing = false;
                  },
                  error: (error) => {
                    alert(`Error: ${error.message}`);
                    this.isCreditCardProcessing = false;
                  },
                });
              }
            });
        });
    } else {
      this.form.markAllAsTouched();
      return; // do nothing and display all error messages if credit card fields are invalid
    }
  }

  formNotSaved(): boolean {
    return this.form.dirty;
  }

  confirmMessage(): string {
    return 'You have not completed the form submission.\nAre you sure you want to leave this page?';
  }
}

interface FormFields {
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  billingAddress: {
    country: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  amount: number;
  creditCardDetails?: {
    cardType?: string;
    nameOnCard?: string;
    cardNumber?: string;
    cvv?: string;
    expirationYear?: number;
    expirationMonth?: number;
  };
  wishlist: string;
}
