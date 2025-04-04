
import React from 'react';
import { Client } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TrustRatingBadge from './TrustRatingBadge';
import TrustMeter from './TrustMeter';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ClientDetailsProps {
  client: Client;
  canApplyForLoan: boolean;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, canApplyForLoan }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{client.name}</CardTitle>
          <TrustRatingBadge rating={client.trustRating} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <TrustMeter rating={client.trustRating} />
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="font-medium">Email:</div>
          <div>{client.email}</div>
          
          <div className="font-medium">Phone:</div>
          <div>{client.phone}</div>
          
          <div className="font-medium">Address:</div>
          <div>{client.address}</div>
          
          <div className="font-medium">Trust Status:</div>
          <div>
            {canApplyForLoan ? (
              <Badge variant="outline" className="bg-success/10 text-success border-success">
                Eligible for Loans
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-danger/10 text-danger border-danger">
                Bad Payer
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mt-4 p-3 rounded-md border text-sm">
          <div className="font-medium mb-1">Assessment</div>
          {canApplyForLoan ? (
            <div className="flex items-start text-success gap-2">
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                This client has a good payment history with a trust rating of {client.trustRating}%. 
                They are suitable for a new loan.
              </div>
            </div>
          ) : (
            <div className="flex items-start text-danger gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                This client has a trust rating of {client.trustRating}% which is below the required 80% threshold.
                They are not suitable for a new loan at this time.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetails;
