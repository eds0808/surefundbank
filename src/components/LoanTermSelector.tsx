
import React from 'react';
import { loanTerms } from '@/types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface LoanTermSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const LoanTermSelector: React.FC<LoanTermSelectorProps> = ({ value, onChange }) => {
  return (
    <Select 
      value={value.toString()} 
      onValueChange={(val) => onChange(parseInt(val, 10))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select loan term" />
      </SelectTrigger>
      <SelectContent>
        {loanTerms.map((term) => (
          <SelectItem key={term.value} value={term.value.toString()}>
            {term.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LoanTermSelector;
