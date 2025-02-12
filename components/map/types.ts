// components/map/types.ts
export interface StateProperties {
  name: string;
}

export interface StateDetails {
  name: string;
  laws: string;
  Security_Exception: string;  // Keeping consistent casing
  Litigation_Risk: string;    // Keeping consistent casing
  Notes: string;
  Security: string;
}

export interface SidePanelProps {
  isOpen: boolean;
  stateInfo: StateProperties | null;
  stateDetails: StateDetails | null;
  onClose: () => void;
}

export interface MapChartProps {
  onStateSelect: (stateProps: StateProperties) => void;
}