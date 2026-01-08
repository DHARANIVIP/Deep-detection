
export interface ScanResult {
  id: string;
  fileName: string;
  date: string;
  status: 'Completed' | 'Processing' | 'Failed';
  result: 'Real' | 'Fake';
  probability: number;
}

export interface Artifact {
  label: string;
  status: 'Normal' | 'Abnormal' | 'Warning';
  details: string;
}

export interface FrequencyData {
  freq: number;
  original: number;
  synthetic: number;
}
