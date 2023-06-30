import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountriesComponent } from './pages/countries/countries.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CountriesComponent],
  imports: [CommonModule, CountryRoutingModule, ReactiveFormsModule],
})
export class CountryModule {}
