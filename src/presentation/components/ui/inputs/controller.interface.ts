import type { FieldValues, UseControllerProps } from "react-hook-form";

export type CustomControllerProps<T extends FieldValues> = Partial<
  Pick<
    UseControllerProps<T>,
    "control" | "name" | "rules" | "disabled"
  >
>;