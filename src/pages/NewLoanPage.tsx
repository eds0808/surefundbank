
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLoan } from '@/contexts/LoanContext';
import ClientSelector from '@/components/ClientSelector';
import LoanCalculator from '@/components/LoanCalculator';
import PaymentHistoryTable from '@/components/PaymentHistoryTable';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const NewLoanPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    clients, 
    selectedClient, 
    selectClient, 
    canApplyForLoan,
    addLoan,
    getClientLoans
  } = useLoan();
  
  // If there's no client selected, select the first client by default
  useEffect(() => {
    if (!selectedClient && clients.length > 0) {
      selectClient(clients[0].id);
    }
  }, [clients, selectedClient, selectClient]);
  
  const handleClientSelect = (clientId: string) => {
    selectClient(clientId);
  };
  
  const handleLoanSubmit = (amount: number, term: number, interestRate: number) => {
    if (!selectedClient) {
      toast({
        title: "Error",
        description: "Please select a client first",
        variant: "destructive"
      });
      return;
    }
    
    if (!canApplyForLoan(selectedClient.id)) {
      toast({
        title: "Loan Rejected",
        description: "This client is not eligible for a loan due to poor credit history",
        variant: "destructive"
      });
      return;
    }
    
    // Add the loan
    addLoan({
      clientId: selectedClient.id,
      amount,
      term,
      interestRate
    });
    
    // Navigate back to clients page
    navigate('/');
  };
  
  const goBack = () => {
    navigate('/');
  };
  
  const eligibleForLoan = selectedClient ? canApplyForLoan(selectedClient.id) : false;
  const clientLoans = selectedClient ? getClientLoans(selectedClient.id) : [];
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button 
        variant="ghost" 
        onClick={goBack} 
        className="mb-4 p-0 flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Clients
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>New Loan Application</CardTitle>
          <CardDescription>
            Create a new loan application for a client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Select Client</h3>
              <ClientSelector
                clients={clients}
                selectedClientId={selectedClient?.id || null}
                onClientSelect={handleClientSelect}
              />
            </div>
            
            {selectedClient && (
              <>
                {eligibleForLoan ? (
                  <div className="mt-6">
                    <LoanCalculator 
                      clientId={selectedClient.id} 
                      onLoanSubmit={handleLoanSubmit}
                    />
                  </div>
                ) : (
                  <div className="bg-danger/10 border border-danger/20 text-danger rounded-md p-4 mt-4">
                    <h3 className="font-medium mb-1">Loan Application Rejected</h3>
                    <p className="text-sm">
                      This client is not eligible for a loan due to poor credit history. 
                      Their trust rating is below the required threshold.
                    </p>
                  </div>
                )}
                
                {/* Payment History Breakdown */}
                {clientLoans.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Payment History Breakdown</h3>
                    <PaymentHistoryTable loanHistory={clientLoans} />
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewLoanPage;
