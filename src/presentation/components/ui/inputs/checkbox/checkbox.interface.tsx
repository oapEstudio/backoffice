// import { FieldValues } from "react-hook-form";

export interface ICustomCheckboxProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  rules?: object;
  description?: string;
  disable: boolean;
}
