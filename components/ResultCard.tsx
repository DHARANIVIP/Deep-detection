
import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Artifact } from '../types';

interface ResultCardProps {
  artifact: Artifact;
}

const ResultCard: React.FC<ResultCardProps> = ({ artifact }) => {
  const getIcon = () => {
    switch (artifact.status) {
      case 'Normal': return <CheckCircle className="w-5 h-5 text-status-real" />;
      case 'Warning': return <Info className="w-5 h-5 text-status-warning" />;
      case 'Abnormal': return <AlertCircle className="w-5 h-5 text-status-fake" />;
    }
  };

  const getBg = () => {
    switch (artifact.status) {
      case 'Normal': return 'bg-status-real/5 border-status-real/20';
      case 'Warning': return 'bg-status-warning/5 border-status-warning/20';
      case 'Abnormal': return 'bg-status-fake/5 border-status-fake/20';
    }
  };

  return (
    <div className={`flex items-start space-x-4 p-4 border rounded-xl transition-all ${getBg()}`}>
      <div className="mt-0.5">{getIcon()}</div>
      <div>
        <h4 className="font-bold text-sm mb-1 text-text-primary">{artifact.label}</h4>
        <p className="text-xs text-text-secondary font-mono">{artifact.details}</p>
      </div>
    </div>
  );
};

export default ResultCard;
