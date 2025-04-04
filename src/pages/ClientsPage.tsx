import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLoan } from '@/contexts/LoanContext';
import ClientSelector from '@/components/ClientSelector';
import ClientDetails from '@/components/ClientDetails';
import LoanHistoryTable from '@/components/LoanHistoryTable';
import PaymentHistoryTable from '@/components/PaymentHistoryTable';
import { Trash, Edit, PlusCircle, ArrowRight, CreditCard } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';
import { LoanHistory } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <div className="md:col-span-1 space-y-4">
              <ClientDetails 
                client={selectedClient} 
                canApplyForLoan={canClientApplyForLoan} 
              />
              
              {canClientApplyForLoan && (
                <Card className="border-success bg-success/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-success text-lg">Loan Eligible</CardTitle>
                    <CardDescription>
                      This client qualifies for a new loan
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      onClick={handleNewLoan} 
                      className="w-full"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Apply for New Loan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="loans" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="loans">Loan Summary</TabsTrigger>
                  <TabsTrigger value="payments">Payment History</TabsTrigger>
                </TabsList>
                <TabsContent value="loans">
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
                </TabsContent>
                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History Breakdown</CardTitle>
                      <CardDescription>
                        Detailed history of all payments made by this client
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PaymentHistoryTable loanHistory={clientLoans} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
