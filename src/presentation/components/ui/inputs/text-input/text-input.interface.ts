import { type TextFieldProps } from "@mui/material";
import type { Control, FieldValues, RegisterOptions } from "react-hook-form";
import type { CustomControllerProps } from "../controller.interface";
import type { ReactNode } from "react";

export type ITextInput<T extends FieldValues> =
  Omit<TextFieldProps, 'size'> &
  CustomControllerProps<T> &
  {
    size?: 'small' | 'medium' | 'large';
    minLength?: number;      
    maxLength?: number;      
    showCounter?: boolean;   
    name?: string;
    control?: Control<T>;
    rules?: RegisterOptions<T>;
    icon?: ReactNode
  };