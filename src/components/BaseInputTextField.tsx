import { InputAdornment, TextField } from "@mui/material";
import { FC, ReactNode } from "react";

type BaseInputTextFieldProps = {
  multiline?: boolean;
  minRows?: number;
  placeholder?: string;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  startIcon?: ReactNode;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
};
export const BaseInputTextField: FC<
  BaseInputTextFieldProps
> = (props) => {
  const { startIcon, onChange, ...rest } = props;

  return (
    <TextField
      fullWidth
      onChange={(e) => onChange(e.target.value)}
      {...rest}
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
