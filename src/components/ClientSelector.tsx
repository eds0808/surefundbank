
import React from 'react';
import { Client } from '@/types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import TrustRatingBadge from './TrustRatingBadge';

interface ClientSelectorProps {
  clients: Client[];
  selectedClientId: string | null;
  onClientSelect: (clientId: string) => void;
  showTrustRating?: boolean;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({ 
  clients, 
  selectedClientId, 
  onClientSelect,
  showTrustRating = true
}) => {
  return (
    <Select value={selectedClientId || undefined} onValueChange={onClientSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a client" />
      </SelectTrigger>
      <SelectContent>
        {clients.map(client => (
          <SelectItem key={client.id} value={client.id} className="flex justify-between">
            <div className="flex items-center justify-between w-full">
              <span>{client.name}</span>
              {showTrustRating && (
                <TrustRatingBadge rating={client.trustRating} showLabel={false} />
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClientSelector;
