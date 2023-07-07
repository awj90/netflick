import { User } from './user';

export interface Donation {
  donor: User;
  amount: number;
  wishlist: string;
  transaction_id?: string;
}
