import { Client, LoanHistory } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create a date in the past or future
const createDate = (monthsAway: number): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsAway);
  return date.toISOString();
};

// Generate mock clients
export const mockClients: Client[] = [
  {
    id: uuidv4(),
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    phone: '09123456789',
    address: 'Manila, Philippines',
    trustRating: 92,
  },
  {
    id: uuidv4(),
    name: 'Maria Santos',
    email: 'maria@example.com',
    phone: '09123456790',
    address: 'Quezon City, Philippines',
    trustRating: 85,
  },
  {
    id: uuidv4(),
    name: 'Pedro Reyes',
    email: 'pedro@example.com',
    phone: '09123456791',
    address: 'Cebu, Philippines',
    trustRating: 78,
  },
  {
    id: uuidv4(),
    name: 'Ana Gonzales',
    email: 'ana@example.com',
    phone: '09123456792',
    address: 'Davao, Philippines',
    trustRating: 95,
  },
  {
    id: uuidv4(),
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    phone: '09123456793',
    address: 'Baguio, Philippines',
    trustRating: 65,
  },
  {
    id: uuidv4(),
    name: 'Sofia Cruz',
    email: 'sofia@example.com',
    phone: '09123456794',
    address: 'Iloilo, Philippines',
    trustRating: 50,
  },
  {
    id: uuidv4(),
    name: 'Miguel Lim',
    email: 'miguel@example.com',
    phone: '09123456795',
    address: 'Batangas, Philippines',
    trustRating: 40,
  },
];

