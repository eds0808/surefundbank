
import React from 'react';

interface TrustMeterProps {
  rating: number;
}

const TrustMeter: React.FC<TrustMeterProps> = ({ rating }) => {
  let colorClass = '';

  if (rating >= 90) {
    colorClass = 'trust-level-excellent';
  } else if (rating >= 80) {
    colorClass = 'trust-level-good';
  } else if (rating >= 70) {
    colorClass = 'trust-level-fair';
  } else if (rating >= 60) {
    colorClass = 'trust-level-poor';
  } else {
    colorClass = 'trust-level-bad';
  }

  return (
    <div className="trust-meter">
      <div 
        className={`trust-meter-fill ${colorClass}`} 
        style={{ width: `${rating}%` }}
      />
    </div>
  );
};

export default TrustMeter;
