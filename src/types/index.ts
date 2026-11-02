export type SubscriptionStatus = 'active' | 'expiring' | 'expired';

export interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  startDate: string;
  durationMonths: 3 | 6 | 12;
  expiresDate: string;
  status: SubscriptionStatus;
  daysText: string; // e.g., "Expired 2 days ago", "3 days left", "Active"
  daysRemaining?: number;
  totalDays?: number;
}