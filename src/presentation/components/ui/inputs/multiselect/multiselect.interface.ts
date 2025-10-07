import type { AutocompleteProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import type { CustomControllerProps } from "../controller.interface";

export type SelectOption = {
  name: string | undefined;
  id: string | number | boolean | undefined | null | any[] | Date | [];
};



export type IMultiselect<T extends FieldValues> = Omit<
  AutocompleteProps<SelectOption, true, false, false>,
  "renderInput"
> &
  CustomControllerProps<T> & {
    size?: "small" | "medium" | "large";
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    loading?: boolean;
    required?: boolean;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: SelectOption[]) => void;
  };