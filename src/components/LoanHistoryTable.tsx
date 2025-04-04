
import React from 'react';
import { LoanHistory, loanStatusColors, loanStatusLabels } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash, Edit } from 'lucide-react';

interface LoanHistoryTableProps {
  loans: LoanHistory[];
  onEditLoan?: (loan: LoanHistory) => void;
  onDeleteLoan?: (loanId: string) => void;
}

const LoanHistoryTable: React.FC<LoanHistoryTableProps> = ({ 
  loans, 
  onEditLoan, 
  onDeleteLoan 
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Calculate total paid amount
  const calculateTotalPaid = (loan: LoanHistory) => {
    return loan.paymentHistory.reduce((total, payment) => total + payment.amount, 0);
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No loan history found
              </TableCell>
            </TableRow>
          ) : (
            loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">
                  ₱{loan.amount.toLocaleString()}
                </TableCell>
                <TableCell>{loan.term} months</TableCell>
                <TableCell>{formatDate(loan.startDate)}</TableCell>
                <TableCell>{formatDate(loan.dueDate)}</TableCell>
                <TableCell>
                  <Badge className={`${loanStatusColors[loan.status]}`}>
                    {loanStatusLabels[loan.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  ₱{calculateTotalPaid(loan).toLocaleString()} 
                  <span className="text-xs text-muted-foreground ml-1">
                    ({loan.paymentHistory.length} payments)
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {onEditLoan && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => onEditLoan(loan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDeleteLoan && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => onDeleteLoan(loan.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoanHistoryTable;
