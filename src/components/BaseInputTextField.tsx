import { InputAdornment, TextField } from "@mui/material";
import { FC, ReactNode } from "react";

type BaseInputTextFieldProps = {
  multiline?: boolean;
  minRows?: number;
  placeholder?: string;
  shouldAutoFocus?: boolean;
  isError?: boolean;
  startIcon?: ReactNode;
  isDisabled?: boolean;
  value: string;
  onChange: (value: string) => void;
};
export const BaseInputTextField: FC<
  BaseInputTextFieldProps
> = (props) => {
  const {
    minRows,
    multiline,
    isError,
    onChange,
    value,
    isDisabled,
    placeholder,
    startIcon,
    shouldAutoFocus,
  } = props;

  return (
    <TextField
      fullWidth
      multiline={multiline}
      minRows={minRows}
      error={isError}
      autoFocus={shouldAutoFocus}
      placeholder={placeholder}
      disabled={isDisabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
