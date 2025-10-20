import type { SelectProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import type { CustomControllerProps } from "../controller.interface";
import type React from "react";

export type SelectOption = {
  label: string | undefined | React.ReactNode,
  value: string | number | boolean | any[] | Date | [] | null | undefined | any;
}

export type ISelect<T extends FieldValues> =
  SelectProps &
  CustomControllerProps<T> &
  {
    id?: number | string;
    name?: string;
    size?: 'small' | 'medium' | 'large',
    options: SelectOption[],
    placeholder?: string
  };