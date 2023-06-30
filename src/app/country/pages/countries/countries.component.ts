import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styles: [],
})
export class CountriesComponent {
  constructor(private fb: FormBuilder) {}

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });
}
