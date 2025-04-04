
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoanTermSelector from './LoanTermSelector';
import { useLoan } from '@/contexts/LoanContext';

interface LoanCalculatorProps {
  clientId: string;
  onLoanSubmit: (amount: number, term: number, interestRate: number) => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ clientId, onLoanSubmit }) => {
  const { calculateMonthlyPayment } = useLoan();
  const [amount, setAmount] = useState<number>(10000);
  const [term, setTerm] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(0.12); // 12% default
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Calculate loan details
  useEffect(() => {
    if (amount > 0 && term > 0) {
      // Adjust interest rate based on term
      let adjustedRate = 0.1; // Base rate
      
      if (term <= 3) {
        adjustedRate = 0.06; // 6% for short-term loans
      } else if (term <= 6) {
        adjustedRate = 0.08; // 8% for medium-term loans
      } else if (term <= 12) {
        adjustedRate = 0.12; // 12% for 1-year loans
      } else {
        adjustedRate = 0.15; // 15% for long-term loans
      }
      
      setInterestRate(adjustedRate);
      
      // Calculate payments
      const monthly = calculateMonthlyPayment(amount, term, adjustedRate);
      setMonthlyPayment(monthly);
      
      const total = monthly * term;
      setTotalPayment(total);
      
      const interest = total - amount;
      setTotalInterest(interest);
    }
  }, [amount, term, calculateMonthlyPayment]);

  const handleSubmit = () => {
    onLoanSubmit(amount, term, interestRate);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Loan Amount</Label>
          <div className="flex">
            <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">₱</span>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1000}
              step={1000}
              className="rounded-l-none"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="term">Loan Term</Label>
          <LoanTermSelector value={term} onChange={setTerm} />
        </div>
        
        <div className="pt-4 space-y-4">
          <div className="bg-muted/50 p-4 rounded-md">
            <div className="flex justify-between text-sm mb-2">
              <span>Interest Rate:</span>
              <span className="font-medium">{(interestRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Monthly Payment:</span>
              <span className="font-medium">₱{monthlyPayment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Total Payment:</span>
              <span className="font-medium">₱{totalPayment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Interest:</span>
              <span className="font-medium">₱{totalInterest.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Apply for Loan</Button>
      </CardFooter>
    </Card>
  );
};

export default LoanCalculator;
