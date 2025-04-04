
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TrustRatingBadgeProps {
  rating: number;
  showLabel?: boolean;
}

const TrustRatingBadge: React.FC<TrustRatingBadgeProps> = ({ rating, showLabel = true }) => {
  let badgeClass = '';
  let label = '';

  if (rating >= 90) {
    badgeClass = 'bg-success';
    label = 'Excellent';
  } else if (rating >= 80) {
    badgeClass = 'bg-success';
    label = 'Good';
  } else if (rating >= 70) {
    badgeClass = 'bg-warning';
    label = 'Fair';
  } else if (rating >= 60) {
    badgeClass = 'bg-warning';
    label = 'Poor';
  } else {
    badgeClass = 'bg-danger';
    label = 'Bad';
  }

  return (
    <Badge className={`${badgeClass} text-white`}>
      {showLabel ? label : ''} {rating}%
    </Badge>
  );
};

export default TrustRatingBadge;
