import { FormGroup } from '@angular/forms';
export function MatchValuesValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.matchValuesValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ matchValuesValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
