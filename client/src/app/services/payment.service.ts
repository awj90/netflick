import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntent } from '../models/payment-intent';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  SPRINGBOOT_BASE_API_URL_ENDPOINT: string = environment['serverApiUrl'];

  constructor(private http: HttpClient) {}

  // POST /api/donate
  saveDonation(donation: Donation): Observable<any> {
    const FULL_API_URL_ENDPOINT: string = `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/donate`;
    return this.http.post<Donation>(FULL_API_URL_ENDPOINT, donation);
  }

  // POST /api/donate/payment-intent
  createPaymentIntent(payment: PaymentIntent): Observable<any> {
    const FULL_API_URL_ENDPOINT: string = `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/donate/payment-intent`;
    return this.http.post<PaymentIntent>(FULL_API_URL_ENDPOINT, payment);
  }
}
