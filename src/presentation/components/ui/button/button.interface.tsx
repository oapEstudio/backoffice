import type { SxProps } from "@mui/material/styles";

export default interface IButtonProps {
  icon?: React.ReactElement;
  title?: string;
  variant: string;
  type?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  style?: any
}