import type { ButtonProps, ModalProps } from "@mui/material";
import type { PropsWithChildren, ReactElement } from "react";

export type CustomModalProps =
  Partial<ModalProps> &
  PropsWithChildren &
  {
    buttonProps?: Omit<ButtonProps, 'onClick'>,
    actions?: ReactElement,
    maxWidth: 'sm' | 'md' | 'lg' | 'xl'
  }