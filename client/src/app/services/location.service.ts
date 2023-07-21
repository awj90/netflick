import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Country } from '../models/country';
import { State } from '../models/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  SPRINGBOOT_BASE_API_URL_ENDPOINT: string = environment['serverApiUrl'];
  EXTERNAL_IP_GEOLOCATION_API_URL_ENDPOINT: string = 'https://jsonip.com/'; // access API from client as server may be located elsewhere

  constructor(private http: HttpClient) {}

  getCurrentCountryCode(): Observable<string> {
    return this.http
      .get<ApiGetResponseForCurrentCountryCode>(
        this.EXTERNAL_IP_GEOLOCATION_API_URL_ENDPOINT
      )
      .pipe(map((resp) => resp.country));
  }

  // GET /api/countries
  // select * from countries;
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/countries`
    );
  }

  // GET /api/states?countryCode=SG
  getStatesByCountryCode(countryCode: string): Observable<State[]> {
    return this.http.get<State[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/states`,
      {
        params: new HttpParams().set('countryCode', countryCode),
      }
    );
  }
}

interface ApiGetResponseForCurrentCountryCode {
  ip: string;
  country: string;
  'geo-ip': string;
  'API Help': string;
}
