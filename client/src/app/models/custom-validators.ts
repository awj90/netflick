import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static whiteSpaceCheck(formControl: FormControl): ValidationErrors | null {
    if (formControl.value == null || formControl.value.trim().length < 1) {
      return { whiteSpaceCheck: true };
    }
    return null; // a null return is needed if no errors (instead of false)
  }
}
