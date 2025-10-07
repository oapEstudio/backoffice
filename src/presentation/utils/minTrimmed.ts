import { MIN_LENGTH_INPUT } from "../features/shared/constants/default-input";

export const minTrimmed = (min: number = MIN_LENGTH_INPUT) => (v: unknown) =>
  ((v ?? '').toString().trim().length >= min) ||
  `Mínimo ${min} caracteres (sin contar espacios al inicio/fin)`;