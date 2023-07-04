import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../models/custom-validators';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
})
export class DonationFormComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // initialize form group
    this.form = this.createForm();
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
        street: new FormControl<string>('', [
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
}
