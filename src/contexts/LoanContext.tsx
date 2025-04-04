import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, LoanHistory, Payment, LoanApplication } from '../types';
import { mockClients, mockLoanHistory } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface LoanContextType {
  clients: Client[];
  loanHistory: LoanHistory[];
  selectedClient: Client | null;
  selectClient: (clientId: string) => void;
  calculateTrustRating: (clientId: string) => number;
  canApplyForLoan: (clientId: string) => boolean;
  addLoan: (loan: LoanApplication) => void;
  updateLoan: (loanId: string, loan: Partial<LoanHistory>) => void;
  deleteLoan: (loanId: string) => void;
  getClientLoans: (clientId: string) => LoanHistory[];
  calculateMonthlyPayment: (amount: number, term: number, interestRate: number) => number;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [loanHistory, setLoanHistory] = useState<LoanHistory[]>(mockLoanHistory);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Select a client by ID
  const selectClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId) || null;
    setSelectedClient(client);
  };

  // Calculate trust rating based on loan history
  const calculateTrustRating = (clientId: string): number => {
    const clientLoans = loanHistory.filter(loan => loan.clientId === clientId);
    
    if (clientLoans.length === 0) {
      return 75; // Default rating for new clients
    }

    let fullyPaidCount = 0;
    let partiallyPaidCount = 0;
    let defaultedCount = 0;
    let totalLoans = clientLoans.length;

    clientLoans.forEach(loan => {
      if (loan.status === 'fully-paid') {
        fullyPaidCount++;
      } else if (loan.status === 'partially-paid') {
        partiallyPaidCount++;
      } else if (loan.status === 'defaulted') {
        defaultedCount++;
      }
    });

    // Calculate weighted score
    const fullyPaidWeight = 100;
    const partiallyPaidWeight = 50;
    const defaultedWeight = -100;

    const weightedScore = 
      (fullyPaidCount * fullyPaidWeight + 
       partiallyPaidCount * partiallyPaidWeight + 
       defaultedCount * defaultedWeight) / totalLoans;

    // Normalize to 0-100 range
    const normalizedScore = Math.max(0, Math.min(100, 75 + weightedScore));
    
    return Math.round(normalizedScore);
  };

  // Linear regression model to determine loan eligibility
  const canApplyForLoan = (clientId: string): boolean => {
    const trustRating = calculateTrustRating(clientId);
    return trustRating >= 80;
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = (amount: number, term: number, interestRate: number): number => {
    const monthlyRate = interestRate / 12;
    const totalAmount = amount * (1 + interestRate);
    return Math.round(totalAmount / term);
  };

  // Add a new loan
  const addLoan = (loan: LoanApplication) => {
    const startDate = new Date().toISOString();
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + loan.term);

    const newLoan: LoanHistory = {
      id: uuidv4(),
      clientId: loan.clientId,
      amount: loan.amount,
      term: loan.term,
      startDate,
      dueDate: dueDate.toISOString(),
      status: 'approved',
      paymentHistory: [],
      interestRate: loan.interestRate,
    };

    setLoanHistory(prev => [...prev, newLoan]);
    
    // Update client trust rating
    updateClientTrustRating(loan.clientId);
    
    toast({
      title: "Loan Approved",
      description: `Loan for ₱${loan.amount.toLocaleString()} has been approved`,
    });
  };

  // Update a loan
  const updateLoan = (loanId: string, loanUpdate: Partial<LoanHistory>) => {
    setLoanHistory(prev => 
      prev.map(loan => 
        loan.id === loanId ? { ...loan, ...loanUpdate } : loan
      )
    );
    
    const loan = loanHistory.find(l => l.id === loanId);
    if (loan) {
      updateClientTrustRating(loan.clientId);
    }
    
    toast({
      title: "Loan Updated",
      description: "Loan details have been updated successfully",
    });
  };

  // Delete a loan
  const deleteLoan = (loanId: string) => {
    const loan = loanHistory.find(l => l.id === loanId);
    
    setLoanHistory(prev => prev.filter(loan => loan.id !== loanId));
    
    if (loan) {
      updateClientTrustRating(loan.clientId);
    }
    
    toast({
      title: "Loan Deleted",
      description: "Loan has been deleted successfully",
    });
  };

  // Get loans for a specific client
  const getClientLoans = (clientId: string): LoanHistory[] => {
    return loanHistory.filter(loan => loan.clientId === clientId);
  };

  // Update client trust rating
  const updateClientTrustRating = (clientId: string) => {
    const newTrustRating = calculateTrustRating(clientId);
    
    setClients(prev => 
      prev.map(client => 
        client.id === clientId ? { ...client, trustRating: newTrustRating } : client
      )
    );
    
    // Also update selected client if needed
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient(prev => prev ? { ...prev, trustRating: newTrustRating } : null);
    }
  };

  // Periodically recalculate trust ratings
  useEffect(() => {
    // Update all client trust ratings on initial load
    clients.forEach(client => {
      updateClientTrustRating(client.id);
    });
  }, []);

  const value = {
    clients,
    loanHistory,
    selectedClient,
    selectClient,
    calculateTrustRating,
    canApplyForLoan,
    addLoan,
    updateLoan,
    deleteLoan,
    getClientLoans,
    calculateMonthlyPayment,
  };

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>;
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};
