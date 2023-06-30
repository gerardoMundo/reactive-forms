import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountriesComponent } from './pages/countries/countries.component';

@NgModule({
  declarations: [CountriesComponent],
  imports: [CommonModule, CountryRoutingModule],
})
export class CountryModule {}
