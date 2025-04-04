
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  trustRating: number;
}

export interface LoanHistory {
  id: string;
  clientId: string;
  amount: number;
  term: number; // In months
  startDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'fully-paid' | 'partially-paid' | 'defaulted';
  paymentHistory: Payment[];
  interestRate: number;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
}

export interface LoanApplication {
  clientId: string;
  amount: number;
  term: number;
  interestRate: number;
}

export const loanTerms = [
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 12, label: '12 months' },
  { value: 24, label: '24 months' },
  { value: 36, label: '36 months' },
];

export const loanStatusColors = {
  'pending': 'bg-blue-500',
  'approved': 'bg-green-500',
  'rejected': 'bg-red-500',
  'fully-paid': 'bg-success',
  'partially-paid': 'bg-warning',
  'defaulted': 'bg-danger',
};

export const loanStatusLabels = {
  'pending': 'Pending',
  'approved': 'Approved',
  'rejected': 'Rejected',
  'fully-paid': 'Fully Paid',
  'partially-paid': 'Partially Paid',
  'defaulted': 'Defaulted',
};
