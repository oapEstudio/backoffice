import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller, type FieldValues } from "react-hook-form";
import Required from "../../required/required.component";
import { styles } from "../styles";
import type { ITextInput } from "./text-input.interface";
import InputAdornment from '@mui/material/InputAdornment';

type TextLike = "text" | "search" | "email" | "password";

function CustomTextInput<T extends FieldValues>(props: ITextInput<T> & {
  pattern?: RegExp | { value: RegExp; message: string } | string;
  patternMessage?: string;
}) {
  const {
    size = "small",
    defaultValue = "",
    label,
    required,
    value,
    type = "text",
    onChange,
    control,
    name,
    rules,
    minLength = 10,
    maxLength = 100,
    showCounter = true,
    icon,
    pattern,          
    patternMessage, 
    ...rest
  } = props;

  const isTextLike = (["text","search","email","password"] as TextLike[]).includes(type as TextLike);

  const normalizedPatternRule =
    pattern
      ? typeof pattern === "string"
        ? { value: new RegExp(pattern), message: patternMessage ?? "Formato inválido" }
        : pattern instanceof RegExp
          ? { value: pattern, message: patternMessage ?? "Formato inválido" }
          : pattern 
      : undefined;

  const mergedRules = {
    ...rules,
    minLength:
      rules?.minLength ??
      (isTextLike ? ({ value: minLength, message: `Mínimo ${minLength} caracteres` } as any) : undefined),
    maxLength:
      rules?.maxLength ??
      (isTextLike ? ({ value: maxLength, message: `Máximo ${maxLength} caracteres` } as any) : undefined),
    pattern: rules?.pattern ?? normalizedPatternRule, 
  };

  const renderCounter = (len: number) =>
    showCounter && isTextLike ? (
      <small style={{ display: "block", marginTop: 4, color: "#777" }}>
        {len}/{maxLength}
      </small>
    ) : null;

  const plainValueStr = value == null ? "" : String(value);
  const plainLen = plainValueStr.length;

  const nativePattern =
    typeof pattern === "string"
      ? pattern
      : pattern instanceof RegExp
        ? pattern.source
        : undefined;



   
  return (
    <div>
      {label && (
        <InputLabel sx={styles.label}>
          {label}
          {required && <Required value="*" />}
        </InputLabel>
      )}

      {control && name ? (
        <Controller
          defaultValue={defaultValue as any}
          control={control}
          name={name}
          rules={mergedRules}
          render={({ field: { onChange: fieldOnChange, onBlur, value }, fieldState: { error } }) => {
            const strVal = value == null ? "" : String(value);
            const len = strVal.length;

            return (
              <>
                <TextField
                  {...rest}
                  sx={styles[size]}
                  error={!!error}
                  helperText={error?.message}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const next = type === "number" ? (raw === "" ? "" : Number(raw)) : raw;
                    fieldOnChange(next);
                  }}
                  value={value ?? ""}
                  type={type}
                  inputProps={{
                    ...(isTextLike ? { maxLength } : {}),
                    ...(nativePattern && isTextLike ? { pattern: nativePattern } : {}),
                    ...rest.inputProps,
                  }}
                />
                {renderCounter(len)}
              </>
            );
          }}
        />
      ) : (
        <>
          <TextField
            {...rest}
            sx={styles[size]}
            variant="outlined"
            value={value ?? ""}
            onChange={(e) => {
              if (onChange) onChange(e as any);
            }}
            type={type}
            slotProps={{
              input: {
                startAdornment: icon ? (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ) : undefined,
              },
            }}
            inputProps={{
              ...(isTextLike ? { maxLength } : {}),
              ...(nativePattern && isTextLike ? { pattern: nativePattern } : {}),
              ...rest.inputProps,
            }}
          />
          {renderCounter(plainLen)}
        </>
      )}
    </div>
  );
}

export default CustomTextInput;
