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

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
})
export class DonationFormComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = true;
  countries: Country[] = [];
  states: State[] = [];
  storage: Storage = sessionStorage;
  currentCountryCode!: string;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // initialize form group
    this.form = this.createForm();

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
        state: new FormControl<string>('', [Validators.required]),
        zipCode: new FormControl<string>('', [
          Validators.required,
          CustomValidators.whiteSpaceCheck,
        ]),
      }),
      creditCardDetails: this.fb.group({}), // managed by stripe API
    });
  }

  private autopopulateFormFields(): void {
    const donor = this.storage.getItem('user');
    if (!!donor) {
      const user: User = JSON.parse(donor);
      this.form.get(['customerDetails', 'email'])?.setValue(user.email);
      this.form.get(['customerDetails', 'firstName'])?.setValue(user.firstName);
      this.form.get(['customerDetails', 'lastName'])?.setValue(user.lastName);
      this.form.get('customerDetails')?.disable();
    }
  }
}
