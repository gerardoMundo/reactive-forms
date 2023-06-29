import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/service/validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
      ],
    ],
    userName: ['', [Validators.required, this.validatorService.cantBeStrinder]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.passwordPattern),
      ],
    ],
    repPassword: ['', Validators.required],
  });

  //** Methods **
  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }

  //** Validators **
  isValidField(field: string): boolean | null {
    return this.validatorService.validField(this.myForm, field);
  }
}
