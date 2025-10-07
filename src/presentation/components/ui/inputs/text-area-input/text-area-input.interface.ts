import type { FieldValues } from "react-hook-form";
import type { ITextInput } from "../text-input/text-input.interface";

export type ITextAreaInput<T extends FieldValues> =
  ITextInput<T> &
  {
    rows?: number;
    minRows?: number;
    maxRows?: number;
  }