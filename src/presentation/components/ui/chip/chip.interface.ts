import type { ReactElement } from "react";

interface IconComponentProps { 
}
export default interface ICustomChipProps {
  label: string;
  severity?: 'primary' | 'secondary' | 'info' | 'success' | 'error' | 'warning';
  icon?: ReactElement<IconComponentProps>;
}