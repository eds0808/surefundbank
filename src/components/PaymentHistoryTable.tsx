
import React from 'react';
import { Payment, LoanHistory } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface PaymentHistoryTableProps {
  loanHistory: LoanHistory[];
}

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({ loanHistory }) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Calculate if payment was on time (within 5 days of loan start date month increment)
  const isPaymentOnTime = (payment: Payment, loanStartDate: string) => {
    const paymentDate = new Date(payment.date);
    const startDate = new Date(loanStartDate);
    
    // Get expected payment month
    const paymentIndex = loanHistory
      .find(loan => loan.paymentHistory.some(p => p.id === payment.id))
      ?.paymentHistory.findIndex(p => p.id === payment.id) || 0;
    
    const expectedMonth = new Date(startDate);
    expectedMonth.setMonth(startDate.getMonth() + paymentIndex + 1);
    
    // Calculate days difference
    const diffTime = Math.abs(paymentDate.getTime() - expectedMonth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 5;
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loan Amount</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Payment Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Timing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loanHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No payment history found
              </TableCell>
            </TableRow>
          ) : (
            loanHistory.flatMap(loan => 
              loan.paymentHistory.map((payment, index) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">₱{loan.amount.toLocaleString()}</TableCell>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={loan.status === 'fully-paid' ? 'bg-success/10 text-success border-success' : 
                                loan.status === 'partially-paid' ? 'bg-warning/10 text-warning border-warning' : 
                                'bg-danger/10 text-danger border-danger'}
                    >
                      {loan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {isPaymentOnTime(payment, loan.startDate) ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success">
                        On Time
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-danger/10 text-danger border-danger">
                        Late
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistoryTable;