// Generate mock loan history
export const mockLoanHistory: LoanHistory[] = [
  // Juan Dela Cruz - Good history
  {
    id: uuidv4(),
    clientId: mockClients[0].id,
    amount: 50000,
    term: 12,
    startDate: createDate(-14),
    dueDate: createDate(-2),
    status: 'fully-paid',
    interestRate: 0.1, // 10%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-12), amount: 4583 },
      { id: uuidv4(), date: createDate(-10), amount: 4583 },
      { id: uuidv4(), date: createDate(-8), amount: 4583 },
      { id: uuidv4(), date: createDate(-6), amount: 4583 },
      { id: uuidv4(), date: createDate(-4), amount: 4583 },
      { id: uuidv4(), date: createDate(-2), amount: 4583 },
    ],
  },
  {
    id: uuidv4(),
    clientId: mockClients[0].id,
    amount: 30000,
    term: 6,
    startDate: createDate(-8),
    dueDate: createDate(-2),
    status: 'fully-paid',
    interestRate: 0.08, // 8%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-6), amount: 5200 },
      { id: uuidv4(), date: createDate(-4), amount: 5200 },
      { id: uuidv4(), date: createDate(-2), amount: 5200 },
    ],
  },
  {
    id: uuidv4(),
    clientId: mockClients[0].id,
    amount: 25000,
    term: 3,
    startDate: createDate(-24),
    dueDate: createDate(-21),
    status: 'fully-paid',
    interestRate: 0.06, // 6%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-23), amount: 8833 },
      { id: uuidv4(), date: createDate(-22), amount: 8833 },
      { id: uuidv4(), date: createDate(-21), amount: 8834 },
    ],
  },

  // Maria Santos - Good history
  {
    id: uuidv4(),
    clientId: mockClients[1].id,
    amount: 40000,
    term: 12,
    startDate: createDate(-15),
    dueDate: createDate(-3),
    status: 'fully-paid',
    interestRate: 0.12, // 12%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-13), amount: 3733 },
      { id: uuidv4(), date: createDate(-11), amount: 3733 },
      { id: uuidv4(), date: createDate(-9), amount: 3733 },
      { id: uuidv4(), date: createDate(-7), amount: 3733 },
      { id: uuidv4(), date: createDate(-5), amount: 3733 },
      { id: uuidv4(), date: createDate(-3), amount: 3733 },
    ],
  },
  {
    id: uuidv4(),
    clientId: mockClients[1].id,
    amount: 20000,
    term: 3,
    startDate: createDate(-20),
    dueDate: createDate(-17),
    status: 'fully-paid',
    interestRate: 0.06, // 6%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-19), amount: 7067 },
      { id: uuidv4(), date: createDate(-18), amount: 7067 },
      { id: uuidv4(), date: createDate(-17), amount: 7066 },
    ],
  },

  // Pedro Reyes - Partial payment
  {
    id: uuidv4(),
    clientId: mockClients[2].id,
    amount: 25000,
    term: 6,
    startDate: createDate(-7),
    dueDate: createDate(-1),
    status: 'partially-paid',
    interestRate: 0.09, // 9%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-5), amount: 4542 },
      { id: uuidv4(), date: createDate(-3), amount: 4542 },
      // Missing last payment
    ],
  },
  {
    id: uuidv4(),
    clientId: mockClients[2].id,
    amount: 15000,
    term: 3,
    startDate: createDate(-12),
    dueDate: createDate(-9),
    status: 'partially-paid',
    interestRate: 0.07, // 7%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-11), amount: 5350 },
      { id: uuidv4(), date: createDate(-10), amount: 5350 },
      // Missing last payment
    ],
  },

  // Ana Gonzales - Perfect history
  {
    id: uuidv4(),
    clientId: mockClients[3].id,
    amount: 100000,
    term: 24,
    startDate: createDate(-30),
    dueDate: createDate(-6),
    status: 'fully-paid',
    interestRate: 0.15, // 15%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-28), amount: 4792 },
      { id: uuidv4(), date: createDate(-26), amount: 4792 },
      { id: uuidv4(), date: createDate(-24), amount: 4792 },
      { id: uuidv4(), date: createDate(-22), amount: 4792 },
      { id: uuidv4(), date: createDate(-20), amount: 4792 },
      { id: uuidv4(), date: createDate(-18), amount: 4792 },
      { id: uuidv4(), date: createDate(-16), amount: 4792 },
      { id: uuidv4(), date: createDate(-14), amount: 4792 },
      { id: uuidv4(), date: createDate(-12), amount: 4792 },
      { id: uuidv4(), date: createDate(-10), amount: 4792 },
      { id: uuidv4(), date: createDate(-8), amount: 4792 },
      { id: uuidv4(), date: createDate(-6), amount: 4792 },
    ],
  },
  {
    id: uuidv4(),
    clientId: mockClients[3].id,
    amount: 75000,
    term: 12,
    startDate: createDate(-18),
    dueDate: createDate(-6),
    status: 'fully-paid',
    interestRate: 0.1, // 10%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-16), amount: 6875 },
      { id: uuidv4(), date: createDate(-14), amount: 6875 },
      { id: uuidv4(), date: createDate(-12), amount: 6875 },
      { id: uuidv4(), date: createDate(-10), amount: 6875 },
      { id: uuidv4(), date: createDate(-8), amount: 6875 },
      { id: uuidv4(), date: createDate(-6), amount: 6875 },
    ],
  },

  // Carlos Mendoza - Mixed history
  {
    id: uuidv4(),
    clientId: mockClients[4].id,
    amount: 35000,
    term: 12,
    startDate: createDate(-14),
    dueDate: createDate(-2),
    status: 'partially-paid',
    interestRate: 0.12, // 12%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-12), amount: 3267 },
      { id: uuidv4(), date: createDate(-10), amount: 3267 },
      { id: uuidv4(), date: createDate(-8), amount: 3267 },
      { id: uuidv4(), date: createDate(-6), amount: 3267 },
      // Missing last payments
    ],
  },
  {
    id: uuidv4(),
    clientId: mockClients[4].id,
    amount: 20000,
    term: 6,
    startDate: createDate(-20),
    dueDate: createDate(-14),
    status: 'partially-paid',
    interestRate: 0.09, // 9%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-18), amount: 3633 },
      { id: uuidv4(), date: createDate(-16), amount: 3633 },
      { id: uuidv4(), date: createDate(-16), amount: 3633 },
      // Missing other payments
    ],
  },

  // Sofia Cruz - Defaulted
  {
    id: uuidv4(),
    clientId: mockClients[5].id,
    amount: 20000,
    term: 6,
    startDate: createDate(-8),
    dueDate: createDate(-2),
    status: 'defaulted',
    interestRate: 0.08, // 8%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-6), amount: 3467 },
      // Missing other payments
    ],
  },
  {
    id: uuidv4(),
    clientId: mockClients[5].id,
    amount: 10000,
    term: 3,
    startDate: createDate(-15),
    dueDate: createDate(-12),
    status: 'defaulted',
    interestRate: 0.05, // 5%
    paymentHistory: [
      { id: uuidv4(), date: createDate(-14), amount: 3500 },
      // Missing other payments
    ],
  },

  // Miguel Lim - Bad history
  {
    id: uuidv4(),
    clientId: mockClients[6].id,
    amount: 15000,
    term: 3,
    startDate: createDate(-5),
    dueDate: createDate(-2),
    status: 'defaulted',
    interestRate: 0.06, // 6%
    paymentHistory: [], // No payments made
  },
  {
    id: uuidv4(),
    clientId: mockClients[6].id,
    amount: 5000,
    term: 1,
    startDate: createDate(-8),
    dueDate: createDate(-7),
    status: 'defaulted',
    interestRate: 0.04, // 4%
    paymentHistory: [], // No payments made
  },
];
