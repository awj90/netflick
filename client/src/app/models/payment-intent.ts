export class PaymentIntent {
  constructor(
    public amount: number,
    public currency: string,
    public receiptEmail: string
  ) {}
}
