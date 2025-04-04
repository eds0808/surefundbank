
import React, { useState } from 'react';
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
import ClientDetails from '@/components/ClientDetails';
import LoanHistoryTable from '@/components/LoanHistoryTable';
import { Trash, Edit, PlusCircle } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';
import { LoanHistory } from '@/types';

const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    clients, 
    selectClient, 
    selectedClient, 
    getClientLoans, 
    canApplyForLoan,
    deleteLoan 
  } = useLoan();
  
  const [loanToDelete, setLoanToDelete] = useState<string | null>(null);
  
  const clientLoans = selectedClient 
    ? getClientLoans(selectedClient.id) 
    : [];
  
  const handleClientSelect = (clientId: string) => {
    selectClient(clientId);
  };
  
  const handleNewLoan = () => {
    navigate('/new-loan');
  };
  
  const handleEditLoan = (loan: LoanHistory) => {
    toast({
      title: "Edit Functionality",
      description: "Edit functionality would go here in a full implementation."
    });
  };
  
  const handleDeleteLoan = (loanId: string) => {
    setLoanToDelete(loanId);
  };
  
  const confirmDeleteLoan = () => {
    if (loanToDelete) {
      deleteLoan(loanToDelete);
      setLoanToDelete(null);
    }
  };
  
  const cancelDeleteLoan = () => {
    setLoanToDelete(null);
  };
  
  const canClientApplyForLoan = selectedClient 
    ? canApplyForLoan(selectedClient.id) 
    : false;
    
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Selection</CardTitle>
          <CardDescription>
            Select a client to view their loan history and details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientSelector
            clients={clients}
            selectedClientId={selectedClient?.id || null}
            onClientSelect={handleClientSelect}
          />
        </CardContent>
      </Card>
      
      {selectedClient && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ClientDetails 
                client={selectedClient} 
                canApplyForLoan={canClientApplyForLoan} 
              />
              
              {canClientApplyForLoan && (
                <div className="mt-4">
                  <Button 
                    onClick={handleNewLoan} 
                    className="w-full"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Apply for New Loan
                  </Button>
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Loan History</CardTitle>
                </CardHeader>
                <CardContent>
                  <LoanHistoryTable 
                    loans={clientLoans} 
                    onEditLoan={handleEditLoan}
                    onDeleteLoan={handleDeleteLoan}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          
          <AlertDialog open={!!loanToDelete} onOpenChange={() => setLoanToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  loan record from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={cancelDeleteLoan}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDeleteLoan}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default ClientsPage;
