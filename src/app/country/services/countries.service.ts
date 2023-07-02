import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { Observable, combineLatest, filter, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  get regions(): Region[] {
    return [...this._regions]; // Se rompe la ref. con la propiedad original
  }

  //* Methods *

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);

    return this.http
      .get<Country[]>(
        `${this.baseUrl}/region/${region}?fields=cca3,name,borders`
      )
      .pipe(
        map((countries) =>
          countries.map((country) => ({
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [],
          }))
        )
      );
  }

  getBordersByCountry(alphaCode: string): Observable<SmallCountry> {
    return this.http
      .get<Country>(
        `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`
      )
      .pipe(
        map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      );
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const countriesRequest: Observable<SmallCountry>[] = [];

    borders.forEach((code) => {
      const request = this.getBordersByCountry(code);
      countriesRequest.push(request);
    });

    return combineLatest(countriesRequest);
  }
}
