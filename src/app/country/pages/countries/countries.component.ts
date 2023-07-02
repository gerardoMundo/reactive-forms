import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styles: [],
})
export class CountriesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getBorders();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  public countries: SmallCountry[] = [];
  public country: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  getCountries(): void {
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => (this.country = [])),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => {
        this.countries = countries;
      });
  }

  getBorders(): void {
    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('borders')?.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap((alphaCode: string) =>
          this.countriesService.getBordersByCountry(alphaCode)
        ),
        switchMap((country) =>
          this.countriesService.getCountryBordersByCodes(country.borders ?? [])
        )
      )
      .subscribe((country) => {
        this.country = country ?? [];
      });
  }
}
