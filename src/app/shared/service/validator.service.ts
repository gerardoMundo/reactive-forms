import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public passwordPattern: string =
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){8,}$'; //This works!

  public cantBeStrinder = (control: FormControl): ValidationErrors | null => {
    const username = control.value.trim().toLowerCase();

    if (username === 'strider') {
      return { invalidUsername: true };
    }

    return null;
  };

  public validField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public areEqualsFields(password1: string, password2: string) {
    return (form: AbstractControl): ValidationErrors | null => {
      const passwordValue1 = form.get(password1)?.value;
      const passwordValue2 = form.get(password2)?.value;

      if (passwordValue1 !== passwordValue2) {
        form.get(password2)?.setErrors({ notEquals: true });
        return { notEquals: true };
      }
      form.get(password2)?.setErrors(null);
      return null;
    };
  }
}
